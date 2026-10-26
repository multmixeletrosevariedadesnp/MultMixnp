-- MultMix v12: código de barras, código do fornecedor e custo no produto (usados na entrada de estoque por XML).
alter table products add column if not exists ean text, add column if not exists supplier_code text, add column if not exists cost numeric(10,2);
