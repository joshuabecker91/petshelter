const PetController = require('../controllers/pet.controller');

module.exports = (app) => {
    app.post('/api/pet', PetController.createNewPet);
    app.get('/api/pet', PetController.getAllPets);
    app.get('/api/pet/:id', PetController.getOnePet);
    app.put('/api/pet/:id', PetController.updatePet);
    app.delete('/api/pet/:id', PetController.deletePet);
};