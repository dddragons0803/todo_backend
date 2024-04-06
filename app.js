const express = require("express")
const connectDb= require("./config/dbConnection")
const authRoute = require("./routes/auth")
const listRoute = require("./routes/list")
const cors = require('cors');

const dotenv = require("dotenv").config();
connectDb()
const app = express();

const port = process.env.PORT || 5000;
// provide body parser
app.use(express.json()); 
app.use(cors());
app.get("/",(req,res)=>{
    res.send("hello");
})
app.use('/api/users', authRoute);
app.use('/api/lists', listRoute);

app.listen(port,() =>{  console.log(`hii hii ${port}`) });