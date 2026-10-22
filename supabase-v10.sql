-- MultMix v10: chave Pix da empresa para o carnê em PDF (rode ANTES de publicar o sistema novo).
-- A chave fica numa tabela PRIVADA: só a equipe logada lê, só o administrador grava. O catálogo público não enxerga.
create table if not exists company_private(
  id int primary key default 1 check (id = 1),
  pix_key text,
  pix_key_type text check (pix_key_type in ('cpf','cnpj','telefone','email','aleatoria')),
  updated_at timestamptz default now());
alter table company_private enable row level security;
drop policy if exists "equipe le dados privados" on company_private;
create policy "equipe le dados privados" on company_private for select to authenticated using (is_staff());
drop policy if exists "admin grava dados privados" on company_private;
create policy "admin grava dados privados" on company_private for all to authenticated using (is_admin()) with check (is_admin());
insert into company_private (id) values (1) on conflict (id) do nothing;
