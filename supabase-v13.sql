-- MultMix v13: emissão fiscal (numeração, XML guardado fora da sincronização e dados do protocolo).
-- Rode ANTES de publicar o sistema 1.4.0 e de publicar a função "fiscal".
alter table sales add column if not exists fiscal_protocol text, add column if not exists fiscal_env int,
  add column if not exists fiscal_cstat text, add column if not exists fiscal_canceled_at timestamptz;

-- Sequência de numeração por modelo (65 = NFC-e, 55 = NF-e) e série.
create table if not exists fiscal_series(
  model int not null check (model in (55,65)), serie int not null default 1, last_number int not null default 0,
  primary key (model, serie));
insert into fiscal_series(model,serie,last_number) values (55,1,0),(65,1,0) on conflict do nothing;
alter table fiscal_series enable row level security;   -- sem política: só a função (service role) mexe

create or replace function fiscal_next_number(p_model int, p_serie int default 1) returns int
language plpgsql security definer set search_path=public as $$
declare n int;
begin
  insert into fiscal_series(model,serie,last_number) values (p_model,p_serie,0) on conflict do nothing;
  update fiscal_series set last_number=last_number+1 where model=p_model and serie=p_serie returning last_number into n;
  return n;
end $$;
revoke all on function fiscal_next_number(int,int) from public, anon, authenticated;
grant execute on function fiscal_next_number(int,int) to service_role;

-- XML da nota (não vai para os aparelhos; a função entrega sob demanda).
create table if not exists fiscal_docs(
  sale_id uuid primary key references sales(id) on delete cascade,
  xml text, cancel_xml text, created_at timestamptz default now());
alter table fiscal_docs enable row level security;
drop policy if exists "equipe le xml" on fiscal_docs;
create policy "equipe le xml" on fiscal_docs for select to authenticated using (is_staff());

-- Se você já emitiu notas em outro sistema e quer continuar a numeração, ajuste aqui, por exemplo:
-- update fiscal_series set last_number=1234 where model=65 and serie=1;
