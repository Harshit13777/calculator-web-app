const express = require('express');
const app = express();
const path = require('path');
const mysql=require('mysql');
const cors = require('cors');


//connection to mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Calculator'
  });
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server!');
  });


//middleware
app.use(express.json());//when json data receive
app.use(express.static(path.join(__dirname,'..','calculator', 'build')));
app.use(cors());//to acess cross domain 

 
//serve the app
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'calculator','build', 'index.html'));
});



//signup and insert data into db and create db as user_id
app.post('/signup', (req, res) => {
    const data = req.body;
    //savetoDB;
    let name=data.username;
    let email=data.email;
    let password=data.password;
    let favorite=data.favorite;
    let userId;
    //insert data into users table
    connection.query('insert into users (username,email,password,favourite) values(?,?,?,?);',[name,email,password,favorite], function(err, rows) {
      if (err) {
          res.json({"Error":err.sqlMessage});
          console.log(err.sqlMessage);
        return;
      }
      console.log(rows);
      //get the id user which is insert above
            connection.query('select id from users where email=?',[email] ,function(err, rows) {
              if(err)console.log(err.sqlMessage);
  
              if (rows.length > 0) {
                userId = rows[0].id; 
               //send the id to store for session
                res.json({"userId":userId});
              }
              
  
            });
    });
    
  });
  
  


//for admin login
app.post('/login', function(req, res) {
    let data=req.body;
    let email=data.email;
    let password=data.password;
    console.log(data);
    //check in db if it is and get his id
    connection.query('select * from users where email=?',[email],function(err, rows) {
        if(err)console.log(err.sqlMessage);
        
        if(rows.length>0){
          userId=rows[0].id;
          username=rows[0].username;
          res.json({'userId':userId});
        }
        else{
          res.json({'Error':'NO data'});
        }
          
      
      });


});

//save the history in database
app.post('/saveHistory', function(req, res) {
    let data = req.body;
    let id = data.id;
    let name=data.name;
    let expression=data.expression;
    let result= data.result;
    console.log(data);
    //insert data into database 
    connection.query('insert into History (u_id,name,expression,result) values(?,?,?,?);',[id,name,expression,result], function(err, rows) {
        if (err) {
            res.json({"Error":err.sqlMessage});
            console.log(err.sqlMessage);
          return;
        }
        res.json('receive');
        console.log(rows);
        
      });
    


});





const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


