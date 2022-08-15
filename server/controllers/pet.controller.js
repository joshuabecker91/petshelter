const Pet = require('../models/pet.model');

// CRUD Below -----------------------------------------

// Create
const createNewPet = (req, res) => {
    Pet.create(req.body)
        .then((newPet) => {
            res.json({ newPet });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

// Get / Read All
const getAllPets = (req, res) => {
    Pet.find()
        .then((allPets) => {
            res.json(allPets);
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

// Get / Read One
const getOnePet = (req, res) => {
    Pet.findOne({ _id: req.params.id })
        .then((queriedPet) => {
            res.json(queriedPet);
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

// Update - with validators so we can capture and display errors on front end
const updatePet = (req, res) => {
    Pet.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((updatedPet) => {
            res.json({ updatedPet });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

// Delete
const deletePet = (req, res) => {
    Pet.deleteOne({ _id: req.params.id })
        .then((deletedResponse) => {
            res.json({ deletedResponse });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

module.exports = {
    createNewPet,
    getOnePet,
    getAllPets,
    updatePet,
    deletePet,
};