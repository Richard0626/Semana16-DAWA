const mongoose = require('mongoose');

const { Schema } = mongoose;

const ComidaSchema = new Schema({
    titulo: { type: String, require: false },
    descripcion: { type: String, require: false },
    precio: { type: Number, require: false },
    cantidad: { type: Number, require: false },
    imagen: { type: String, require: false },
});

module.exports = mongoose.model('Comida', ComidaSchema);
