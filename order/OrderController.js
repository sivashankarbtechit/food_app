var express       =  require('express');
    router        =  express.Router(),
    bodyparser    =  require('body-parser'),
    editJsonFile  =  require('edit-json-file'),
    conf          =  editJsonFile(__root +"src/config.json"),
    VerifyToken   =  require(__root +"src/VerifyToken.js"),
    Order         =  __db_model.Order;
    Food          =  __db_model.Food;
    Ingredients   =  __db_model.Ingredients;


router.use(bodyparser.json());

// CREATE ORDER
router.post("/order",VerifyToken,function(req,res){
    var order_datas = req.body;
    Order.create(order_datas).then(function(data){
       res.status(200).send("Order Created Successfully")
    }, function(err){
        console.log("err",err);
       res.status(500).send("Problem In Createing Order");
    })
 })

 //GET ALL ORDERS USER

 router.get("/list/:user_id",VerifyToken,function(req,res){
    console.log("req.params",req.params)
    Order.findAll({raw:true,where:{user_id:req.params.user_id}}).then(function(data){
       res.status(200).send(data);
    }, function(err){
       res.status(500).send("Problem In Finding Order");
    })
 })


 // CREATE FOOD
router.post("/food",function(req,res){
    var f_data = req.body;
    Food.create(f_data).then(function(data){
       res.status(200).send("Food Created Successfully")
    }, function(err){
       res.status(500).send("Problem In Createing Food");
    })
 })

module.exports=router;
