DROP DATABASE IF EXISTS tractorz;
CREATE DATABASE tractorz;
USE tractorz;

CREATE TABLE department(
  department_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE employee(
  employee_id CHAR(8) PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  address VARCHAR(500) NULL,
  email VARCHAR(500) NULL,
  nin CHAR(9) unique NULL UNIQUE,
  bank_number CHAR(8) NULL,
  bank_sort CHAR(6) NULL,
  start_salary decimal(12,2) NULL,
  salary decimal(12, 2) NULL,
  department_id SMALLINT UNSIGNED,
  FOREIGN KEY (department_id) REFERENCES department(department_id),

    constraint `name_check` check (length(name) > 0),
    constraint `address_check` check (length(name) > 0),
    constraint `email_check` check (
        email regexp '([0-9a-zA-Z]([+-.\\w]?[0-9a-zA-Z]+)*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]*\\.)+[a-zA-Z]+)'),
    constraint `nin_check` check ((length(nin) = 9 or length(nin) = 8) and 
        nin regexp '([A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z](?<!BG|GB|NK|KN|TN|NT|ZZ))[0-9]{6}[A-DFMP]?'),
    constraint `bank_number_check` check (length(bank_number) = 8 and
        bank_number regexp '\\d{8}'),
    constraint `bank_sort_check` check (length(bank_sort) = 6 and bank_sort regexp '\\d{6}'),
    constraint `start_salary_check` check (start_salary > 0),
    constraint `salary_check` check (salary > 0)
);

INSERT INTO department (department_name) VALUES ('Sales');
INSERT INTO department (department_name) VALUES ('Talent');
INSERT INTO department (department_name) VALUES ('Software');
INSERT INTO department (department_name) VALUES ('Finance');
INSERT INTO department (department_name) VALUES ('Fun');


INSERT INTO employee VALUES ('AMD1543F', 'Ann Devon', '3 George Street', 'adevon@kainos.com', 'WW912569A', '12345678', '123456', 30000, 30000, 1);
INSERT INTO employee VALUES ('ARD2314F', 'Anabela Domingues', '12 George Street', 'adomingues@kainos.com', 'LP088140B', '12345678', '123456', 35000, 35000, 2);
INSERT INTO employee VALUES ('CFE2343M', 'Carlos Hernadez', '22 North Street', 'chernadez@kainos.com', 'NE336037A', '12345678', '123456', 45000, 45000, 4);
INSERT INTO employee VALUES ('CGS5437M', 'Dave Diego', '1 Rosehill Street', 'ddiego@kainos.com', 'EY132360C', '12345678', '123456', 30000, 30000, 4);

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