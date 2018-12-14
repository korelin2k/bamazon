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
> ┌─────────┬───────────────────────┬────────────────┬───────┐  
> │ Item ID │ Product Name          │ Department ID  │ Price │  
> ├─────────┼───────────────────────┼────────────────┼───────┤  
> │ 1       │ The Fragle            │ Audio(1)       │ 12.5  │  
> ├─────────┼───────────────────────┼────────────────┼───────┤  
> │ 2       │ Antichrist Superstart │ Audio(1)       │ 11.5  │  
> ├─────────┼───────────────────────┼────────────────┼───────┤  
> │ 3       │ Interstellar          │ Video(2)       │ 19.5  │  
> ├─────────┼───────────────────────┼────────────────┼───────┤  
> │ 4       │ The Dark Knight       │ Video(2)       │ 17.5  │  
> ├─────────┼───────────────────────┼────────────────┼───────┤  
> │ 5       │ Pee Wee Playhouse     │ Video(2)       │ 2.5   │  
> ├─────────┼───────────────────────┼────────────────┼───────┤  
> │ 6       │ Vodka                 │ Alcohol(3)     │ 22.5  │  
> ├─────────┼───────────────────────┼────────────────┼───────┤  
> │ 7       │ Rum                   │ Alcohol(3)     │ 27.5  │  
> ├─────────┼───────────────────────┼────────────────┼───────┤  
> │ 8       │ Baileys               │ Alcohol(3)     │ 32.99 │  
> ├─────────┼───────────────────────┼────────────────┼───────┤  
> │ 9       │ Darrens Rum           │ Alcohol(3)     │ 25    │  
> ├─────────┼───────────────────────┼────────────────┼───────┤  
> │ 10      │ Mason's Redemption    │ Video Games(4) │ 59.99 │  
> ├─────────┼───────────────────────┼────────────────┼───────┤  
> │ 11      │ Pressler's Portal     │ Video Games(4) │ 49.99 │  
> ├─────────┼───────────────────────┼────────────────┼───────┤  
> │ 12      │ Couch                 │ Furniture(5)   │ 1250  │  
> ├─────────┼───────────────────────┼────────────────┼───────┤  
> │ 13      │ Table                 │ Furniture(5)   │ 750   │  
> ├─────────┼───────────────────────┼────────────────┼───────┤  
> │ 14      │ Fridge                │ Appliances(6)  │ 1500  │  
> └─────────┴───────────────────────┴────────────────┴───────┘  

> ? What item do you want to purchase? 1  
> ? How many units do you want to purchase? 4  
> You just purchased: The Fragle x4  

For you - try out the manager!