const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/connectDB');

const app = express()
const port = 3001

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:3000','https://trungtamquanlytremocoi.onrender.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

const route= require('./routes')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(bodyParser.json())
// route(app);
app.use('/',route)
// connectDB()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
