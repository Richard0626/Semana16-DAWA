const Comida = require('../models/comidas');
const comidaController = {};


comidaController.getComida = async (req, res)=> {
    const comidas = await Comida.find();
    res.json(comidas);
}

comidaController.createComida = async (req, res) => {
    const comida = new Comida(req.body);
    await comida.save();
    res.json({'status':'comida recibida'});
}

comidaController.getOne = async (req, res) => {
    const comida = await Comida.findById(req.params.id);
    res.json(comida);
}
comidaController.updateComida = async (req, res) => {
    const { id } = req.params;
    const comida = {
        titulo : req.body.titulo,
        descripcion : req.body.descripcion,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        imagen: req.body.imagen
    };
    await Comida.findByIdAndUpdate(id, { $set: comida }, { new: true });
    res.json({ status: 'comida actualizado' });
}

comidaController.deleteComida = async (req, res) => {
    await Comida.findByIdAndRemove(req.params.id);
    res.json({ status: 'comida eliminada' });
    
}

module.exports = comidaController;