-- MultMix v7: quais preços aparecem no catálogo (rode ANTES de publicar a versão nova do sistema)
alter table company
  add column if not exists show_cash boolean default true,
  add column if not exists show_card boolean default true,
  add column if not exists show_credit boolean default true;
