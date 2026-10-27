-- v18: promoção por produto (desconto em %, com datas opcionais de início e fim)
alter table products
  add column if not exists promo_pct numeric,
  add column if not exists promo_from date,
  add column if not exists promo_to date;
