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
  nin CHAR(9) UNIQUE NULL UNIQUE,
  bank_number CHAR(8) NULL,
  bank_sort CHAR(6) NULL,
  start_salary DECIMAL(12,2) NULL,
  salary DECIMAL(12, 2) NULL,
  department_id SMALLINT UNSIGNED,
  FOREIGN KEY (department_id) REFERENCES department(department_id),

    CONSTRAINT `name_check` CHECK (LENGTH(name) > 0),
    CONSTRAINT `address_check` CHECK (LENGTH(name) > 0),
    CONSTRAINT `email_check` CHECK (
        email regexp '([0-9a-zA-Z]([+-.\\w]?[0-9a-zA-Z]+)*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]*\\.)+[a-zA-Z]+)'),
    CONSTRAINT `nin_check` CHECK ((LENGTH(nin) = 9 OR LENGTH(nin) = 8) AND 
        nin regexp '([A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z](?<!BG|GB|NK|KN|TN|NT|ZZ))[0-9]{6}[A-DFMP]?'),
    CONSTRAINT `bank_number_check` CHECK (LENGTH(bank_number) = 8 AND
        bank_number regexp '\\d{8}'),
    CONSTRAINT `bank_sort_check` CHECK (LENGTH(bank_sort) = 6 AND bank_sort regexp '\\d{6}'),
    CONSTRAINT `start_salary_check` CHECK (start_salary > 0),
    CONSTRAINT `salary_check` CHECK (salary > 0)
);

CREATE TABLE salesEmployee(
	employee_id CHAR(8) PRIMARY KEY,
  commission_rate DECIMAL(5,2) DEFAULT 0,
  total_sales DECIMAL(12,2) DEFAULT 0,
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

INSERT INTO department (department_name) VALUES ('Sales');
INSERT INTO department (department_name) VALUES ('Talent');
INSERT INTO department (department_name) VALUES ('Software');
INSERT INTO department (department_name) VALUES ('Finance');

INSERT INTO employee VALUES ('AMD1543F', 'Ann Devon', '3 George Street', 'adevon@kainos.com', 'WW912569A', '12345678', '123456', 30000, 30000, 1);
INSERT INTO employee VALUES ('ARD2314F', 'Anabela Domingues', '12 George Street', 'adomingues@kainos.com', 'LP088140B', '12345678', '123456', 35000, 35000, 2);
INSERT INTO employee VALUES ('CFE2343M', 'Carlos Hernadez', '22 North Street', 'chernadez@kainos.com', 'NE336037A', '12345678', '123456', 45000, 45000, 4);
INSERT INTO employee VALUES ('CGS5437M', 'Dave Diego', '1 Rosehill Street', 'ddiego@kainos.com', 'EY132360C', '12345678', '123456', 30000, 30000, 4);

INSERT INTO salesEmployee (employee_id, commission_rate) VALUES ('AMD1543F', 7.23);

-- create table bio(
-- 	employee_id char(8) PRIMARY KEY,
--     cv varchar(1000),
--     image mediumblob,
--     fav_tech varchar(50),
--     FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
-- );


-- create table customer(
--     customer_id mediumint auto_increment PRIMARY KEY,
--     company_name varchar(50) not null,
--     key_contact varchar(50),
--     phone_num varchar(15) not null
-- );

-- create table project(
-- 	project_id mediumint auto_increment PRIMARY KEY,
-- 	project_name varchar(32),
--     leader_id char(8),
--     customer_id mediumint,
--     FOREIGN KEY (leader_id) REFERENCES employee(employee_id),
--     FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
-- );

-- create table assignment(
--     employee_id char(8),
--     project_id mediumint auto_increment,
--     start_date date,
--     end_date date,
--     PRIMARY KEY (employee_id, project_id, start_date),
--     FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
--     FOREIGN KEY (project_id) REFERENCES project(project_id)
-- );




-- INSERT INTO customer (customer_id, company_name, key_contact, phone_num) VALUES (1, 'Microsoft', 'Bob Ross', '07578374');


-- INSERT INTO project (project_id, project_name, leader_id, customer_id) VALUES (1, 'Very Important Microsoft Project', 'CGS5437M', 1);
-- INSERT INTO project (project_id, project_name, leader_id, customer_id) VALUES (2, 'Important Microsoft Project 2', 'CGS5437M', 1);


-- INSERT INTO assignment (employee_id, project_id, start_date, end_date) VALUES ('CGS5437M', 1, '2019-08-08', '2019-09-09');
-- INSERT INTO assignment (employee_id, project_id, start_date, end_date) VALUES ('CGS5437M', 2, '2019-08-08', '2019-09-09');