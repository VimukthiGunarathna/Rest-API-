const Note =require('../models/note.model');

//CREATE AND SAVE NOTE 
exports.create = (req,res)=>{

    //Validate request
    if(!req.body.content){
        return res.status(400).send({
        message: "Note content empty"
    }); }

    //Create Note
    const note=new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    });


    //Save Note in DB
    note.save()
    .then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating the note"
        });
    });


    
};



//RETRIEVE AND RETURN ALL NOTES FROM DB.
exports.findAll =(req,res)=>{
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes"
        });
    });
};


//FIND A SINGLE NOTE WITH NoteId
exports.findOne =(req,res)=>{

    Note.findById(req.params.noteId)
    .then(note =>{
        if(!note){
            return res.status(404).send({
                message: "Note not found with id"+ req.params.noteId
            });
        }
        res.send(note);
    }).catch(err =>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Note not found with Id" + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id" + req.params.noteId
        });
    });
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};