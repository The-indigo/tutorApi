const router = require("express").Router();
const tutorController = require("../controllers/tutor.js");
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
        .then((admin) => {
          if (!admin) {
            return res.send({
              status: "Failed",
              message: "Admin not found",
            });
          }
          if (admin.isadmin === false) {
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

router.post("/tutor/signup", tutorController.signUp);
router.post("/tutor/login", tutorController.logIn);
router.get("/tutor/all", verifyAdmin, tutorController.findAllTutor);
router.get("/tutor/:id", tutorController.findTutorById);
router.delete("/tutor/:id", verifyAdmin, tutorController.deleteTutor);

module.exports = router;
