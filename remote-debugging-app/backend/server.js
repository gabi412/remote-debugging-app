const logger = require("morgan");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
var multer = require("multer");
const cp = require("child_process");
const app = express();


app.use(bodyParser.json());
app.use(
  cors({
    //  origin: "http://localhost:3000",
    origin: "http://192.168.0.197:3000",
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

var pinsDetected = {};

// storage for file upload
var storage = multer.diskStorage({
  destination: "public/programs-sent",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage }).single("file");

app.get("/", (req, res) => {
  res.status(200);
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

app.post("/code", (req, res) => {
  var codeSent = req.body.codeBody;
  var fileName = req.body.fileName;
  var errorCompile;
  pinsDetected = {};

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

        //parse code body to detect pins used and set the variable that contains pins states
        code = codeSent.replace(/\s/g, "").toUpperCase();
        var ports = ["A", "B", "C", "D"];
        for (let i = 0; i < ports.length; i++) {
          for (let j = 1; j < 8; j++) {
            if (
              code.includes(`P${ports[i]}_DDR|=1<<${j}`) ||
              code.includes(`P${ports[i]}_DDR|=(1<<${j})`)
            ) {
              pinsDetected[`P${ports[i]}${j}`] = `oP${ports[i]}${j}`;
            }

            if (
              code.includes(`P${ports[i]}_DDR&=~(1<<${j})`) ||
              code.includes(`P${ports[i]}_IDR>>${j}`)
            ) {
              pinsDetected[`P${ports[i]}${j}`] = `iP${ports[i]}${j}`;
            }
          }
        }
      } else {
        compileOutput = stderr;
        errorCompile = false;
      }
      res.status(200).send({ output: compileOutput, error: errorCompile });
      const removeFiles = cp.exec(
        `find ${filePath} -type f -not -name ${sourceNameFile}.ihx -delete`
      );
    }
  );
  currentFile = sourceNameFile + ".ihx";
});

app.get("/pins-detected", (req, res) => {
  res.status(200).send({ pinsDetected: pinsDetected });
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
        res.status(200).send(JSON.stringify(flashOutput));
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
  io: new Raspi({ enableSerial: false }),
  repl: false,
  debug: false,
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
  PB4: { pin: 0 },
  PB5: { pin: 1 },
  PA3: { pin: 2 },
  PA2: { pin: 3 },
  PA1: { pin: 4 },
  PD6: { pin: 5 },
  PD5: { pin: 6 },
  PD4: { pin: 7 },
};
var expander2Pins = {
  PD3: { pin: 0 },
  PD2: { pin: 1 },
  PD1: { pin: 2 },
  PC7: { pin: 3 },
  PC6: { pin: 4 },
  PC5: { pin: 5 },
  PC4: { pin: 6 },
  PC3: { pin: 7 },
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
    expander1.pinMode(pinExpander1, expander1.MODES.INPUT);
    expander1.pullUp(pinExpander1, expander1.HIGH);
    expander1.digitalRead(pinExpander1, function (value) {
      readValues[expander1Key] = value;
    });
  });
  Object.keys(expander2Pins).forEach(function (expander2Key) {
    var pinExpander2 = expander2Pins[expander2Key].pin;
    expander2.pinMode(pinExpander2, expander2.MODES.INPUT);
    expander2.pullUp(pinExpander2, expander2.HIGH);
    expander2.digitalRead(pinExpander2, function (value) {
      readValues[expander2Key] = value;
    });
  });
});

app.post("/config", (req, res) => {
  var config = req.body.pins;
  for (let i = 0; i < config.length; i++) {
    var pin = config[i].pinName;
    configIO[pin] = config[i].writeVal;
  }

  for (let i = 0; i < config.length; i++) {
    configOption = config[i].state.substr(0, 1);
    stmKey = config[i].pinName;
    selected = config[i].selected;
    writeVal = parseInt(config[i].writeVal.substr(0, 1));
    Object.keys(expander1Pins).forEach(function (expander1Key) {
      var pinExpander1 = expander1Pins[expander1Key].pin;
      //    var configOption = configData[expander1Key].substr(0, 1);
      if (expander1Key === stmKey) {
        if (selected === true) {
          console.log(stmKey);
          console.log(configOption);
          console.log(writeVal);
          if (configOption === "i") {
            readValues[expander1Key] = " ";
            expander1.pinMode(pinExpander1, expander1.MODES.OUTPUT);
            expander1.digitalWrite(pinExpander1, parseInt(writeVal));
          } else {
            expander1.pinMode(pinExpander1, expander1.MODES.INPUT);
            expander1.pullUp(pinExpander1, expander1.HIGH);
          }
        }
      }
    });

    Object.keys(expander2Pins).forEach(function (expander2Key) {
      var pinExpander2 = expander2Pins[expander2Key].pin;
      if (expander2Key === stmKey) {
        if (selected === true) {
          console.log(stmKey);
          console.log(configOption);
          console.log(writeVal);
          if (configOption === "i") {
            readValues[expander2Key] = " ";
            expander2.pinMode(pinExpander2, expander2.MODES.OUTPUT);
            expander2.digitalWrite(pinExpander2, parseInt(writeVal));
          } else {
            expander2.pinMode(pinExpander2, expander2.MODES.INPUT);
            expander2.pullUp(pinExpander2, expander2.HIGH);
          }
        }
      }
    });
  }

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

const port = 8082;
var server = app.listen(port);

console.log(`Server running at ${host}:${port}`);
