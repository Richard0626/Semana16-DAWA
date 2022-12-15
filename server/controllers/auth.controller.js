const User = require('../dao/auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '123456789';
const authController = {};

authController.createUser = (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    }

    User.create(newUser, (err, user) => {
        if (err && err.code == 11000) return res.status(409).send('Email existente');
        if (err) return res.status(500).send('Server Error');
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
            expiresIn: expiresIn
        });
        const dataUser = {
            name: user.name,
            email: user.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        }
        // response a nuestro angular 
        // res.send({ user });
        res.send({ dataUser });
    });
}

authController.loginUser = (req, res,next)  => {
    const userData = {
        email: req.body.email,
        password : req.body.password
    }
    // buscar en la bd mongodb si existe este usuario
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) return res.status(500).send('Server Error');
        // si nos nos devuelve un user
        if (!user) {
            res.status(409).send({message:'Email No existe'});
        } else {
            // comparar contraseñas                     parte back      //parte base de datos
            const resultPassword = bcrypt.compareSync (userData.password,user.password);
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: user.id },
                SECRET_KEY, { expiresIn: expiresIn });
                const dataUser = {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                // res.send({ userData });
                res.send({ dataUser });
            } else {

                res.status(409).send({message:'Contraseña incorrecta'});
            }
        }
    })

}


module.exports = authController;