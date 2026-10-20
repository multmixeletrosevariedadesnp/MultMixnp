-- MultMix v4: dados do cliente no pedido do catálogo (pode rodar mais de uma vez)
alter table orders add column if not exists customer_cpf text, add column if not exists customer_address text;
