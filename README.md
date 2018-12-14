# bamazon

Welcome to the classroom version of fake (bazarro) shopping cart site... not at all related to the site amazon. Really.

### Before you run
1. Update sql/flyway.conf with the appropriate database info
2. The schema should automatically be created with the Flyway run - no need to manually run the schema/seed files.

### How to start
`npm start`

This includes several steps:
1. Installs the appropriate node modules
2. Runs flyway for the database schema & mysql
3. Runs the appropriate unit tests with mocha & chai
4. Builds it with gulp (leverages TypeScript)

### In action!
1. Customer works
2. Manager works
3. Supervisor "in the future"!

#### Customer Purchasing
![Customer Purchasing an Item!](/docs/customer.jpg "Customer")

For you - try out the manager!