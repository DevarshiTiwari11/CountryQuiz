import express from "express";
import pg from "pg";

const app = express();
const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    password: 'MAHAdev1106!',
    port: '5432',
    database: 'world',
});
db.connect();
let arrayDefine = {};
const response = db.query("select * from capitals", (err, res) => {
    if (err) {
        console.log("your error is " + err.stack);
    }
    else {
        arrayDefine = res.rows;
    }
});
// db.end();

//middlewares 
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let arrayAssign = {}; //making a empty array so that i can assign it value and then since it is global so we can use it inside any function

let countryQuestion = {};

let capitalAnswer = {};

let Score = 0 ;

function randomCountry() {
    var randomName = Math.floor(Math.random() * arrayDefine.length);
    console.log("this is randomNumber" + randomName);

    var countryArray = arrayDefine[randomName];
    // arrayAssign = JSON.stringify(countryArray);

    arrayAssign = countryArray; 

    console.log("Random country generated" + JSON.stringify(countryArray));
    console.log(countryArray.country, countryArray.capital);

    countryQuestion = countryArray.country; // since this containg string value so it would be not possible to use dot notation over it hence take this value into a variable to use it later.
    capitalAnswer = countryArray.capital; 
    return (countryArray.country);
}

app.get("/", (req, res) => {
    Score =0 ;
    res.render("index", { 
        countryName: randomCountry(),
        Score: Score,
     });
    console.log("woow" + JSON.stringify(arrayAssign));
});

app.post("/submit", (req, res) => {
    //enter a new random id  pass it to DB 
    // var input = req.body.answer.trim(); 

    console.log("printing " + countryQuestion);  // either use this or 
    // convert string array into JSON again to use dot notation to access object 

    console.log("this is question " + countryQuestion);
    var inputUi = req.body.answer.trim();
    console.log("User entered this " + inputUi);

    console.log("this is " + JSON.stringify(arrayAssign));
    console.log("printing script" + countryQuestion);
    
    console.log(JSON.stringify(capitalAnswer));

    if (capitalAnswer.toLowerCase() === inputUi.toLowerCase()) {
        
        Score++;
        
        res.render("index",{
            score: Score,
            countryName : randomCountry(),

        });

    }
    else {
        console.log("wrong");
        res.render("end",{
            score:Score,
        });
    }
    //if the answer is correct add into score and again call the function to run 
    // for wrong awnser reset the game and pop out the answer !!


});
//Port Creation 
app.listen('3030', (req, res) => {
    console.log("created");
});


