-- v19: notas fiscais recebidas (Distribuição DF-e da SEFAZ). Só o administrador enxerga.
create table if not exists dfe_state (
  id int primary key default 1 check (id = 1),
  ult_nsu text not null default '0',
  max_nsu text,
  last_check timestamptz,
  last_cstat text,
  last_msg text
);
insert into dfe_state (id) values (1) on conflict do nothing;

create table if not exists dfe_notas (
  chave text primary key,
  nsu text,
  emit_cnpj text,
  emit_nome text,
  numero text,
  valor numeric,
  dh_emi timestamptz,
  status text not null default 'resumo',   -- resumo (só cabeçalho) | completo (com XML)
  xml text,
  ciencia_at timestamptz,                  -- ciência da operação registrada na SEFAZ
  canceled boolean not null default false,
  entrada_at timestamptz,                  -- estoque já foi dado entrada
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists dfe_notas_emi on dfe_notas (dh_emi desc);

alter table dfe_state enable row level security;   -- sem política: só a função (service role) mexe
alter table dfe_notas enable row level security;
drop policy if exists "admin le notas recebidas" on dfe_notas;
create policy "admin le notas recebidas" on dfe_notas for select to authenticated using (is_admin());
drop policy if exists "admin marca entrada" on dfe_notas;
create policy "admin marca entrada" on dfe_notas for update to authenticated using (is_admin()) with check (is_admin());
