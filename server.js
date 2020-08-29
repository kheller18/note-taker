const path = require("path");
const fs = require("fs")
const encoding = "utf8";
const express = require("express");

const app = express();

var PORT = process.env.PORT || 8080;

const savePath = path.resolve(__dirname, "db");
const saveFile = path.join(savePath, db.json);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function() {
    console.log(`App listening on PORT: ${ PORT }`);
});