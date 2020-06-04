const mongoose=require('mongoose')
const schema= mongoose.Schema

const studentSchema= new schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        default:"student"
    },
    isadmin:{
        type:Boolean,
        default:false
    },
    lessons:[{type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson"}]
    
}, {timestamps:true})

module.exports= mongoose.model("Student", studentSchema)