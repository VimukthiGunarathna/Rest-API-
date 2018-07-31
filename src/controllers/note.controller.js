const Note = require('../models/note.model');
// CREATE AND SAVE NOTE
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Note content empty'
    });
  }

  // Create Note
  const note = new Note({
    title: req.body.title || 'Untitled Note',
    content: req.body.content
  });

  // Save Note in DB
  note
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the note'
      });
    });
};

// RETRIEVE AND RETURN ALL NOTES FROM DB.
exports.findAll = (req, res) => {
  Note.find()
    .then(notes => {
      res.send(notes);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving notes'
      });
    });
};

// FIND A SINGLE NOTE WITH NoteId
exports.findOne = (req, res) => {
  // console.log("err");
  Note.findById(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with id' + req.params.noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Note not found with Id' + req.params.noteId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving note with id' + req.params.noteId
      });
    });
};

// UPDATING NOTE
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Note content empty'
    });
  }

  // Find note and update it with reques body
  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title || 'Untitled Note',
      content: req.body.content
    },
    { new: true }
  )
    // new:true is used to return the modified document to the then() function instead of the original
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with Id ' + req.params.noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Note not found with Id ' + req.params.noteId
        });
      }
      return res.status(500).send({
        message: 'Error updating note with id ' + req.params.noteId
      });
    });
};

// DELETING A NOTE
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        });
      }
      res.send({ message: 'Note deleted successfully! ' });
    })
    .cach(err => {
      if (err.kind === 'ObjectId' || err.name === 'NoteFound') {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        });
      }
      return res.status(500).send({
        message: 'Could not delete note with id ' + req.params.noteId
      });
    });
};
