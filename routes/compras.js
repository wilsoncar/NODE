const express = require('express');
const comprasService = require('../services/compras');


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
        const { body: compra } = req;
        try {
            const comprasCreated = await compraService.createCompras(compra);
            res.status(200).json({
                data: comprasCreated,
                message: 'compra created successfully'
            }); 
        } catch (err) {
            res.status(200).json({
                message: 'compra not created'
            });
            next(err);
        }
    });
    
    router.post("/", async function(req, res, next){
        const { body: compra } = req;
        console.log('req', compra);
        try {
            const CompraUpdate = await compraService.updateCompras(compra);
            res.status(200).json({
                data: CompraUpdate,
                message: 'Compra successfully updated'
            });
        } catch (err) {
            res.status(200).json({
                message: 'Compra not updated'
            });
            next(err);
        }
    });

    router.delete("/", async function(req, res, next){
        const { body: compra } = req;
        console.log('Compra to delete', compra)
        try {
            const CompraDelete = await compraService.deleteCompras(compra.id);
            res.status(200).json({
                compra: CompraDelete,
                message: "Compra succesfully Deleted"
            });
        } catch (err) {
            res.status(200).json({
                message: 'Compra not deleted'
            });
            next(err);
        }
    });


}

module.exports = comprasApi;
