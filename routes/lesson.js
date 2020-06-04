const router=require("express").Router()
const lessonController = require('../controllers/lesson.js');
const Tutor = require("../models/tutor");
const jwt = require("jsonwebtoken");
const config = require("../.env");

verifyAdmin = (req, res, next) => {
  var token = req.headers['token'];
    if (!token) {
      return res.send({
        status: false,
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
                status: false,
                message: "Admin not found",
              });
            }
            if (tutor.isadmin === false) {
              return res.send({
                status: false,
                message: "You do not have admin priviledges to access this route",
              });
            } else {
              return next();
            }
          })
          .catch((err) => 
          res.send({
            status:false,
            message:err
          }))
          
      } else {
        res.send({ status: false, message: err });
      }
    });
  };

  verifyAdminAndStudent = (req, res, next) => {
    var token = req.headers['token'];
    if (!token) {
      return res.send({
        status: false,
        message: "provide a token",
      });
    }
    jwt.verify(token, config.secret, function (err, decoded) {
      if (decoded) {
          if(decoded.role=="student"){
              return next();
          }else{
            let email = decoded.email;
            Tutor.findOne({ email })
              .then((tutor) => {
                if (!tutor) {
                  return res.send({
                    status: false,
                    message: "Admin not found",
                  });
                }
                if (tutor.isadmin === false) {
                  return res.send({
                    status:false,
                    message: "You do not have admin priviledges to access this route",
                  });
                } else {
                  return next();
                }
              })
              .catch((err) => 
              res.send({
                status:false,
                message:err
              }))
          }   
      } else {
        res.send({ status: false, message: err });

      }
    });
  };



router.post('/lesson/:id', verifyAdminAndStudent, lessonController.bookLesson)
router.get('/lesson/all',verifyAdmin, lessonController.findAllLessons)
router.get('/lesson',verifyAdmin, lessonController.findLessonById)
router.put('/lesson/:id', verifyAdmin, lessonController.updateLesson)
router.delete('/lesson/:id', verifyAdmin, lessonController.deleteLesson)


module.exports=router