-- MultMix v11: estoque seguro (baixa feita no servidor) e cancelamento/devolução de venda.
-- Rode ANTES de publicar o sistema 1.2.0. Pode rodar mais de uma vez.
-- Antes de rodar: deixe todos os aparelhos sincronizados (sem vendas pendentes de envio).

alter table sales
  add column if not exists canceled_at timestamptz, add column if not exists cancel_reason text,
  add column if not exists canceled_by text, add column if not exists refund_amount numeric(10,2) default 0,
  add column if not exists refund_method text;
alter table installments add column if not exists canceled_at timestamptz;

-- Baixa de estoque: acontece UMA vez no servidor, quando a venda entra. Dois aparelhos vendendo
-- ao mesmo tempo não se sobrescrevem mais, porque é uma subtração feita no próprio banco.
create or replace function sale_stock() returns trigger language plpgsql security definer set search_path=public as $$
declare it jsonb;
begin
  if tg_op='INSERT' then
    if new.canceled_at is null then
      for it in select * from jsonb_array_elements(new.items) loop
        update products set stock=coalesce(stock,0)-coalesce((it->>'qty')::int,0), updated_at=now() where id=(it->>'id')::uuid;
      end loop;
    end if;
  elsif old.canceled_at is null and new.canceled_at is not null then
    -- cancelamento: devolve o estoque e cancela as parcelas em aberto
    for it in select * from jsonb_array_elements(new.items) loop
      update products set stock=coalesce(stock,0)+coalesce((it->>'qty')::int,0), updated_at=now() where id=(it->>'id')::uuid;
    end loop;
    update installments set canceled_at=new.canceled_at, updated_at=now() where sale_id=new.id and paid_at is null and canceled_at is null;
  end if;
  return new;
end $$;
drop trigger if exists sale_stock on sales;
create trigger sale_stock after insert or update on sales for each row execute function sale_stock();
