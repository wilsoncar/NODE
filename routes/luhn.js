const express = require('express');


function luhnApi(app) {

    const router = express.Router();
    
    app.use("/luhn", router);
    
    router.post("/", (req, res)=>{
        let {credit} = req.body;
        console.log("Valor body:",credit);
        res.status(200).json({
            isValid: isValidNumberCreditCard(credit)
        })
    
    });

    function split_numbers(n) {
        return (n + '').split('').map((i) => { return Number(i); });
    }

    function luhn(credit) {
        const numcredit = split_numbers(credit);
        let n =0;
        let sum=0;
        numlength = numcredit.length;
        for (let i=numlength - 1; i >=0; i--){
            if(i%2==0){
                n=numcredit[i];
            }
            else {
                n=numcredit[i]*2;
                if(n>9){
                    n=(n-10) + 1;
                }
            }
            sum = sum+n;
            console.log("valor n: ", n++)
        }
        console.log("suma: ",sum);
        return sum;
    }

    function isValidNumberCreditCard(credit) {
        const result = luhn(credit);
        let isValid = false;
        if (result%10==0){
            isValid=true;
            console.log("\nNúmero válido\n");
        }
        else{
            isValid=false;
            console.log("\nNúmero no válido\n");
        }
        return isValid;
    }
}

module.exports = luhnApi;