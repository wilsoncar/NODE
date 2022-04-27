const express = require('express');
const isActiveService = require('../services/IsActive');


function IsActiveAPI(app) {
    const router = express.Router();
    app.use("/IsActive", router);
    const isActive = new isActiveService();

    router.post("/", async function(req, res, next){
        const { body: data } = req;
        console.log(data);
        try {
            const tokenverificado = await isActive.verificarToken(data);
            if (tokenverificado == 1) {
                res.status(200).json({
                    message: 'Token verificado, su cuenta ya está activa'
                });   
            } else {
                res.status(200).json({
                    message: 'Token incorrecto'
                });    
            }

        } catch(err) {
            res.status(200).json({
                message: 'No fue posible verificar el token, volver a intentar'
            });
            next(err);
        }
    });

}

module.exports = IsActiveAPI;