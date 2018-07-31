module.exports = app => {
  try {
    const notes = require('../controllers/note.controller.js');

    //  Create a new note
    app.post('/notes', notes.create);

    //  Retrieve all notes
    app.get('/notes', notes.findAll);

    //  Retrieve a single note with noteId
    app.get('/notes/:noteId', notes.findAll);

    //  Update a with noted
    app.put('/notes/:noteId', notes.update);

    //  Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
  } catch (error) {
    console.log(error);
  }
};
