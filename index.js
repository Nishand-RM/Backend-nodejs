
const express = require('express');

const app = express();

const fs = require('fs');



const now = new Date().toString();


app.post('/create', (req, res) => {
    fs.writeFile('./files/date-time.txt', now, (err) => {
        if (err) {
            res.send(err);
        }
        else {

            res.send("successfull");
        }
    })
})

app.get('/path',(req,res)=>{
   
    const file = fs.readd('./files');
 
    res.send(file);

})


app.listen(3001, 'localhost', () => {
    console.log("server is running on http://localhost:3001");
});