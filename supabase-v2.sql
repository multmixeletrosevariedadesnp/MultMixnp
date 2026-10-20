-- MultMix v2: rode no SQL Editor (pode rodar mais de uma vez)
alter table installments add column if not exists paid_amount numeric(10,2), add column if not exists method text;
alter table sales add column if not exists method text;
alter table customers add column if not exists active boolean default true;

create table if not exists orders(
  id uuid primary key, items jsonb not null, pay_type text, n_inst int default 1, total numeric(10,2),
  customer_name text, customer_phone text, status text default 'novo',
  created_at timestamptz default now(), updated_at timestamptz default now());
alter table orders enable row level security;
drop policy if exists "cliente cria pedido" on orders;
create policy "cliente cria pedido" on orders for insert to anon with check (status='novo');
drop policy if exists "equipe pedidos" on orders;
create policy "equipe pedidos" on orders for all to authenticated using (true) with check (true);
