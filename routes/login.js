const express = require('express');
const loginService = require('../services/login');


function loginAPI(app) {
    const router = express.Router();
    app.use("/login", router);
    const LoginService = new loginService();

    router.get("/", async function(req, res, next){
        const { body: login } = req;
        const verificado = await LoginService.verificarlogin(login);
        try {
            try{
                if (verificado == 1) {
                    res.status(200).json({
                        message: 'Inicio de Sesión con éxito, Bienvenido!'
                    });
                    console.log("verificado:",verificado); 
                }
                if (verificado == 2) {
                    res.status(200).json({
                        message: 'Username Incorrecto'
                    });
                    console.log("verificado:",verificado); 
                }
                if (verificado == 3) {
                    res.status(200).json({
                        message: 'La cuenta no está activa'
                    });
                    console.log("verificado:",verificado); 
                }    
                else {
                    res.status(200).json({
                        message: 'Password Incorrecto'
                    });
                    console.log("verificado:",verificado);
                }

            }catch (err){
                res.status(200).json({
                    message: 'Error al validar los datos'
                });
            }  
        } catch(err) {
            next(err);
        }
    });

}

module.exports = loginAPI;