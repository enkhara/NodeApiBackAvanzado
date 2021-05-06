var express = require('express');
const Advertisement = require('../model/Advertisement');
var router = express.Router();



router.get('/', async function(req, res, next)  {
    try{
        const name = req.query.name;
        const sale = req.query.sale;
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const fields = req.query.fields;
        const sort = req.query.sort;
        const price = req.query.price;

        const filter = {};

        if(name){
            //filter.name = name;
            filter.name = new RegExp ('^'+ name)
        }

        if(sale){
            filter.sale = sale;
        }

        if(price){
            filter.price = price;
        }

        const result = await Advertisement.lista(filter, limit, skip, fields, sort);

        res.render('index', { title: 'NodePop' , advertisements:result});
        //res.json(result)
        //console.log(res, result)
    }catch(err){
        next(err);
    }
})


module.exports = router;