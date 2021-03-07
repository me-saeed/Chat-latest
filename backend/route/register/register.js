const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;


const config = require('../../config/config')
var url=config.mongoURI;



module.exports = function(router) {


    router.post("/signup", (req, res1) => {

      console.log(req.body)
        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("amnaproject");
          
              
                dbo.collection("users").findOne({  username: req.body.username}, function (err, result) {
                  if (err) throw err;
                  console.log(result);
                  if (result == null) {
                    var userobj ={
                   
                      "pic": "",
                      "fullname": req.body.fullname,
                      "role": "user",
                      "verify": "yes",
                      "requestverify": "no",
                      "phone": "",
                      "email": "",
                      "vechiletype":"",
                      "email": req.body.pass,
                      "username": req.body.username,
                     
                      "pass": req.body.pass,
                   
                  };
                
                    dbo.collection("users").insertOne(userobj, function(err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                        db.close();
                      });

                    res1.json("Account created.Now signIn");
                  }
        
                else{

                    res1.json("This Username Already Exist.Try SignIn your account");
                }
              });
    
              
    
            
          
      });
    
        
         });








         router.post("/signupvechile", (req, res1) => {

          console.log(req.body)
            MongoClient.connect(url, function (err, db) {
              if (err) throw err;
              var dbo = db.db("amnaproject");
              
                  
                    dbo.collection("users").findOne({  username: req.body.username}, function (err, result) {
                      if (err) throw err;
                      console.log(result);
                      if (result == null) {
                        var userobj ={
                       
                          "pic": "",
                          "fullname": req.body.fullname,
                          "role": "vehicle",
                          "verify": "no",
                          "requestverify": "yes",
                          "phone": "",
                          "email": "",
                          "vechiletype":req.body.vechiletype,
                          "email": req.body.pass,
                          "username": req.body.username,
                         
                          "pass": req.body.pass,
                       
                      };
                    
                        dbo.collection("users").insertOne(userobj, function(err, res) {
                            if (err) throw err;
                            console.log("1 document inserted");
                            db.close();
                          });
    
                        res1.json("Account created.Now signIn");
                      }
            
                    else{
    
                        res1.json("This Username Already Exist.Try SignIn your account");
                    }
                  });
        
                  
        
                
              
          });
        
            
             });






};