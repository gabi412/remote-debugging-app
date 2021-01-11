const logger = require("morgan");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
var multer = require("multer");
const { pathToFileURL } = require("url");

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public"));

var storage = multer.diskStorage({
  destination: 'public/programs-uploaded',
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-"+ file.originalname );
  },
});

var upload = multer({ storage: storage }).single("file");

app.get("/", (req, res) => {
  res.status(200);
  res.end("Hello World!!\n");
});


app.post("/code", (req, res) => {

  const folder = "./public/programs-sent";
  console.log(req.body);
  var codeSent = req.body.codeBody;
  var fileName = req.body.fileName;
  res.status(200);

  fs.writeFile(`${folder}/${fileName}`, codeSent, (err) => {
    if (err) throw err;
  });
});

app.post("/load-file", (req, res) => {
  try {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.file);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
