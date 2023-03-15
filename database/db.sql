create database database_links;

use database_links;

create table users(
    id int(11) not null,
    username varchar(16) not null,
    password varchar(60) not null,
    fullname varchar(100) not null
);

alter table users add primary key(id);

alter table users modify id int(11) not null auto_increment, auto_increment = 2;

describe users;

-- Links tables 
create table link (
    id INT(11) not null,
    title varchar(150) not null,
    url varchar(255) not null,
    description TEXT,
    user_id int(11),
    created_at timestamp not null default current_timestamp,
    constraint fk_user foreign key (user_id) references users(id)
);

alter table link add primary key(id);

alter table link modify id int(11) not null auto_increment, auto_increment = 2;

