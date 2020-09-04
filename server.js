const path = require("path");
const fs = require("fs")
const express = require("express");
const encoding = "utf8";

// initializes express
const app = express();

// initializes port
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// path and file join
const savePath = path.resolve(__dirname, "db");
const saveFile = path.join(savePath, "db.json");

// reads file contents
const fileContents = fs.readFileSync(saveFile, err => {
    if (err) throw err;
});

// converts to json
let savedContent = JSON.parse(fileContents);
let id = Math.max(...savedContent.map(note => note.id)) + 1;

// brings you to the index page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

// brings you to the notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

// gets the notes that are saved in the db.json file
app.get("/api/notes", function(req, res) {
    return res.json(savedContent);
});

// gets a certain note saved in the db.json file
app.get("/api/notes/:id", function(req, res) {
    const userChoice = req.params.id;
    console.log(req.params);
    for (let i = 0; i < savedContent.length - 1; i++) {
        if (userChoice == savedContent[i].id) {
            return res.json(savedContent[i]);
        }
    }
    return res.json(false);
});

// posts a note to the body when the user clicks the save button
app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    newNote.id = id;
    id += 1;
    savedContent.push(newNote);
    const savedContentJson = JSON.stringify(savedContent);
    console.log(savedContentJson);
    fs.writeFile(saveFile, savedContentJson, this.encoding, err => {
        if (err) throw err;
    });
    res.json(newNote);
});

// wildcard to route to homepage when requested address isn't valid
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

// server up and running when this function runs
app.listen(PORT, function() {
    console.log(`App listening on PORT: ${ PORT }`);
});