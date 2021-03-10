const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;


const config = require('../../config/config')
var url=config.mongoURI;



module.exports = function(router) {









   
    router.post("/fetchpendingusers", (req, res1) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("amnaproject");
            
                
                  dbo.collection("users").find({verify:"no"}).toArray(function(err, result) {
                    if (err) throw err;
                 
               
               
                   /// sendotp(result.phone,finalcode)
                    ///result["otp"] = finalcode;
    
                  ///  sendotp()
    
                   console.log(result)
                      res1.json(result);
                  
                });
      
                
      
              
            
        });
    })
    
    
   
};