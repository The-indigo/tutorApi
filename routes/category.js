const router=require("express").Router()
const categoryController = require('../controllers/category.js');
const Tutor = require("../models/tutor");
const jwt = require("jsonwebtoken");
const config = require("../.env");

verifyAdmin = (req, res, next) => {
  var token = req.headers['token'];
    if (!token) {
      return res.send({
        status: "failed",
        message: "provide a token",
      });
    }
    jwt.verify(token, config.secret, function (err, decoded) {
      if (decoded) {
        let email = decoded.email;
        Tutor.findOne({ email })
          .then((tutor) => {
            if (!tutor) {
              return res.send({
                status: "Failed",
                message: "Admin not found",
              });
            }
            if (tutor.isadmin === false) {
              return res.send({
                status: "Failed",
                message: "You do not have admin priviledges to access this route",
              });
            } else {
              return next();
            }
          })
          .catch((err) => 
          res.send({
            status:"failed",
            message:err
          }))
          
      } else {
        res.send({ status: "failed", message: "Error getting requested url" });
      }
    });
  };


router.post('/category/create', verifyAdmin, categoryController.createCategory)
router.get('/category/all',  categoryController.findAllCategory)
router.put('/category/:id',verifyAdmin, categoryController.updateCategory)
router.delete('/category/:id', verifyAdmin, categoryController.deleteCategory)


module.exports=router