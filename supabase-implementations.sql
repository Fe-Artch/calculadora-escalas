create extension if not exists pgcrypto;

create table if not exists public.implementation_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  parent_id uuid references public.implementation_items(id) on delete cascade,
  item_type text not null default 'implementation' check (item_type in ('project', 'group', 'implementation')),
  title text not null check (char_length(trim(title)) > 0),
  prompt text not null default '',
  notes text not null default '',
  status text not null default 'idea' check (status in ('idea', 'preparing', 'ready', 'sent', 'testing', 'implemented', 'discarded')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high')),
  position integer not null default 0,
  is_completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists implementation_items_user_id_idx on public.implementation_items(user_id);
create index if not exists implementation_items_parent_id_idx on public.implementation_items(parent_id);
create index if not exists implementation_items_status_idx on public.implementation_items(user_id, status);
create index if not exists implementation_items_position_idx on public.implementation_items(user_id, parent_id, position);

alter table public.implementation_items enable row level security;

drop policy if exists "Users can view own implementation items" on public.implementation_items;
create policy "Users can view own implementation items"
on public.implementation_items for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own implementation items" on public.implementation_items;
create policy "Users can insert own implementation items"
on public.implementation_items for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own implementation items" on public.implementation_items;
create policy "Users can update own implementation items"
on public.implementation_items for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own implementation items" on public.implementation_items;
create policy "Users can delete own implementation items"
on public.implementation_items for delete
using (auth.uid() = user_id);

create or replace function public.set_implementation_items_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  if new.is_completed and (old.is_completed is distinct from true) then
    new.completed_at = now();
  elsif not new.is_completed then
    new.completed_at = null;
  end if;
  return new;
end;
$$;

drop trigger if exists implementation_items_updated_at on public.implementation_items;
create trigger implementation_items_updated_at
before update on public.implementation_items
for each row execute function public.set_implementation_items_updated_at();
