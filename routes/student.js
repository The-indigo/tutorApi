const router=require("express").Router()
const {signUp,logIn}= require("../controllers/student.js")

router.get("/", (req,res)=>{
    res.send("This is the tutorial app.")
})

router.post('/student/signup', signUp)
router.post('/student/login', logIn)

module.exports=router