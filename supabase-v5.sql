-- MultMix v5: dados da empresa (rode depois do v3). Atenção: esta tabela é PÚBLICA para leitura
-- (o catálogo mostra nome, endereço, telefone). Nunca guarde senhas, tokens ou certificado aqui.
create table if not exists company(
  id int primary key default 1 check (id=1),
  legal_name text, trade_name text, cnpj text, ie text, regime text,
  cep text, street text, number text, complement text, district text, city text, uf text,
  phone text, whatsapp text, email text, hours text, instagram text, logo_url text,
  updated_at timestamptz default now());
alter table company enable row level security;
drop policy if exists "empresa publica" on company;
create policy "empresa publica" on company for select using (true);
drop policy if exists "admin empresa" on company;
create policy "admin empresa" on company for all to authenticated using (is_admin()) with check (is_admin());
insert into company(id,trade_name) values (1,'MultMix Eletros e Variedades') on conflict (id) do nothing;
