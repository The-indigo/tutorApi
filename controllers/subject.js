const Subject = require("../models/subject");

//create a subject
exports.createSubject = (req, res) => {
  const title = req.body.title;
  //The id of the category you want to insert the subject into
  const category = req.body.id;
  if (!title || !category) {
    res
      .status(400)
      .send({ status: false, message: "Content can not be empty!" });
    return;
  }

  Subject.findOne({ title }).then((subject) => {
    if (subject) {
      return res
        .status(423)
        .send({ status: false, message: "This subject already exists" });
    } else {
      let subject = new Subject({
        title: title,
        category: category,
      });

      subject
        .save(subject)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err
          });
        });
    }
  });
};

// find subjects by title
exports.findSubjectByName = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Subject.find(condition)
    .sort({ title: 1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err
      });
    });
};

//find subject in category by id
exports.findSubjectById = (req, res) => {
  const subjectId = req.body.id;
  const category=req.query.categoryId

  Subject.findById(subjectId)
    .then((subject) => {
      if (!subject) res.status(404).send({ message: "Subject Not found" });
      else res.send(subject);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

//find all subject in a category
exports.findAllSubjectInCategory = (req, res) => {
  var query = { category: req.query.category };
  Subject.find(query)
    .then((subject) => {
      res.send(subject);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err
      });
    });
};

//update a subject by id
exports.updateSubject = (req, res) => {
  const title = req.body.title;
  //insert the id of the category you want to insert the subject into
  const category = req.body.category;
  //The id of the subject to update
  const id = req.params.id;
  if (!title || !category) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  Subject.findByIdAndUpdate(
    id,
    { title: title, category: category },
    { useFindAndModify: false }
  )
    .then((subject) => {
      if (!subject) {
        res.status(404).send({
          message: "Subject not found!",
        });
      } else res.send({ message: "Subject was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

// delete a subject by id
exports.deleteSubject = (req, res) => {
  const id = req.params.id;

  Subject.findByIdAndRemove(id,{ useFindAndModify: false })
    .then((subject) => {
      if (!subject) {
        res.status(404).send({
          message: "Subject not found",
        });
      } else {
        res.send({
          message: "Subject was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:err
      });
    });
};


