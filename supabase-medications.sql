-- Banco de dados da página Medicações — versão 0.2
-- Execute este arquivo uma vez no SQL Editor do Supabase.

create table if not exists public.med_entities (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, name text not null, entity_type text not null check (entity_type in ('medication','class')), color text not null default '#4568dc', created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(user_id,name,entity_type));
create table if not exists public.med_attributes (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, name text not null, value_type text not null default 'term' check (value_type in ('term','text','number','duration','boolean')), created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(user_id,name));
create table if not exists public.med_attribute_values (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, attribute_id uuid not null references public.med_attributes(id) on delete cascade, label text not null, note text not null default '', created_at timestamptz not null default now(), unique(user_id,attribute_id,label));
create table if not exists public.med_relations (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, entity_id uuid not null references public.med_entities(id) on delete cascade, attribute_id uuid not null references public.med_attributes(id) on delete cascade, value_id uuid not null references public.med_attribute_values(id) on delete cascade, created_at timestamptz not null default now(), unique(user_id,entity_id,attribute_id,value_id));
create table if not exists public.med_entity_classes (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, entity_id uuid not null references public.med_entities(id) on delete cascade, class_id uuid not null references public.med_entities(id) on delete cascade, created_at timestamptz not null default now(), unique(user_id,entity_id,class_id), check(entity_id <> class_id));
create table if not exists public.med_maps (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, name text not null, attribute_id uuid references public.med_attributes(id) on delete set null, entity_ids jsonb not null default '[]'::jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now());

create or replace function public.set_med_updated_at() returns trigger language plpgsql set search_path=public as $$ begin new.updated_at=now(); return new; end; $$;
drop trigger if exists med_entities_updated_at on public.med_entities; create trigger med_entities_updated_at before update on public.med_entities for each row execute function public.set_med_updated_at();
drop trigger if exists med_attributes_updated_at on public.med_attributes; create trigger med_attributes_updated_at before update on public.med_attributes for each row execute function public.set_med_updated_at();
drop trigger if exists med_maps_updated_at on public.med_maps; create trigger med_maps_updated_at before update on public.med_maps for each row execute function public.set_med_updated_at();

alter table public.med_entities enable row level security; alter table public.med_attributes enable row level security; alter table public.med_attribute_values enable row level security; alter table public.med_relations enable row level security; alter table public.med_entity_classes enable row level security; alter table public.med_maps enable row level security;

do $$ declare t text; begin
  foreach t in array array['med_entities','med_attributes','med_attribute_values','med_relations','med_entity_classes','med_maps'] loop
    execute format('drop policy if exists %I on public.%I', t || '_own', t);
    execute format('create policy %I on public.%I for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())', t || '_own', t);
  end loop;
end $$;

create index if not exists med_entities_user_idx on public.med_entities(user_id);
create index if not exists med_values_attribute_idx on public.med_attribute_values(attribute_id);
create index if not exists med_relations_entity_attribute_idx on public.med_relations(entity_id,attribute_id);
create index if not exists med_memberships_entity_idx on public.med_entity_classes(entity_id);
create index if not exists med_maps_user_idx on public.med_maps(user_id);
