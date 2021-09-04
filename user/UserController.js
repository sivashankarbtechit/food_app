var express       =  require('express');
    router        =  express.Router(),
    bodyparser    =  require('body-parser'),
    editJsonFile  =  require('edit-json-file'),
    bcrypt        =  require('bcryptjs'),
    jwt           =  require('jsonwebtoken'),
    conf          =  editJsonFile(__root +"src/config.json"),
    User          =  __db_model.User;

router.use(bodyparser.json());

//USER SINGUP API

router.post("/signup",function(req,res){
   var user_date = req.body;
   user_date.password = bcrypt.hashSync(user_date.password, 8);
   User.create(user_date).then(function(data){
      res.status(200).send("User Created Successfully")
   }, function(err){
      res.status(500).send("problem in createing user");
   })
})


//USER LOGIN API

router.post("/login",function(req,res){
   console.log("req.body ",req.body);
   var login_data = req.body;
   User.findOne({raw:true,where:{email:login_data.email,status:true}}).then(function(user){
      if((user == 0) || ( user == null ) || (!user)) {
         res.status(404).send("Please Check You Username");
      }else{
         var validPassword =  bcrypt.compareSync(login_data.password, user.password);
         if (!validPassword) return res.status(401).send("Invalid Password")

         var last_login_at = new Date(); 
         var last_login = {
         "last_login_at" : last_login_at 
        };
   
         User.update(last_login,{where:{email:login_data.email}}).then(function(data){
            var user_id = user.user_id;
            var token   = jwt.sign({id:user_id},conf.get('secret'),{
               expiresIn:conf.get('expires_time')
            });
            res.status(200).send({ auth : true,token : token, userid:user_id,expiresIn:conf.get('expires_time') });
         },function(err){
   
         })        
      }  
   },function(err){
      res.status(500).send("There is problem please Try after some time");
   })
})

//Update User Password 

router.put("/updatepassword",function(req,res){
   var req_body = req.body;
   User.findOne({raw:true,where:{user_id:req.body.user_id}}).then(function(data){
        var validPassword =  bcrypt.compareSync(req_body.password, data.password);
      if (validPassword) {
         var password =  bcrypt.hashSync(req_body.newpassword, 8);
         var pass = {
            "password" : password 
         };
         User.update(pass,{where:{user_id:req.body.user_id}}).then(function(data){
            res.status(200).send("Password Updated Successfully"); 
         },function(err){
            res.status(400).json({ error: "Problem in Password Updation"});        
         })  
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
   }, function(err){
      console.log("err",err)
      res.status(500).send(" problem in update users ");
   })
})

//Update status

router.put("/updatestatus",function(req,res){
   User.update(req.body,{where:{user_id:req.body.user_id}}).then(function(data){
      res.status(200).send("updated Successfully");
   }, function(err){
      console.log("err",err)
      res.status(500).send(" Problem In Update User Status ");
   })
})

// //Update User

// router.put("/updateuser",function(req,res){
//    User.update(req.body,{where:{user_id:req.body.user_id}}).then(function(data){
//       res.status(200).send("updated Successfully");
//    }, function(err){
//       console.log("err",err)
//       res.status(500).send(" problem in update users ");
//    })
// })


module.exports=router;
