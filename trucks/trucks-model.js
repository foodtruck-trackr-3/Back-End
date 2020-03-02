const db = require('../database/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    findByOwner,
    update,
    remove
};

function find() {
    return db('foodtrucks')
        .select('id', 'truckName', 'location', 'foodType', 'owner');
}

function findBy(filter) {
    return db('foodtrucks')
        .where('foodType', filter);
    
}

async function add(truck) {
    const [id] = await db('foodtrucks').insert(truck);
    return findById(id);
}

function findById(id) {
    return db('foodtrucks')
        .select('id', 'truckName', 'location', 'foodType', 'owner')
        .where({ id })
        .first();
}

function findByOwner(owner) {
    return db('foodtrucks')
        .where('owner', owner)
        .select('id', 'truckName', 'location', 'foodType');
}

function update(id, truck) {
    return db('foodtrucks')
        .where({ id })
        .update(truck);
}

function remove(id) {
    return db('foodtrucks')
        .where({ id })
        .del();
}