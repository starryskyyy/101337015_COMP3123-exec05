const express = require('express');
const app = express();
const router = express.Router();
const fs = require("fs");

const user = require('C:/101337015_COMP3123-exec05/user.json');

router.get('/home', (req, res) => {
  res.sendFile(__dirname + "/home.html")
});


router.get('/profile', (req, res) => {
  res.json(user);
});


router.get('/login', (req, res) => {
  const username = req.query.username;// query = {login:"bret"}
  const password = req.query.password; //params = {password:"bret@123"}

  fs.readFile("user.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file");
      return;
    }
    try {
      const user = JSON.parse(jsonString);
      if (user.username === username && user.password === password) {
        let success = {
          status: true,
          message: "User Is valid"
        }
        res.send(JSON.stringify(success));
      }
      else if(user.username !== username && user.password === password){
        let wrong_login = {
          status: false,
        message: "User Name is invalid"
        }
        res.send(JSON.stringify(wrong_login));
      }
      else if (user.username === username && user.password !== password) {
        let wrong_password = {
          status: false,
          message: "Password is invalid"
        }
        res.send(JSON.stringify(wrong_password));
      }
      else{

      }
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req, res) => {
  const username = req.query.username;// query = {login:"bret"}

   res.send(`<h1>${username} successfully logout.</h1>`)
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port ' + (process.env.port || 8081));