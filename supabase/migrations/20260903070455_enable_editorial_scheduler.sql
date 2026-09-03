create extension if not exists pg_cron;

create or replace function private.publish_scheduled_articles()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  affected integer;
begin
  update public.articles
  set status = 'published'::public.article_status,
      published_at = coalesce(scheduled_at, now()),
      updated_at = now()
  where status = 'scheduled'::public.article_status
    and scheduled_at is not null
    and scheduled_at <= now();

  get diagnostics affected = row_count;
  return affected;
end;
$$;

revoke all on function private.publish_scheduled_articles() from public, anon, authenticated;

create index if not exists idx_articles_scheduled_due
  on public.articles (scheduled_at)
  where status = 'scheduled'::public.article_status;

do $$
declare
  existing_job bigint;
begin
  select jobid into existing_job from cron.job where jobname = 'opinimiu-publish-scheduled' limit 1;
  if existing_job is not null then
    perform cron.unschedule(existing_job);
  end if;
end $$;

select cron.schedule(
  'opinimiu-publish-scheduled',
  '* * * * *',
  'select private.publish_scheduled_articles();'
);
