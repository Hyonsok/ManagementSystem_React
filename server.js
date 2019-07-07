const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const multer = require('multer');
const upload = multer({dest:'./upload'});

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();


app.get('/api/customers', (req,res) => {
    connection.query(
        'SELECT * FROM customers WHERE isDeleted = 0',
        (err,rows, fields) => {
            res.send(rows);
        }
    )
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req,res) => {
    let sql = 'INSERT INTO customers VALUES (?, ?, ?, ?, ?, ?, now(), 0)';
    let id = req.body.id;
    console.log(id);
    let image = '/image/' + req.file.filename;
    console.log(image);
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    
    let params = [id,image,name,birthday,gender,job];
    connection.query(sql,params,
        (err,rows,fields) => {
            res.send(rows);
            console.log(err);
            console.log(rows);
        }    
    );
});

app.delete('/api/customers/:id', (req,res) => {
    let sql = 'UPDATE customers SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err,rows,field) => {
            res.send(rows);
        }
    )

});


app.listen(port, () => console.log(`Listening on port ${port}`));