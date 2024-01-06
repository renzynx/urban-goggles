create table profiles (
  id bigint not null primary key,
  role public."Role",
  user_id uuid default uuid_generate_v4(),
  username text
);

create table authors (
  id bigint not null primary key,
  name text not null,
  modified timestamp default now()
);

create table comics (
  id bigint not null primary key,
  title text,
  description text not null,
  thumbnail text not null,
  status public."Status",
  modified timestamp default now(),
  author_id bigint references authors (id)
);

create table bookmarks (
  id bigint not null primary key,
  user_id uuid default uuid_generate_v4(),
  comic_id bigint references comics (id)
);

create table chapters (
  id bigint not null primary key,
  link text not null,
  modified timestamp default now(),
  comic_id bigint references comics (id)
);

