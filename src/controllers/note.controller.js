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



//Retrieve and return all notes from database.
exports.findAll =(req,res)=>{

};

//Find a single note with noteId
exports.findOne =(req,res)=>{

};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};