-- MultMix v3: perfis (admin / vendedor). Rode depois do v1 e v2. Pode rodar mais de uma vez.
create table if not exists profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  name text, role text not null default 'vendedor' check (role in ('admin','vendedor')));
alter table profiles enable row level security;

create or replace function is_staff() returns boolean language sql security definer set search_path=public stable
  as $$ select exists(select 1 from profiles where id=auth.uid()) $$;
create or replace function is_admin() returns boolean language sql security definer set search_path=public stable
  as $$ select exists(select 1 from profiles where id=auth.uid() and role='admin') $$;

drop policy if exists "ver perfil" on profiles;
create policy "ver perfil" on profiles for select to authenticated using (id=auth.uid() or is_admin());
drop policy if exists "admin gerencia perfis" on profiles;
create policy "admin gerencia perfis" on profiles for all to authenticated using (is_admin()) with check (is_admin());

-- Quem já existe hoje (você) vira administrador:
insert into profiles(id,name,role) select id,coalesce(email,'admin'),'admin' from auth.users on conflict (id) do nothing;

-- Só a equipe (com perfil) acessa os dados; usuário sem perfil não vê nada.
drop policy if exists "equipe produtos" on products;
drop policy if exists "equipe clientes" on customers;
drop policy if exists "equipe vendas" on sales;
drop policy if exists "equipe parcelas" on installments;
drop policy if exists "equipe pedidos" on orders;
create policy "equipe produtos" on products for all to authenticated using (is_staff()) with check (is_staff());
create policy "equipe clientes" on customers for all to authenticated using (is_staff()) with check (is_staff());
create policy "equipe vendas" on sales for all to authenticated using (is_staff()) with check (is_staff());
create policy "equipe parcelas" on installments for all to authenticated using (is_staff()) with check (is_staff());
create policy "equipe pedidos" on orders for all to authenticated using (is_staff()) with check (is_staff());

-- Vendedor baixa estoque, mas só o admin cria produto ou muda nome/preço.
create or replace function guard_products() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if is_admin() then return new; end if;
  if tg_op='INSERT' then
    if not exists(select 1 from products where id=new.id) then raise exception 'Somente o administrador cadastra produtos'; end if;
  elsif new.name is distinct from old.name or new.price_cash is distinct from old.price_cash
     or new.price_card is distinct from old.price_card or new.price_credit is distinct from old.price_credit then
    raise exception 'Somente o administrador altera nome e precos';
  end if;
  return new;
end $$;
drop trigger if exists guard_products on products;
create trigger guard_products before insert or update on products for each row execute function guard_products();

-- NOVO VENDEDOR: crie o usuário em Authentication e rode (trocando o e-mail e o nome):
-- insert into profiles(id,name,role) select id,'Nome','vendedor' from auth.users where email='vendedor@email.com';
