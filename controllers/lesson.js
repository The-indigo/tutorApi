const Lesson = require("../models/lesson");
const Subject = require("../models/subject");

exports.bookLesson = (req, res) => {
  //Enter id of subject you want to book
  const subjectId = req.body.subject;
  const bookedBy=req.params.id
  
 
  if (!subjectId || !bookedBy) {
    res
      .status(400)
      .send({ status: false, message: "Enter subject ID in body and user Id as path" });
    return;
  }

  Subject.findById(subjectId)
  .then((data)=> {
    if(!data){
   res.send({
     status:false,
     message:"The subject you are trying to book does not exist"
   })
    }else{
      Lesson.findOne({ subject: subjectId }).then((lesson) => {
        if(lesson){
          if (lesson.bookedBy==bookedBy) {
            return res.status(423).send({
              status: false,
              message: "Error,You previously registered for this lesson, Pick another subject to register for"
            });
          }
        }else{
          let lesson = new Lesson({
            subject: subjectId,
            bookedBy:bookedBy
          });
        
          lesson
            .save(lesson)
            .then((data) => {
              res.send({
                status:true,
                message:"Lesson booked sucessfully",
                data});
            })
        }

      });

        // .catch((err) => {
        //   res.status(500).send({
        //     message: err,
        //   });
        // });
    }
  })    .catch((err) => {
    res.status(500).send({
      status:false,
      message: err
    });
  });

 
};

// find all lessons
exports.findAllLessons = (req, res) => {
  Lesson.find()
    .then((lesson) => {
      res.send({
        status:true,
        message:"These are all lessons booked",
        lesson});
    })
    .catch((err) => {
      res.status(500).send({
        status:false,
        message: err
      });
    });
};

//find lesson by id
exports.findLessonById = (req, res) => {
  const id = req.query.id;

  Lesson.findById(id)
    .then((lesson) => {
      if (!lesson) {
        res.status(404).send({ status:false, message: "Lesson Not found" });
      } else {
        res.send({status:true,message:"Lesson found", lesson});
      }
    })
    .catch((err) => {
      res.status(500).send({status:false, message: err });
    });
};

//update a lesson by id
exports.updateLesson = (req, res) => {
  //id of subject to update to
  const subjectId = req.body.subject;
  //id of lesson you want to update
  const lessonId = req.params.id;
  if (!subjectId || !lessonId) {
    return res.status(400).send({
      status:false,
      message: "Enter subject ID you want to update to in body and lesson ID you want to update in path",
    });
  }

  Subject.findById(subjectId)
  .then((data)=> {
    if(data){
      Lesson.findByIdAndUpdate(
        lessonId,
        {subject: subjectId },
        { useFindAndModify: false }
      )
        .then((lesson) => {
          if (!lesson) {
            res.status(404).send({
              status:false,
              message: "Lesson not found!",
            });
          } else res.send({status:true, message: "Lesson updated successfully." });
        })
        .catch((err) => {
          res.status(500).send({
            status:false,
            message: err
          });
        });
    }else{
      res.send({status:false, message: "Subject not found"})
    }
  })
  
};

// delete a lesson by id
exports.deleteLesson = (req, res) => {
  const lessonId = req.params.id;

  Lesson.findByIdAndRemove(lessonId,{ useFindAndModify: false })
    .then((lesson) => {
      if (!lesson) {
        res.status(404).send({
          status:false,
          message: "Lesson not found!"
        });
      } else {
        res.send({
          status:true,
          message: "Lesson deleted successfully!"
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status:false,
        message: err
      });
    });
};
