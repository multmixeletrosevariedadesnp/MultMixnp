-- MultMix: rode no Supabase > SQL Editor
create table products(
  id uuid primary key, name text not null, category text, description text,
  price_cash numeric(10,2) not null, price_card numeric(10,2), price_credit numeric(10,2),
  max_inst int default 10, stock int default 0, active boolean default true,
  specs jsonb default '[]', photos text[] default '{}',          -- até 5 fotos
  ncm text, cest text, cfop text default '5102', unit text default 'UN', origin int default 0, -- fiscal
  updated_at timestamptz default now());
create table customers(
  id uuid primary key, name text not null, cpf text, phone text, address text,
  updated_at timestamptz default now());
create table sales(
  id uuid primary key, customer_id uuid references customers(id),
  items jsonb not null, pay_type text check (pay_type in ('avista','cartao','crediario')),
  total numeric(10,2), entry numeric(10,2) default 0, n_inst int default 1,
  fiscal_status text default 'pendente', fiscal_key text, fiscal_xml text, -- NFC-e futura
  created_at timestamptz default now(), updated_at timestamptz default now());
create table installments(
  id uuid primary key, sale_id uuid references sales(id) on delete cascade,
  number int, due_date date, amount numeric(10,2), paid_at timestamptz,
  updated_at timestamptz default now());

alter table products enable row level security;
alter table customers enable row level security;
alter table sales enable row level security;
alter table installments enable row level security;

-- Público só lê o catálogo; equipe logada (Auth) faz tudo
create policy "catalogo publico" on products for select using (active);
create policy "equipe produtos" on products for all to authenticated using (true) with check (true);
create policy "equipe clientes" on customers for all to authenticated using (true) with check (true);
create policy "equipe vendas" on sales for all to authenticated using (true) with check (true);
create policy "equipe parcelas" on installments for all to authenticated using (true) with check (true);

-- Fotos: Storage > New bucket "produtos" (public). Depois:
create policy "fotos leitura" on storage.objects for select using (bucket_id='produtos');
create policy "fotos upload" on storage.objects for insert to authenticated with check (bucket_id='produtos');
