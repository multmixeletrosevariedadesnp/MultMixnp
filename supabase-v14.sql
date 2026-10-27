-- MultMix v14: corrige a numeração fiscal quando o tipo da nota muda (NFC-e <-> NF-e).
-- Rode ANTES de publicar a função "fiscal" nova. Pode rodar mais de uma vez.
alter table sales add column if not exists fiscal_model int;

-- Notas já emitidas/canceladas: registra o modelo.
update sales set fiscal_model = case when doc_type = 'nfce' then 65 else 55 end
 where fiscal_status in ('emitida','cancelada') and fiscal_model is null;

-- A sequência de cada modelo nunca pode ficar abaixo do maior número já usado por nota emitida/cancelada.
update fiscal_series f set last_number = greatest(f.last_number, coalesce((
  select max(s.fiscal_number::int) from sales s
   where s.fiscal_status in ('emitida','cancelada') and s.fiscal_number ~ '^[0-9]+$'
     and ((f.model = 65 and s.doc_type = 'nfce') or (f.model = 55 and s.doc_type is distinct from 'nfce'))), 0));

-- Vendas que ainda não têm nota: libera o número reservado em tentativas que falharam.
update sales set fiscal_number = null, fiscal_series = null
 where fiscal_status = 'pendente' and fiscal_model is null;
