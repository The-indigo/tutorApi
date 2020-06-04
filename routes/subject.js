const router=require("express").Router()
const subjectController = require('../controllers/subject.js');
const Tutor = require("../models/tutor");
const jwt = require("jsonwebtoken");
const config = require("../.env");

verifyToken = (req, res, next) => {
  var token = req.headers['token'];
    if (!token) {
      return res.send({
        status: "failed",
        message: "provide a token",
      });
    }
    jwt.verify(token, config.secret, function (err, decoded) {
      if (!err) {
            next();
          
      } else {
        res.send({ status: "failed", message: "Error getting requested url" });
      }
    });
  };

 

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

  

router.post('/subject/create', verifyAdmin, subjectController.createSubject)
router.get('/subject/:title', subjectController.findSubjectByName)
router.get('/subject/',  subjectController.findSubjectById)
router.get('/subject/', subjectController.findAllSubjectInCategory)
router.put('/subject/:id',verifyAdmin, subjectController.updateSubject)
router.delete('/subject/:id',verifyAdmin, subjectController.deleteSubject)

module.exports=router