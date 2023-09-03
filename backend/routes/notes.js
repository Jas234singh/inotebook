const express =require('express');
const router = express.Router();
const fetchuser =require('../middlewsare/fetchuser');
const Notes =require('../models/Notes');
const {body,validationResult} =require('express-validator');
//ROUTE -1 to fetch all notes api/notes/fetchallnotes -login required
router.get('/fetchallnotes',fetchuser,async(req,res) =>{
    const notes = await Notes.find({user:req.user.id});
    res.json(notes);
})
//ROUTE -2 to add notes api/notes/addNotes -login required
router.post('/addnote',fetchuser,[
    body('title','Enter Your Title').isLength({min:6}),
    body('description','Enter your description').isLength({min:10}),
],async(req,res)=>{
    try{
const {title,description,tag} = req.body;
// if there are errors return the bad request and errors
const errors = validationResult(req);
if(!errors.isEmpty()){
return res.status(400).json({errors:errors.array()});}
const note = new Notes({ // this retruen promise
    title,description,tag,user:req.user.id
})
const savenotes = await note.save();
res.json(savenotes);
    }
 catch(error){
    console.error(error.message);
    res.status(500).send("error has occured");
    }
}
)
//ROUTER - FOR UPDATING INFORMATION/API/AUTH/UPDATENOTE
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} =req.body;
    //add new note
    const newnote ={};
    if(title){newnote.title = title};
if(description){
    newnote.description =description};
if(tag){
    newnote.tag = tag };
    let note =await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("not found");// note not present in notes
    }
    if(note.user.toString()!== req.user.id)
    {
        return res.status(401).send("not allowed to update data of other user");
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.json({note});
})

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} =req.body;
    //add new note
//     const newnote ={};
//     if(title){newnote.title = title};
// if(description){
//     newnote.description =description};
// if(tag){
//     newnote.tag = tag };
    let note =await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("not found");// note not present in notes
    }
    if(note.user.toString()!== req.user.id)
    {
        return res.status(401).send("not allowed to delete data of other user");
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been successfully deleted",note:note});
})


module.exports = router
// while update take  jwttoken of login user and id of notes not user id.

