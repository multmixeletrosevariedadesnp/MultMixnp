-- v17: personalização do tema (cores, faixa, emoji, período)
alter table company add column if not exists theme_cfg jsonb default '{}'::jsonb;
