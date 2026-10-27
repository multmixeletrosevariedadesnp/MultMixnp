-- v16: tema sazonal (Black Friday, Natal...) escolhido em Empresa
alter table company add column if not exists theme text default 'auto';
