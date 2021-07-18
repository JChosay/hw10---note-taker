const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

router.get("/api/notes",(req,res) => {
    return fs.readFile("./db/db.json","utf8",(err, data) => {
        if (err) throw err;

        res.json(JSON.parse(data));
    });
});

router.post("/api/notes",(req,res) => {
    //prepare new note
    const newNote = req.body;
    newNote.id = uuidv4();
    //we read
    return fs.readFile("./db/db.json","utf8",(err, data) => {
        if (err) throw err;
        //modify the notes
        const allNotes = JSON.parse(data);
        allNotes.push(newNote);
        //write it back
        fs.writeFile("./db/db.json",JSON.stringify(allNotes),"utf8", () => {
            res.json(newNote);
        });
    });
});

router.delete("/api/notes/:id",(req,res) => {
    //get id
    const id = req.params.id;
    //we read
    return fs.readFile("./db/db.json","utf8",(err, data) => {
        if (err) throw err;
        //modify the notes
        const allNotes = JSON.parse(data).filter((note) => id !== note.id);
        //write it back
        fs.writeFile("./db/db.json",JSON.stringify(allNotes),"utf8", () => {
            res.json({
                id: id,
                success: true
            });
        });
    });
});

module.exports = router;