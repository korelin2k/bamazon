INSERT INTO bamazon_db.departments (`department_name`, `over_head_costs`)
VALUES 
('Audio', 1000),
('Video', 2500),
('Alcohol', 5000),
('Video Games', 950),
('Furniture', 10000),
('Appliances', 7500);


INSERT INTO bamazon_db.products (`product_name`, `department_id`, `price`, `stock_quantity`, `product_sales`)
VALUES
('The Fragle', 1, 12.50, 100, 2500.00),
('Antichrist Superstart', 1, 11.50, 500, 500.00),
('Interstellar', 2, 19.50, 1200, 4500.00),
('The Dark Knight', 2, 17.50, 900, 9500.00),
('Pee Wee Playhouse', 2, 2.50, 10000, 0),
('Vodka', 3, 22.50, 750, 5300.00),
('Rum', 3, 27.50, 200, 2500.00),
('Baileys', 3, 32.99, 1000, 12500.00),
('Mason\'s Redemption', 4, 59.99, 10000, 125000.00),
('Pressler\'s Portal', 4, 49.99, 5000, 75000.00),
('Couch', 5, 1250, 10, 3750.00),
('Table', 5, 750, 25, 6000.00),
('Fridge', 6, 1500, 5, 3000.00);