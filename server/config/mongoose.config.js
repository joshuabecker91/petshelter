const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/petshelter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

    .then(() => console.log("Established a connection to the database"))
    .catch(() => console.log("Something went wrong when connecting to the database", err));
