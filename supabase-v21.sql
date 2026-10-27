-- v21: contato do contador (para enviar o pacote fiscal mensal)
alter table company
  add column if not exists accountant_name text,
  add column if not exists accountant_email text,
  add column if not exists accountant_phone text;
