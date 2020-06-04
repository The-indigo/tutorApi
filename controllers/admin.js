const Tutor = require("../models/tutor");
const jwt = require("jsonwebtoken");
const config = require("../.env");

exports.logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Tutor.findOne({ email })
    .then((tutor) => {
      if (!tutor) {
        return res.status(404).send({
          status: "failed",
          message: "Admin not found,please provide correct credentials",
        });
      }

      if (tutor.isadmin === false) {
        return res
          .status(404)
          .send({ status: "failed", message: "You are not  an admin" });
      }

      if (password != "admin") {
        res.status(403).send({
          status: "failed",
          message:
            "Incorrect username or password, please provide correct details",
        });
      }

      const token = jwt.sign(
        {
          email: tutor.email,
          _id: tutor._id,
          role: tutor.role,
        },
        config.secret,
        { expiresIn: "1hr" }
      );
    return  res.status(200).send({
        _id: admin._id,
        token,
      });
    })
    .catch((err) => res.send({message:err}));
};

exports.makeAdmin = (req, res) => {
  const makeAdmin = req.body.makeAdmin;
  const id = req.body.id;
  if (!makeAdmin) {
    return res.status(400).send({
      message: "Enter either true to make this tutor an admin or false to not make this tutor an admin ",
    });
  }
  if(!id){
    return res.status(400).send({
      message: "Provide the id of the tutor!",
    });
  }

  if (makeAdmin === "true" || makeAdmin === "false") {
    Tutor.findByIdAndUpdate(id, {isadmin:makeAdmin}, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            status: false,
            message: "Tutor not found!"
          });
        } else res.send({status:true, message: "Tutor was updated successfully." });
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send({
          status:false,
          message: "Error updating Admin"
        });
      });
  }else{
    return res.status(404).send({
      status: false,
      message: "Enter either true to make this tutor an admin or false to not make this tutor an admin"
    });
  }
};

exports.signUpAsTutor = (req, res, next) => {
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
  Tutor.findOne({ email }).then((tutor) => {
    if (tutor) {
      return res
        .status(423)
        .send({ status: false, message: "This email already in use" });
    }
  });
  bcrypt
    .hash(password, 12)
    .then((password) => {
      let admin = new Tutor({
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