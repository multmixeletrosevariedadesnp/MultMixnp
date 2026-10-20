-- MultMix v6: dados fiscais para NFC-e (65) e NF-e (55). Rode ANTES de publicar a versão nova do sistema.
alter table customers
  add column if not exists person_type text default 'PF', add column if not exists ie text, add column if not exists email text,
  add column if not exists cep text, add column if not exists street text, add column if not exists number text,
  add column if not exists complement text, add column if not exists district text, add column if not exists city text,
  add column if not exists uf text, add column if not exists ibge text;
alter table sales
  add column if not exists doc_type text default 'nfce' check (doc_type in ('nfce','nfe')),
  add column if not exists nat_op text default 'Venda de mercadoria', add column if not exists freight text default '9',
  add column if not exists fiscal_number text, add column if not exists fiscal_series text, add column if not exists fiscal_error text;
alter table products add column if not exists cest text, add column if not exists csosn text default '102';
alter table company add column if not exists ibge text, add column if not exists nfe_series text default '1', add column if not exists nfce_series text default '1';
