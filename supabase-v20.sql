-- v20: vídeo (YouTube ou outro) e site do fabricante por produto
alter table products
  add column if not exists video_url text,
  add column if not exists site_url text;
