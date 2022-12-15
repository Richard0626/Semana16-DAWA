const mongoose = require('mongoose');

const URI = 'mongodb://localhost/comidas';

mongoose.connect(URI)
    .then(db => console.log('db is conectado'))
    .catch(err => console.log(err));
module.exports = mongoose;