const logger = require("morgan");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path');
var multer = require("multer");
const cp = require('child_process');

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
  destination: "public/programs-uploaded",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");
var compileData;

app.get("/", (req, res) => {
  res.status(200);
  
});

app.post("/code", (req, res) => {
  const folder = "./public/programs-sent";
  const compileScript = "./public/script.sh"

  var codeSent = req.body.codeBody;
  var fileName = req.body.fileName;
  res.status(200);

  fs.writeFile(`${folder}/${fileName}`, codeSent, (err) => {
    if (err) throw err;
});

  //const command = `sdcc -mstm8 ${folder}/${fileName} --out-fmt-ihx --all-callee-saves --debug --verbose --stack-auto --fverbose-asm  --float-reent --no-peep`;
  console.log(`${folder}/${fileName}`);

  var compileOutputFile = path.parse(fileName).name + "-output.txt";
  const result = cp.execFile(compileScript,[`${folder}/${fileName}`],function(err){

  fs.readFile(`${folder}/${compileOutputFile}`, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    compileData=data;
    res.send({data:compileData});
  }); 
  });
    console.log("\nIn post: "+compileData)


});

app.get("/compile-output",(req,res)=>{
  console.log("\nIn get: "+compileData);
  res.send({data:compileData})
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

const host = 'localhost';
const port = 8081;
app.listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
