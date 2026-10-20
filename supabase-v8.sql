-- MultMix v8: cadastro de fornecedores e pessoa jurídica (rode ANTES de publicar a versão nova do sistema)
alter table customers
  add column if not exists kind text default 'cliente' check (kind in ('cliente','fornecedor')),
  add column if not exists trade_name text;
