const router = require("express").Router();

const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
const verifyToken = require('../middleware/verifyTokenHandler')
const {addTask,updateTask,deleteTask,getTasks}=require("../Controller/list")


router.use(verifyToken)

// create task
router.post("/addTask", addTask)

// update
router.put("/updateTask/:id", updateTask)

// update
router.delete("/deleteTask/:id", deleteTask)

router.get("/getTasks",getTasks)

module.exports = router;