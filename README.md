#### SETUP ####

Navigate to base directory in bash and run the following command:  npm server

#### Authentication ####

This back end uses a header token named "authorization" for all auth operations as required

## POST ##

/api/auth/register

- Required: username, password, customer/operator

/api/auth/login

- Required: username, password

#### Trucks ####

## GET ##

/api/trucks

- Retrieves a list of food trucks
- Information returned for each truck: id, truckName, location, foodType, owner

/api/trucks/:filter

- Retrieves a list of food trucks with the requested filter
- Information returned for each truck: id, truckName, location, foodType, owner

### AXIOS WITH AUTH BELOW ###

## GET ##

/api/trucks/mytrucks

- Retrieves a list of trucks owned by the operator
- Information returned for each truck: id, truckName, location, foodType

## POST ##

- Requires the user be logged in as an operator

/api/trucks/add

- Adds a food truck to the database
-- Requires: truckName, location, foodType
-- filter for "/api/trucks/:filter" is based on foodType
-- Returns the id for the new truck

## UPDATE ##

/api/trucks/update/:id

- Requires the user to be logged in as an operator and the owner of the food truck
- Updates the information of the food truck
- Requires: truckName, location, foodType

## DELETE ##

/api/trucks/remove/:id

- Requires the user to be logged in as an operator and the owner of the food truck
- Removes a food truck from the database