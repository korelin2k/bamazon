drop database bamazon_db;
create database bamazon_db;

create table bamazon_db.departments(
	`department_id` INTEGER AUTO_INCREMENT NOT NULL,
    `department_name` VARCHAR(100) NOT NULL,
    `over_head_costs` DECIMAL(10,4) NOT NULL,
    PRIMARY KEY (department_id),
    INDEX(`department_id`)
);

create table bamazon_db.products(
    `item_id` INTEGER AUTO_INCREMENT NOT NULL,
    `product_name` VARCHAR(100) NOT NULL,
    `department_id` INTEGER NOT NULL,
    `price` DECIMAL(10,4) NOT NULL,
    `stock_quantity` INTEGER NOT NULL,
    `product_sales` DECIMAL(10,4),
    PRIMARY KEY (item_id),
    FOREIGN KEY (department_id) REFERENCES bamazon_db.departments(department_id),
    INDEX (`item_id`)
);