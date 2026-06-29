create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  group_name text not null,
  phone text not null,
  email text,
  instagram text,
  site text,
  location text,
  modality text[] not null default '{}',
  audience text[] not null default '{}',
  specialties text[] not null default '{}',
  tags text[] not null default '{}',
  price_note text,
  description text,
  private_notes text,
  indication_text text,
  status text not null default 'active',
  favorite boolean not null default false,
  last_verified_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contacts_status_check check (status in ('active', 'inactive', 'check', 'do_not_recommend'))
);

create index if not exists contacts_user_id_idx on public.contacts(user_id);
create index if not exists contacts_user_group_idx on public.contacts(user_id, group_name);
create index if not exists contacts_user_status_idx on public.contacts(user_id, status);
create index if not exists contacts_user_favorite_idx on public.contacts(user_id, favorite);

alter table public.contacts enable row level security;

drop policy if exists "contacts_select_own" on public.contacts;
drop policy if exists "contacts_insert_own" on public.contacts;
drop policy if exists "contacts_update_own" on public.contacts;
drop policy if exists "contacts_delete_own" on public.contacts;

create policy "contacts_select_own"
on public.contacts
for select
to authenticated
using (user_id = auth.uid());

create policy "contacts_insert_own"
on public.contacts
for insert
to authenticated
with check (user_id = auth.uid());

create policy "contacts_update_own"
on public.contacts
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "contacts_delete_own"
on public.contacts
for delete
to authenticated
using (user_id = auth.uid());
