const router = require("express").Router();
const adminController = require("../controllers/admin.js");
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

router.get("/", (req, res) => {
  res.send("This is the express app.");
});

router.post("/admin/login",verifyAdmin, adminController.logIn);
router.post("/admin/makeadmin",verifyAdmin, adminController.makeAdmin);

module.exports = router;
