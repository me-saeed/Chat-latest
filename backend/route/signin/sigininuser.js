const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;


const config = require('../../config/config')
var url=config.mongoURI;



module.exports = function(router) {









    router.post("/signin", (req, res1) => {


   

        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("amnaproject");
          
              
                dbo.collection("users").findOne({  username: req.body.username,pass:req.body.pass }, function (err, result) {
                  if (err) throw err;
                  console.log(result);
                  if (result == null) {
                   
                    res1.json("fail");
                  }
        
                else{
                 /// sendotp(result.phone,finalcode)
                  ///result["otp"] = finalcode;

                ///  sendotp()

                  console.log(result)
                    res1.json(result);
                }
              });
    
              
    
            
          
      });
    
        
         });

};