create extension if not exists pgcrypto;

create type public.user_role as enum ('contributor','editor','admin');
create type public.article_status as enum ('draft','review','scheduled','published','archived');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Contributor',
  username text unique,
  bio text,
  avatar_url text,
  role public.user_role not null default 'contributor',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.categories (id uuid primary key default gen_random_uuid(),name text not null unique,slug text not null unique,description text,created_at timestamptz not null default now());
create table public.editorial_labels (id uuid primary key default gen_random_uuid(),name text not null unique,slug text not null unique,description text);
create table public.articles (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete restrict,
  category_id uuid references public.categories(id) on delete set null,
  editorial_label_id uuid references public.editorial_labels(id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text,
  body jsonb not null default '[]'::jsonb,
  cover_url text,
  status public.article_status not null default 'draft',
  is_featured boolean not null default false,
  reading_time integer not null default 5 check (reading_time > 0),
  seo_title text,
  seo_description text,
  scheduled_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.tags (id uuid primary key default gen_random_uuid(),name text not null unique,slug text not null unique);
create table public.article_tags (article_id uuid references public.articles(id) on delete cascade,tag_id uuid references public.tags(id) on delete cascade,primary key(article_id, tag_id));
create table public.program_hubs (id uuid primary key default gen_random_uuid(),name text not null,slug text not null unique,summary text,status text not null default 'active',cover_url text,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.article_programs (article_id uuid references public.articles(id) on delete cascade,program_id uuid references public.program_hubs(id) on delete cascade,primary key(article_id, program_id));
create table public.data_points (id uuid primary key default gen_random_uuid(),title text not null,value text not null,note text,source_name text,source_url text,period_label text,is_featured boolean not null default false,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.subscribers (id uuid primary key default gen_random_uuid(),email text not null unique,is_active boolean not null default true,created_at timestamptz not null default now());
create table public.site_settings (key text primary key,value jsonb not null,updated_at timestamptz not null default now());

create index articles_status_published_at_idx on public.articles(status, published_at desc);
create index articles_category_id_idx on public.articles(category_id);
create index articles_author_id_idx on public.articles(author_id);

create or replace function public.current_user_is_editor() returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.profiles where id = auth.uid() and role in ('editor','admin')); $$;
create or replace function public.current_user_is_admin() returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$ begin insert into public.profiles (id, display_name, username) values (new.id,coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1), 'Contributor'),null); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.editorial_labels enable row level security;
alter table public.articles enable row level security;
alter table public.tags enable row level security;
alter table public.article_tags enable row level security;
alter table public.program_hubs enable row level security;
alter table public.article_programs enable row level security;
alter table public.data_points enable row level security;
alter table public.subscribers enable row level security;
alter table public.site_settings enable row level security;

create policy "profiles are publicly readable" on public.profiles for select using (true);
create policy "users update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "admins manage profiles" on public.profiles for all using (public.current_user_is_admin()) with check (public.current_user_is_admin());
create policy "categories public read" on public.categories for select using (true);
create policy "labels public read" on public.editorial_labels for select using (true);
create policy "tags public read" on public.tags for select using (true);
create policy "programs public read" on public.program_hubs for select using (true);
create policy "data points public read" on public.data_points for select using (true);
create policy "editors manage categories" on public.categories for all using (public.current_user_is_editor()) with check (public.current_user_is_editor());
create policy "editors manage labels" on public.editorial_labels for all using (public.current_user_is_editor()) with check (public.current_user_is_editor());
create policy "editors manage tags" on public.tags for all using (public.current_user_is_editor()) with check (public.current_user_is_editor());
create policy "editors manage programs" on public.program_hubs for all using (public.current_user_is_editor()) with check (public.current_user_is_editor());
create policy "editors manage data" on public.data_points for all using (public.current_user_is_editor()) with check (public.current_user_is_editor());
create policy "published articles public read" on public.articles for select using (status = 'published' or author_id = auth.uid() or public.current_user_is_editor());
create policy "contributors create own articles" on public.articles for insert with check (auth.uid() = author_id and status in ('draft','review'));
create policy "contributors update own nonpublished articles" on public.articles for update using (auth.uid() = author_id and status in ('draft','review')) with check (auth.uid() = author_id and status in ('draft','review'));
create policy "editors manage all articles" on public.articles for all using (public.current_user_is_editor()) with check (public.current_user_is_editor());
create policy "article tags public read" on public.article_tags for select using (true);
create policy "editors manage article tags" on public.article_tags for all using (public.current_user_is_editor()) with check (public.current_user_is_editor());
create policy "article programs public read" on public.article_programs for select using (true);
create policy "editors manage article programs" on public.article_programs for all using (public.current_user_is_editor()) with check (public.current_user_is_editor());
create policy "anyone can subscribe" on public.subscribers for insert with check (true);
create policy "admins read subscribers" on public.subscribers for select using (public.current_user_is_admin());
create policy "admins manage subscribers" on public.subscribers for update using (public.current_user_is_admin()) with check (public.current_user_is_admin());
create policy "settings public read" on public.site_settings for select using (true);
create policy "admins manage settings" on public.site_settings for all using (public.current_user_is_admin()) with check (public.current_user_is_admin());
