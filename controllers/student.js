const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const config = require("../.env");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res, next) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  if (!firstName || !lastName || !email || !password) {
    res.status(400).send({
      status: false,
      message: "All fields are required",
    });
    return;
  }
  Student.findOne({ email }).then((student) => {
    if (student) {
      return res
        .status(423)
        .send({ status: false, message: "This email already in use" });
    }
  });
  bcrypt
    .hash(password, 12)
    .then((password) => {
      let student = new Student({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        role: "student",
        isadmin: false,
      });
      return student.save();
    })
    .then(() =>
      res
        .status(200)
        .send({ status: true, message: "Student registered successfully" })
    )
    .catch((err) => console.log(err));
};

exports.logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Student.findOne({ email })
    .then((student) => {
      if (!student) {
        return res
          .status(404)
          .send({
            status: "failed",
            message: "Student not found,please provide correct credentials",
          });
      }

      bcrypt.compare(password, student.password).then((valid) => {
        if (!valid) {
          return res
            .status(403)
            .send({
              status: "failed",
              message:
                "Incorrect username or password, please provide correct details",
            });
        }
        const token = jwt.sign(
          { email: student.email, _id: student._id, role: student.role },
          config.secret,
          { expiresIn: "5hr" }
        );
        res.status(200).send({
          status: "success",
          message: "login successfull",
          _id: student._id,
          token,
        });
      });
    })
    .catch((err) => console.log(err));
};
