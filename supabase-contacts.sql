-- Migração não destrutiva da área Contatos.
-- Pode ser executada tanto em um projeto novo quanto sobre a tabela legada.

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  phone text not null,
  group_name text not null,
  details text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.contacts add column if not exists name text;
alter table public.contacts add column if not exists phone text;
alter table public.contacts add column if not exists group_name text;
alter table public.contacts add column if not exists details text default '';
alter table public.contacts add column if not exists created_at timestamptz default now();
alter table public.contacts add column if not exists updated_at timestamptz default now();

-- Lê as colunas legadas via JSONB para que a migração também funcione quando
-- uma ou mais delas não existirem. Nenhuma coluna antiga é removida.
with legacy_rows as (
  select
    c.id,
    to_jsonb(c) as data
  from public.contacts c
),
legacy_values as (
  select
    id,
    coalesce(
      nullif(btrim(data ->> 'name'), ''),
      nullif(btrim(data ->> 'nome'), ''),
      nullif(btrim(data ->> 'contact_name'), ''),
      'Contato sem nome'
    ) as migrated_name,
    coalesce(
      nullif(btrim(data ->> 'phone'), ''),
      nullif(btrim(data ->> 'telefone'), ''),
      nullif(btrim(data ->> 'telephone'), ''),
      nullif(btrim(data ->> 'whatsapp'), ''),
      'Não informado'
    ) as migrated_phone,
    coalesce(
      nullif(btrim(data ->> 'group_name'), ''),
      nullif(btrim(data ->> 'custom_group'), ''),
      nullif(btrim(data ->> 'group_custom'), ''),
      nullif(btrim(data ->> 'contact_group'), ''),
      nullif(btrim(data ->> 'group'), ''),
      nullif(btrim(data ->> 'grupo'), ''),
      nullif(btrim(data ->> 'category'), ''),
      'Outros'
    ) as migrated_group,
    (
      select nullif(
        string_agg(
          case when item_label is null then item_value else item_label || ': ' || item_value end,
          E'\n'
          order by first_position
        ),
        ''
      )
      from (
        select
          min(position) as first_position,
          (array_agg(label order by position))[1] as item_label,
          (array_agg(btrim(value) order by position))[1] as item_value
        from (
          values
            (
              1,
              'Especialidades',
              case when jsonb_typeof(data -> 'specialties') = 'array'
                then array_to_string(array(select jsonb_array_elements_text(data -> 'specialties')), ', ')
                else data ->> 'specialties'
              end
            ),
            (
              2,
              'Modalidade',
              case when jsonb_typeof(data -> 'modality') = 'array'
                then array_to_string(array(select jsonb_array_elements_text(data -> 'modality')), ', ')
                else data ->> 'modality'
              end
            ),
            (
              3,
              'Público',
              case when jsonb_typeof(data -> 'audience') = 'array'
                then array_to_string(array(select jsonb_array_elements_text(data -> 'audience')), ', ')
                else data ->> 'audience'
              end
            ),
            (4, 'Localização', data ->> 'location'),
            (5, 'Preço/convênio', data ->> 'price_note'),
            (6, 'E-mail', data ->> 'email'),
            (7, 'Instagram', data ->> 'instagram'),
            (8, 'Site', data ->> 'site'),
            (
              9,
              'Marcadores',
              case when jsonb_typeof(data -> 'tags') = 'array'
                then array_to_string(array(select jsonb_array_elements_text(data -> 'tags')), ', ')
                else data ->> 'tags'
              end
            ),
            (10, 'Descrição', data ->> 'description'),
            (11, 'Observações', data ->> 'private_notes'),
            (12, 'Texto de indicação', data ->> 'indication_text')
        ) as legacy_item(position, label, value)
        where nullif(btrim(value), '') is not null
          and btrim(value) not in ('[]', 'null', 'undefined')
        group by lower(btrim(value))
      ) as deduplicated_item
    ) as migrated_details
  from legacy_rows
)
update public.contacts c
set
  name = v.migrated_name,
  phone = v.migrated_phone,
  group_name = v.migrated_group,
  details = coalesce(nullif(btrim(c.details), ''), v.migrated_details, ''),
  created_at = coalesce(c.created_at, now()),
  updated_at = coalesce(c.updated_at, now())
from legacy_values v
where c.id = v.id;

alter table public.contacts alter column name set not null;
alter table public.contacts alter column phone set not null;
alter table public.contacts alter column group_name set not null;
alter table public.contacts alter column details set default '';
alter table public.contacts alter column details set not null;
alter table public.contacts alter column created_at set default now();
alter table public.contacts alter column created_at set not null;
alter table public.contacts alter column updated_at set default now();
alter table public.contacts alter column updated_at set not null;

create index if not exists contacts_user_id_idx on public.contacts(user_id);
create index if not exists contacts_user_group_idx on public.contacts(user_id, group_name);

create or replace function public.set_contacts_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists contacts_set_updated_at on public.contacts;
create trigger contacts_set_updated_at
before update on public.contacts
for each row
execute function public.set_contacts_updated_at();

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

comment on column public.contacts.details is
  'Anotações internas do contato. Não são incluídas automaticamente na lista para o paciente.';
