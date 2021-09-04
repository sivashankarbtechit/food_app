global.Sequelize = require('sequelize');
global.Op = Sequelize.Op;

const operatorsAliases = {
	$notIn	: Op.notIn,
	$gte  	: Op.gte,
	$lte	: Op.lte,
	$lt   	: Op.lt,
	$gt   	: Op.gt,
	$ne   	: Op.ne,
	$or 	: Op.or,
	$like 	: Op.like,
	$notLike: Op.notLike
}

var sequelize_port 	=  3306,
    db_username		=  "siva",
    db_password		=  "siva@123",
    db_name    		=  "squash";


var sequelize = new Sequelize('mysql://'+db_username+':'+db_password+'@localhost:'+sequelize_port+'/'+db_name,{ define: {charset: 'utf8',collate: 'utf8_general_ci', timestamps: true},logging:false,dialectOptions: {dateStrings: true,typeCast: true},timezone: '+05:30',operatorsAliases});


try {
   sequelize.authenticate();
   console.log("connection created")
}catch(error){
   console.log("error")
}    

var User = sequelize.define('user',{ 
	user_id: { 
		type: Sequelize.UUID ,
		defaultValue: Sequelize.UUIDV1 ,
		primaryKey: true
	},
	email  : { 
		type: Sequelize.STRING,
		unique: true
	}, 
	name               : { type: Sequelize.STRING },
	last_login_at      : { type: Sequelize.TIME },
	password           : { type: Sequelize.STRING },
	status             : { type: Sequelize.BOOLEAN,defaultValue: true}
})

var Food = sequelize.define('food',{ 
	food_id: { 
		type: Sequelize.UUID ,
		defaultValue: Sequelize.UUIDV1 ,
		primaryKey: true
	},
	name  : { type: Sequelize.STRING },
	lot_number  : { 
		type: Sequelize.INTEGER,
		unique: true
	},
	cuisine            : { type: Sequelize.STRING },
	ingredients        : { type: Sequelize.STRING },
	costofproduction   : { type: Sequelize.INTEGER },
	sellingcost        : { type: Sequelize.INTEGER }
})

var Ingredients = sequelize.define('ingredients',{
    name  : { type: Sequelize.STRING },
	lot_number  : { 
		type: Sequelize.INTEGER,
		unique: true
	},
	availablequantity   : { type: Sequelize.INTEGER },
	thresholdquantity   : { type: Sequelize.INTEGER },
	price               : { type: Sequelize.INTEGER },
	vendorname          : { type: Sequelize.STRING },
	vendoremail         : { type: Sequelize.STRING }
})

var Order     = sequelize.define('order',{
 
	order_num : { 
		type: Sequelize.UUID ,
		defaultValue: Sequelize.UUIDV1 ,
		primaryKey: true
	},
	status              : { type: Sequelize.STRING },
	order_date          : { type: Sequelize.STRING },
	date_of_delivery    : { type: Sequelize.STRING },
    mode_of_transport   : { type: Sequelize.STRING }

})

User.hasMany(Order,{foreignKey:'user_id',onUpdate:'CASCADE',onDelete:'CASCADE'});

sequelize.sync();

module.exports = {
   User           : User,
   Food           : Food,
   Ingredients    : Ingredients,
   Order          : Order 
}
