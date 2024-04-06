const User = require("../models/user")
const List = require("../models/list")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv").config();
const jwt = require('jsonwebtoken');

const addTask = async (req, res) => {
    try {
        const { title,  email,completed,starred } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const list = new List({ title,  user: existingUser,completed,starred });
            await list.save().then(() => res.status(200).json({ list }))
            existingUser.list.push(list);
            existingUser.save()
        }

    }
    catch (err) {
        res.status(400).json({ message: "There was an error creating the list." })
    }
}

const updateTask= async (req, res) => {
    try {
        // console.log(1)
        const { title, completed,starred } = req.body;
        // console.log(1)
        const list = await List.findByIdAndUpdate(req.params.id, { title, completed, starred },{new:true});
        if (!list) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated" });


    }
    catch (err) {
        res.status(400).json({ message: "There was an error updating the list." })
    }
}

const deleteTask =async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOneAndUpdate({ email }, { $pull: { list: req.params.id } });
        if (existingUser) {
            const list = await List.findByIdAndDelete(req.params.id).then(() => res.status(200).json({ message: "task deleted" }))

        }

    }
    catch (err) {
        res.status(400).json({ message: "There was an error updating the list." })
    }
}

const getTasks= async (req, res) => {
    // console.log(1)
    const userId = req.user;
    // console.log(1)
    const list = await List.find( { user: userId }).sort({ createdAt: -1 });
    // console.log(list)
    // console.log(1)
    if (list.length !== 0) {
        res.status(200).json({ list });
    }
    else {
        res.status(200).json({ message: "No Task" });
    }


}

module.exports= {getTasks,addTask,updateTask,deleteTask}
