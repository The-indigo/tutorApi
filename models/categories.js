const mongoose=require('mongoose')
const schema= mongoose.Schema

const categoriesSchema= new schema({
    cname:{
        type: String,
        //required: true
    }    
}, {timestamps:true})

module.exports= mongoose.model("Category", categoriesSchema)

