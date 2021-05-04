const logger = require("morgan");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
var multer = require("multer");
const cp = require("child_process");
const util = require("util");
const app = express();

var Gpio = require("onoff").Gpio;

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

// global variables to send back to the frontend
var compileOutput;
var filePath = "./public/programs-sent"
var currentFile;
var sourceNameFile;

// storage for file upload
var storage = multer.diskStorage({
  destination: "public/programs-sent",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

app.get("/", (req, res) => {
  res.status(200);
});

var upload = multer({ storage: storage }).single("file");

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

app.post("/code", (req, res) => {

  var codeSent = req.body.codeBody;
  var fileName = req.body.fileName;
  res.status(200);

  fs.writeFile(`${filePath}/${fileName}`, codeSent, (err) => {
    if (err) throw err;
  });

  sourceNameFile = path.parse(fileName).name;

  const result = cp.exec(
    `sdcc -mstm8 ${fileName} --out-fmt-ihx --all-callee-saves --debug --verbose --stack-auto --fverbose-asm --float-reent --no-peep`,
    { cwd: filePath },
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        compileOutput = error.message;
      } else if (stdout) {
        compileOutput = stdout;
      }
      else{
        compileOutput = stderr;
      } 

      res.send(JSON.stringify(compileOutput));

      const removeFiles = cp.exec(
        `find ${filePath} -type f -not -name ${sourceNameFile}.ihx -delete`
      );
    }
  );
  currentFile = sourceNameFile + ".ihx";
});

app.get("/compile-output", (req, res) => {
  res.send({ data: compileOutput });
});

app.post("/flashing", (req, res) => {
  var flashVal = JSON.stringify(req.body.flashValue);
  var flashOutput;
  if (flashVal === "true") {
    const result = cp.exec(
      `./stm8flash -c stlinkv2 -p stm8s103f3 -w ${filePath}/${currentFile}`,
      (error, stdout, stderr) => {
        if (stderr) {
          flashOutput = stderr;
        } else if (error) {
          flashOutput = error.message;
        } else {
          flashOutput = stdout;
        }
        res.send(JSON.stringify(flashOutput));

        const removeFiles = cp.exec(
          `rm ${filePath}/${currentFile}`
        );
      }
    );
  }
});

var readValues = {
  PD4: "",
  PD5: "",
  PD6: "",
  PA1: "",
  PA2: "",
  PA3: "",
  PD3: "",
  PD2: "",
  PD1: "",
  PC7: "",
  PC6: "",
  PC5: "",
  PC4: "",
  PC3: "",
  PB4: "",
  PB5: "",
};
var pin4 = new Gpio(4, "in");
var pin17 = new Gpio(17, "in");
var pin27 = new Gpio(27, "in");
var pin22 = new Gpio(22, "in");
var pin0 = new Gpio(0, "in");
var pin5 = new Gpio(5, "in");

app.post("/config", (req, res) => {
  Object.keys(readValues).forEach(function (key) {
    //   console.log("Key : " + kkey + ", Value : " + readValues[kkey]);
    readValues[key] = "";
  });
  var values = req.body.values;
  var configIO = req.body.configuration;

  configData = JSON.parse(JSON.stringify(configIO));
  //  console.log(configData);
  writeVal = JSON.parse(JSON.stringify(values));
  console.log(writeVal);

  Object.keys(configData).forEach(function (key) {
    var configOption = configData[key].substr(0, 1);

    if (key == "PD4") {
      if (configOption == "i") {
        pin4.setDirection("out");
        pin4.writeSync(parseInt(writeVal["PD4"].substr(0, 1)));
      } else {
        pin4.setDirection("in");
      }
    }
    if (key == "PD5") {
      if (configOption == "i") {
        pin17.setDirection("out");
        pin17.writeSync(parseInt(writeVal["PD5"].substr(0, 1)));
      } else {
        pin17.setDirection("in");
      }
    }

    if (key == "PD6") {
      if (configOption == "i") {
        pin27.setDirection("out");
        pin27.writeSync(parseInt(writeVal["PD6"].substr(0, 1)));
      } else {
        pin27.setDirection("in");
      }
    }
    if (key == "PA1") {
      if (configOption == "i") {
        pin22.setDirection("out");
        pin22.writeSync(parseInt(writeVal["PA1"].substr(0, 1)));
      } else {
        pin22.setDirection("in");
      }
    }
    if (key == "PA2") {
      if (configOption == "i") {
        pin0.setDirection("out");
        pin0.writeSync(parseInt(writeVal["PA2"].substr(0, 1)));
      } else {
        pin0.setDirection("in");
      }
    }
    if (key == "PA3") {
      if (configOption == "i") {
        pin5.setDirection("out");
        pin5.writeSync(parseInt(writeVal["PA3"].substr(0, 1)));
      } else {
        pin5.setDirection("in");
      }
    }
  });
  console.log(JSON.stringify(readValues));
  res.send(JSON.stringify(readValues));
});

app.get("/get-values", (req, res) => {
  // verific starea pinilor si daca sunt intrare citesc valoarea pe care o pun in obiectul json
  if (pin4.direction() === "in") {
    readValues["PD4"] = pin4.readSync();
  }
  if (pin17.direction() === "in") {
    readValues["PD5"] = pin17.readSync();
  }
  if (pin27.direction() === "in") {
    readValues["PD6"] = pin27.readSync();
  }
  if (pin22.direction() === "in") {
    readValues["PA1"] = pin22.readSync();
  }
  if (pin0.direction() === "in") {
    readValues["PA2"] = pin0.readSync();
  }
  if (pin5.direction() === "in") {
    readValues["PA3"] = pin5.readSync();
  }
  res.send(JSON.stringify(readValues));
});

const host = "127.0.0.1";
const port = 8082;
app.listen(port);

console.log(`Server running at ${host}:${port}`);
