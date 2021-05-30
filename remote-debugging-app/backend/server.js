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
    origin: "http://192.168.0.111:3000",
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
var filePath = "./public/programs-sent";
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
  var errorCompile;
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
        compileOutput = error.message;
        errorCompile = true;
      } else if (stdout) {
        compileOutput = stdout;
        errorCompile = false;
      } else {
        compileOutput = stderr;
        errorCompile = false;
      }

      res.send({ output: compileOutput, error: errorCompile });

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

        const removeFiles = cp.exec(`rm ${filePath}/${currentFile}`);
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

const Raspi = require("raspi-io").RaspiIO;
const five = require("johnny-five");
const board = new five.Board({
  io: new Raspi(),
  repl: false,
});

var expander1 = new five.Expander({
  controller: "MCP23008",
  address: 0x20,
});
var expander2 = new five.Expander({
  controller: "MCP23008",
  address: 0x21,
});

var expander1Pins = {
  PD4: { pin: 0 },
  PD5: { pin: 1 },
  PD6: { pin: 2 },
  PA1: { pin: 3 },
  PA2: { pin: 4 },
  PA3: { pin: 5 },
  PD3: { pin: 6 },
  PD2: { pin: 7 },
};
var expander2Pins = {
  PD1: { pin: 0 },
  PC7: { pin: 1 },
  PC6: { pin: 2 },
  PC5: { pin: 3 },
  PC4: { pin: 4 },
  PC3: { pin: 5 },
  PB4: { pin: 6 },
  PB5: { pin: 7 },
};
var configIO = {
  PD4: "oPD4",
  PD5: "oPD5",
  PD6: "oPD6",
  PA1: "oPA1",
  PA2: "oPA2",
  PA3: "oPA3",
  PD3: "oPD3",
  PD2: "oPD2",
  PD1: "oPD1",
  PC7: "oPC7",
  PC6: "oPC6",
  PC5: "oPC5",
  PC4: "oPC4",
  PC3: "oPC3",
  PB4: "oPB4",
  PB5: "oPB5",
};
board.on("ready", function () {
  Object.keys(expander1Pins).forEach(function (expander1Key) {
    var pinExpander1 = expander1Pins[expander1Key].pin;
    expander1.digitalRead(pinExpander1, function (value) {
      readValues[expander1Key] = value;
    });
  });
  Object.keys(expander2Pins).forEach(function (expander2Key) {
    var pinExpander2 = expander2Pins[expander2Key].pin;
    expander2.digitalRead(pinExpander2, function (value) {
      readValues[expander2Key] = value;
    });
  });
});

app.post("/config", (req, res) => {
  var values = req.body.values;
  configIO = req.body.configuration;

  configData = JSON.parse(JSON.stringify(configIO));
  writeVal = JSON.parse(JSON.stringify(values));

  Object.keys(configData).forEach(function (stmKey) {
    Object.keys(expander1Pins).forEach(function (expander1Key) {
      var pinExpander1 = expander1Pins[expander1Key].pin;
      var configOption = configData[expander1Key].substr(0, 1);
      if (expander1Key === stmKey) {
        if (configOption === "i") {
          readValues[expander1Key] = " ";
          expander1.pinMode(pinExpander1, expander1.MODES.OUTPUT);
          expander1.digitalWrite(
            pinExpander1,
            parseInt(writeVal[expander1Key].substr(0, 1))
          );
        } else {
          expander1.pinMode(pinExpander1, expander1.MODES.INPUT);
          expander1.pullUp(pinExpander1,expander1.HIGH);
        }
      }
    });
    Object.keys(expander2Pins).forEach(function (expander2Key) {
      var pinExpander2 = expander2Pins[expander2Key].pin;
      var configOption = configData[expander2Key].substr(0, 1);
      if (expander2Key === stmKey) {
        if (configOption === "i") {
          readValues[expander2Key] = " ";
          expander2.pinMode(pinExpander2, expander2.MODES.OUTPUT);
          expander2.digitalWrite(
            pinExpander2,
            parseInt(writeVal[expander2Key].substr(0, 1))
          );
        } else {
          expander2.pinMode(pinExpander2, expander2.MODES.INPUT);
          expander2.pullUp(pinExpander2,expander2.HIGH);
        }
      }
    });
  });

  // console.log(JSON.stringify(readValues));
  res.send(JSON.stringify(readValues));
});

app.get("/get-values", (req, res) => {
  
  Object.keys(configIO).forEach(function (key) {
    if (configIO[key].substr(0, 1) === "i") {
      readValues[key] = "";
    }
  });
  
  res.send(JSON.stringify(readValues));
});

const host = "127.0.0.1";
const port = 8082;
app.listen(port);

console.log(`Server running at ${host}:${port}`);
