drop database if exists tractorz;
create database tractorz;
use tractorz;

create table employee(
	employee_id char(8) primary key,
    name varchar(500) not null,
    address varchar(500) null,
    email varchar(500) null,
    nin char(9) unique null,
    bank_number char(8) null,
    bank_sort char(6) null,
    start_salary decimal(12,2) null,
    salary decimal(12, 2) null
);

INSERT INTO employee VALUES ('AMD1543F', 'Ann Devon', '3 George Street', 'adevon@kainos.com', 'AB123456C', '12345678', '123456', 30000, 30000);
INSERT INTO employee VALUES ('ARD2314F', 'Anabela Domingues', '12 George Street', 'adomingues@kainos.com', 'CD425254E', '12345678', '123456', 35000, 35000);
INSERT INTO employee VALUES ('CFE2343M', 'Carlos Hernadez', '22 North Street', 'chernadez@kainos.com', 'DE123436C', '12345678', '123456', 45000, 45000);
INSERT INTO employee VALUES ('CGS5437M', 'Dave Diego', '1 Rosehill Street', 'ddiego@kainos.com', 'PE123456W', '12345678', '123456', 30000, 30000);

-- create table bio(
-- 	employee_id char(8) primary key,
--     cv varchar(1000),
--     image mediumblob,
--     fav_tech varchar(50),
--     foreign key (employee_id) references employee(employee_id)
-- );

-- create table salesEmployee(
-- 	employee_id char(8) primary key,
--     commision_rate decimal(6,3),
--     sales_mtd smallint unsigned,
--     foreign key (employee_id) references employee(employee_id)
-- );

-- create table customer(
--     customer_id mediumint auto_increment primary key,
--     company_name varchar(50) not null,
--     key_contact varchar(50),
--     phone_num varchar(15) not null
-- );

-- create table project(
-- 	project_id mediumint auto_increment primary key,
-- 	project_name varchar(32),
--     leader_id char(8),
--     customer_id mediumint,
--     foreign key (leader_id) references employee(employee_id),
--     foreign key (customer_id) references customer(customer_id)
-- );

-- create table assignment(
--     employee_id char(8),
--     project_id mediumint auto_increment,
--     start_date date,
--     end_date date,
--     primary key (employee_id, project_id, start_date),
--     foreign key (employee_id) references employee(employee_id),
--     foreign key (project_id) references project(project_id)
-- );




-- INSERT INTO customer (customer_id, company_name, key_contact, phone_num) VALUES (1, 'Microsoft', 'Bob Ross', '07578374');


-- INSERT INTO project (project_id, project_name, leader_id, customer_id) VALUES (1, 'Very Important Microsoft Project', 'CGS5437M', 1);
-- INSERT INTO project (project_id, project_name, leader_id, customer_id) VALUES (2, 'Important Microsoft Project 2', 'CGS5437M', 1);


-- INSERT INTO assignment (employee_id, project_id, start_date, end_date) VALUES ('CGS5437M', 1, '2019-08-08', '2019-09-09');
-- INSERT INTO assignment (employee_id, project_id, start_date, end_date) VALUES ('CGS5437M', 2, '2019-08-08', '2019-09-09');