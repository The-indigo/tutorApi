const Tutor = require("../models/tutor");
const jwt = require("jsonwebtoken");
const config = require("../.env");

verifyToken = (req, res, next) => {
    var token = req.query.jwt;
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
    var token = req.query.jwt;
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