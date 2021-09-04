var express       =  require('express');
    router        =  express.Router(),
    bodyparser    =  require('body-parser'),
    editJsonFile  =  require('edit-json-file'),
    conf          =  editJsonFile(__root +"src/config.json"),
    Order         =  __db_model.Order;
    Food          =  __db_model.Food;
    Ingredients   =  __db_model.Ingredients;


router.use(bodyparser.json());


 //GET INGREDIENTS WHOSE LESS

 router.get("/lt",function(req,res){
    Ingredients.findAll({raw:true,where: {
        availablequantity: {
            [Op.lt]: Sequelize.col('thresholdquantity')
        }
    }}).then(function(data){
       res.status(200).send(data);
    }, function(err){
       res.status(500).send("Problem In Finding Order");
    })
 })


//Vendor 

 router.get("/:vendor",function(req,res){
    Ingredients.findAll({raw:true,where: { vendorname : req.params.vendor}}).then(function(data){
       res.status(200).send(data);
    }, function(err){
        console.log("err ",err);
       res.status(500).send("Problem In Finding Order");
    })
 })


 //


 router.get("/list/gt",function(req,res){
   Food.findAll({raw:true,where: {
      costofproduction: {
           [Op.gt]: Sequelize.col('sellingcost')
       }
   }}).then(function(data){
      res.status(200).send(data);
   }, function(err){
      res.status(500).send("Problem In Finding Order");
   })
})

 // CREATE INGREDIENTS
router.post("/ingredients",function(req,res){
    var i_data = req.body;
    Ingredients.create(i_data).then(function(data){
       res.status(200).send("INGREDIENTS Created Successfully")
    }, function(err){
       res.status(500).send("Problem In Createing INGREDIENTS");
    })
 })

module.exports=router;
