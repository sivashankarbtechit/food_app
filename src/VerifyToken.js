var jwt           =  require('jsonwebtoken'),
    editJsonFile  =  require('edit-json-file'),
    config        =  editJsonFile(__root +'src/config.json'),
    User          =  __db_model.User;


function verifyToken(req,res,next) {
    var token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send("NO token Found");
    }
    jwt.verify(token,config.get('secret'),function(err,decoded){
        if(err){
            return res.status(403).send("NO token Found");
        }
        var user_id = decoded.id;
        console.log("user id",decoded);
        User.findAll({raw:true,where:{user_id:decoded.id,status:true}}).then(function(user){
          if((user == 0 ) || (user == null) || (!user)){
            return res.status(403).send("No Permission To Access ");
          }
          next();

        },function(err){
            return res.status(404).send("No User Found");
        })
    })
}   
        
module.exports    = verifyToken; 