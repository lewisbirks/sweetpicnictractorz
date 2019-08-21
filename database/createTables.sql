DROP DATABASE IF EXISTS tractorz;
CREATE DATABASE tractorz;
USE tractorz;

CREATE TABLE department(
  department_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,

  CONSTRAINT `name_check` CHECK (LENGTH(department_name) > 0)
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

  CONSTRAINT `emp_name_check` CHECK (LENGTH(name) > 0),
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
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id),

  CONSTRAINT `commission_rate_check` CHECK (commission_rate >= 0),
  CONSTRAINT `total_sales_check` CHECK (total_sales >= 0)
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