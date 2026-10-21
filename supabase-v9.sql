-- MultMix v9: usuários do sistema (administrador / vendedor) com comissão.
-- Rode ANTES de publicar o sistema novo. Pode rodar mais de uma vez.
alter table profiles
  add column if not exists email text, add column if not exists phone text,
  add column if not exists commission_pct numeric(5,2) default 0 check (commission_pct >= 0 and commission_pct <= 100),
  add column if not exists commission_mode text default 'venda' check (commission_mode in ('venda','recebimento')),
  add column if not exists active boolean default true,
  add column if not exists created_at timestamptz default now();
update profiles p set email = u.email from auth.users u where u.id = p.id and p.email is null;

-- quem foi o vendedor e qual era a taxa na hora da venda (a taxa muda, a venda antiga não)
alter table sales
  add column if not exists seller_id uuid, add column if not exists seller_name text,
  add column if not exists commission_pct numeric(5,2) default 0,
  add column if not exists commission_mode text default 'venda';

-- usuário desativado perde o acesso aos dados
create or replace function is_staff() returns boolean language sql security definer set search_path=public stable
  as $$ select exists(select 1 from profiles where id=auth.uid() and coalesce(active,true)) $$;
create or replace function is_admin() returns boolean language sql security definer set search_path=public stable
  as $$ select exists(select 1 from profiles where id=auth.uid() and role='admin' and coalesce(active,true)) $$;

-- criar usuário (só administrador)
create or replace function admin_create_user(p_email text, p_password text, p_name text, p_role text,
  p_commission numeric, p_mode text, p_phone text) returns uuid
language plpgsql security definer set search_path = public, extensions, auth as $$
declare v_id uuid := gen_random_uuid(); v_email text := lower(trim(p_email));
begin
  if not is_admin() then raise exception 'Somente o administrador cria usuários'; end if;
  if p_role not in ('admin','vendedor') then raise exception 'Perfil inválido'; end if;
  if length(coalesce(p_password,'')) < 8 then raise exception 'A senha precisa ter ao menos 8 caracteres'; end if;
  if exists (select 1 from auth.users where lower(email) = v_email) then raise exception 'Já existe um usuário com este e-mail'; end if;
  insert into auth.users (instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,
    created_at,updated_at,confirmation_token,email_change,email_change_token_new,recovery_token)
  values ('00000000-0000-0000-0000-000000000000', v_id, 'authenticated','authenticated', v_email, crypt(p_password, gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}','{}', now(), now(), '', '', '', '');
  insert into auth.identities (id,user_id,provider_id,identity_data,provider,last_sign_in_at,created_at,updated_at)
  values (gen_random_uuid(), v_id, v_id::text, jsonb_build_object('sub', v_id::text,'email', v_email,'email_verified', true),'email', now(), now(), now());
  insert into profiles (id,name,role,email,phone,commission_pct,commission_mode,active)
  values (v_id, trim(p_name), p_role, v_email, p_phone, coalesce(p_commission,0), coalesce(p_mode,'venda'), true);
  return v_id;
end $$;

-- editar usuário (nunca deixa o sistema sem administrador ativo; desativar também bloqueia o login)
create or replace function admin_update_user(p_id uuid, p_name text, p_role text, p_commission numeric, p_mode text,
  p_phone text, p_active boolean) returns void
language plpgsql security definer set search_path = public, auth as $$
begin
  if not is_admin() then raise exception 'Somente o administrador altera usuários'; end if;
  if p_role not in ('admin','vendedor') then raise exception 'Perfil inválido'; end if;
  if p_id = auth.uid() and not p_active then raise exception 'Você não pode desativar o seu próprio usuário'; end if;
  if (p_role <> 'admin' or not p_active)
     and exists (select 1 from profiles where id=p_id and role='admin' and coalesce(active,true))
     and not exists (select 1 from profiles where id<>p_id and role='admin' and coalesce(active,true)) then
    raise exception 'Mantenha ao menos um administrador ativo';
  end if;
  update profiles set name=trim(p_name), role=p_role, commission_pct=coalesce(p_commission,0),
    commission_mode=coalesce(p_mode,'venda'), phone=p_phone, active=p_active where id=p_id;
  update auth.users set banned_until = case when p_active then null else 'infinity'::timestamptz end where id=p_id;
end $$;

-- redefinir senha de um usuário (só administrador)
create or replace function admin_set_password(p_user uuid, p_password text) returns void
language plpgsql security definer set search_path = public, extensions, auth as $$
begin
  if not is_admin() then raise exception 'Somente o administrador redefine senhas'; end if;
  if length(coalesce(p_password,'')) < 8 then raise exception 'A senha precisa ter ao menos 8 caracteres'; end if;
  update auth.users set encrypted_password = crypt(p_password, gen_salt('bf')), updated_at = now() where id = p_user;
  if not found then raise exception 'Usuário não encontrado'; end if;
end $$;

revoke all on function admin_create_user(text,text,text,text,numeric,text,text) from public, anon;
revoke all on function admin_update_user(uuid,text,text,numeric,text,text,boolean) from public, anon;
revoke all on function admin_set_password(uuid,text) from public, anon;
grant execute on function admin_create_user(text,text,text,text,numeric,text,text) to authenticated;
grant execute on function admin_update_user(uuid,text,text,numeric,text,text,boolean) to authenticated;
grant execute on function admin_set_password(uuid,text) to authenticated;
