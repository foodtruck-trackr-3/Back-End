
exports.up = function(knex) {
    return knex.schema.createTable('foodtrucks', foodTrucks => {
        foodTrucks.increments();

        foodTrucks
            .string('truckName', 128)
            .notNullable()
            .unique();
        foodTrucks
            .string('location', 128)
            .notNullable();
        foodTrucks
            .string('foodType', 128)
            .notNullable();
        foodTrucks
            .string('owner', 128)
            .notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('foodtrucks');
};
