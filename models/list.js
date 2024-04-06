const mongoose = require("mongoose")
const listSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
 
    completed: {
        type: Boolean,
        default: false,
    },
    starred: {
        type: Boolean,
        default: false,
    },
    user:[
        {
            type:mongoose.Types.ObjectId,
            ref:'User',
        },
    ],
},
{timeStamps:true} );
module.exports= mongoose.model("List",listSchema)