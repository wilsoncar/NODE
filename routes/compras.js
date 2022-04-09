const express = require('express');
const comprasService = require('../services/compras');
const Compras_Interface = require('../interfaces/compras');

function comprasApi(app) {
    const router = express.Router();
    app.use("/compras", router);
    const compraService = new comprasService();

    router.get("/", async function(req, res, next){
        const { body : compra } = req;
        try {
            const consult = await compraService.getCompras(compra.compra);
            res.status(200).json({
                compra: consult,
                message: "compra requested"
            });
        } catch (err) {
            next(err);
        }
    });

    router.put("/", async function(req, res, next){
        const { body } = req;
        try {
            const objectCompras = Compras_Interface;
            objectCompras.nombre = body.nombre;
            objectCompras.precio = body.precio;
            objectCompras.cantidad = body.cantidad;
            objectCompras.peso = body.peso;
            if (req=! null) {
                const comprasCreated = await compraService.createCompras(objectCompras);
                res.status(200).json({
                    data: comprasCreated,
                    message: 'compra created successfully'
                });
            } else {
                res.status(200).json({
                    message: 'compra not created'
                });
            }
        } catch (err) {
            next(err);
        }
    });  
}

module.exports = comprasApi;
