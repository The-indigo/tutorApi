const Category = require("../models/categories");

exports.createCategory = (req, res) => {
  const cname = req.body.cname;
  if (!cname) {
    res
      .status(400)
      .send({ status: false, message: "Content can not be empty!" });
    return;
  }

  if (cname != "JSS" && cname != "SSS" && cname != "Primary") {
    return res.status(400).send({
      status: false,
      message: "Category can only be JSS, SSS or Primary!",
    });
  }

  Category.findOne({ cname }).then((name) => {
    if (name) {
      return res
        .status(423)
        .send({ status: false, message: "This category already exists" });
    }
    let category = new Category({ cname: cname });
    return category
       .save(category)
       .then(() =>
       res
         .status(200)
         .send({ status: true, message: "Category registered successfully" })
     )
  }).catch((err) => console.log(err));
};

// find All category
exports.findAllCategory = (req, res) => {
  Category.find()
    .then((category) => {
      res.send(category);
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Category.",
      });
    });
};

//update a category by id
exports.updateCategory = (req, res) => {
  const id = req.params.id;
  const cname=req.body.cname
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  if (cname) {
    Category.findByIdAndUpdate(id, {cname:cname}, { useFindAndModify: false })
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message:  "Category not found!",
        });
      } else res.send({ message: "Category was updated successfully." });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error updating Category",
      });
    });
  }else{
    return res.status(400).send({
      message: "Category name to update can not be empty!",
    });
  }


};

// delete a category by id
exports.deleteCategory = (req, res) => {
  const id = req.params.id;

  Category.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot delete. Category not found!`,
        });
      } else {
        res.send({
          message: "Category deleted successfully!",
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete Subject",
      });
    });
};
