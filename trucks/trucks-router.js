const router = require('express').Router();
const authenticated = require('../auth/authenticate-middleware.js');
const checkRole = require('../auth/check-role-middleware.js');
const Trucks = require('./trucks-model.js');

router.get('/', (req, res) => {
    Trucks.find()
        .then(trucks => {
            res.status(200).json(trucks);
        })
        .catch(err => {
            res.status(404).json({
                message: "Truck not found"
            });
        });
});

router.get('/mytrucks', authenticated, (req, res) => {
    const owner = req.dJwt.username;
    if(owner) {
        Trucks.find(owner)
            .then(trucks => {
                res.status(200).json(trucks);
            })
            .catch(err => {
                res.status(404).json({
                    message: "No trucks found"
                })
            });
    } else {
        res.status(400).json({
            message: "You must be logged in to perform this action"
        });
    };
});

router.get('/:foodtype', (req, res) => {
    const foodType = req.params;
    if(foodType) {
        Trucks.findBy(foodType)
            .then(trucks => {
                res.status(200).json(trucks);
            })
            .catch(err => {
                res.status(404).json({
                    message: `No ${foodType} trucks found`
                });
            });
    } else {
        res.status(400).json({
            message: "Please provide a food type"
        })
    }
    
});

router.post('/add', authenticated, checkRole('Operator'), (req, res) => {
    const truckOwner = req.dJwt.username;
    const { truckName, location, foodType } = req.body;
    const truck = {
        truckName: truckName,
        location: location,
        foodType: foodType,
        owner: truckOwner
    }

    console.log("Truck Owner", truckOwner);
    console.log("Truck", truck);

    if(truckName && location && foodType) {
        Trucks.add(truck)
            .then(saved => {
                res.status(201).json(saved);
            })
            .catch(err => {
                res.status(500).json({error: "Could not add truck"});
            });
    } else {
        res.status(400).json({message: "Please provide a truck name, location, and food type"})
    };
});

router.put('/update/:id', authenticated, checkRole('Operator'), (req, res) => {
    const truckOwner = req.dJwt.username;
    const { id } = req.params;
    const truckIn = req.body;
    let truck = {
        truckName: truckIn.truckName,
        location: truckIn.location,
        foodType: truckIn.foodType,
        owner: truckIn.truckOwner
    };

    if(truck.owner == truckOwner) {
        if(truck.name && truck.location && truck.foodType) {
            Trucks.update(id, truck)
                .then(updated => {
                    res.status(201).json(updated);
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Could not update truck"
                    });
                })
        } else {
            res.status(400).json({message: "Please enter a truck name, location, and food type"});
        }
    } else {
        res.status(400).json({message: "You do not own this truck"});
    }
});

router.delete('/remove/:id', authenticated, checkRole('Operator'), (req, res) => {
    const { id } = req.params;
    const operator = req.dJwt.username;
    Trucks.findById(id)
        .then(truck => {
            if(truck.owner == operator) {
                Trucks.remove(id)
                    .then(deleted => {
                        res.status(200).json(deleted);
                    })
                    .catch(err => {
                        res.status(500).json({message: "Could not remove truck"});
                    })
            } else {
                res.status(400).json({
                    message: "You cannot delete a truck you do not own"
                });
            }
        })
        .catch(err => {
            res.status(404).json({
                message: "Truck not found"
            })
        })
});

module.exports = router;