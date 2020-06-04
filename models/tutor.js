const mongoose=require('mongoose')
const schema= mongoose.Schema

const tutorSchema= new schema({
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
    subjects:[{type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"}],

    lessons:[{type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson"}],
        
    isadmin:{type:Boolean},
    
}, {timestamps:true})

module.exports= mongoose.model("Tutor", tutorSchema)