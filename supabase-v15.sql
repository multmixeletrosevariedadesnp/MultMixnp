-- MultMix v15: contas a pagar (lançadas à mão ou geradas pela entrada de XML). Só o administrador enxerga.
-- Rode ANTES de publicar o sistema 1.8.0. Pode rodar mais de uma vez.
create table if not exists payables(
  id uuid primary key,
  supplier text, supplier_cnpj text, doc text, parcel text,
  due_date date not null, amount numeric(12,2) not null,
  paid_at timestamptz, paid_amount numeric(12,2), method text,
  note text, source text, nfe_key text,
  canceled_at timestamptz,
  created_at timestamptz default now(), updated_at timestamptz default now());
alter table payables enable row level security;
drop policy if exists "admin contas a pagar" on payables;
create policy "admin contas a pagar" on payables for all to authenticated using (is_admin()) with check (is_admin());
