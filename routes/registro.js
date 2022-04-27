const express = require('express');
const RegistroService = require('../services/registro');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


function RegistroApi(app) {
    const router = express.Router();
    app.use("/registro", router);
    const registroService = new RegistroService();

    router.put("/", async function(req, res, next){
        const { body: data } = req;
        try {
            const token = await GenerarToken(10);
            console.log("token:",token);
            var Tokensecreto = jwt.sign({ foo: 'bar' },token);
            const pendiente = { "isActive": false, "Token": Tokensecreto };
            const registro = Object.assign(data,pendiente);
            const correo = await EnviarEmail(registro, token);
            const registroCreated = await registroService.createRegistro(registro);
            res.status(200).json({
                data: registroCreated,
                message: 'registro creado, el token de validación fue enviado a su correo'
            });
        } catch (err) {
            res.status(200).json({
                message: 'registro no creado'
            });
            next(err);
        }
    });  
    
}


async function GenerarToken(length){
    var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
    var token = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (caracteres.length-1)).toFixed(0);
        token[i] = caracteres[j];
    }
    return token.join("");
}

async function EnviarEmail(n, token) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'Nodemailerwilson@gmail.com',
          pass: 'Nodemailerwilson10'
        }
    });

    var mailOptions = {
        from: 'Nodemailerwilson@gmail.com',
        to: n.email,
        subject: 'Token de funcionalidad Login',
        text:'Este es su token: ' + token + '\n\nPara validar la cuenta es necesario ingresar username y token'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(200).json({
            message: 'Ocurrio un error al momento de enviar el token al correo ' + n.email
            });
        } else {
          console.log('Email enviado');
        }
    });
}
module.exports = RegistroApi;
