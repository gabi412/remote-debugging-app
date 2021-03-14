const logger = require("morgan");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path');
var multer = require("multer");
const cp = require('child_process');
const spawn = require('child_process');

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
  destination: "public/programs-sent",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");
var compileData;
var currentFile;

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
  var sourceNameFile = path.parse(fileName).name;
  const result = cp.execFile(compileScript,[`${folder}/${fileName}`],function(err){

  fs.readFile(`${folder}/${compileOutputFile}`, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    compileData=data;
    res.send({data:compileData});
  }); 
    const move = cp.exec(`mv ~/backend/${sourceNameFile}.* ~/backend/public/programs-sent`);	  
  });
    currentFile = path.parse(fileName).name+".ihx";
 //   const move = cp.exec(`mv ~/backend/${sourceNameFile}.* ~/backend/public/programs-sent` );
    console.log("\nIn post: "+compileData)
    console.log("\nNumele ihx:"+currentFile);


});

app.get("/compile-output",(req,res)=>{
  console.log("\nIn get: "+compileData);
  res.send({data:compileData})
});

app.post("/load-file", (req, res) => {
  try {
    upload(req, res, function (err) {
      currentFile = req.file.filename;
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
app.post("/flashing",(req,res)=>{
//	console.log("\nFlashing: "(req.body.flashValue));
	var flashVal = JSON.stringify(req.body.flashValue);
	var compilePath = "./public/programs-sent";
	if(flashVal === "true")
	{
            cp.exec(`./stm8flash -c stlinkv2 -p stm8s103f3 -w ${compilePath}/${currentFile}`,
		    (error,stdout,stderr)=>{
			    if(error){
				    console.log(`error:${error.message}`)
			    };
	    });
	
	}
});

const host = 'l27.0.0.1';
const port = 8082;
app.listen(port);

console.log(`Server running at ${host}:${port}`);
