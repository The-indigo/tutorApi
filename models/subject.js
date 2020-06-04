const mongoose = require("mongoose");
const schema= mongoose.Schema

const subjectSchema= new schema({
    title: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }  
}, {timestamps:true})

module.exports= mongoose.model("Subject", subjectSchema)




