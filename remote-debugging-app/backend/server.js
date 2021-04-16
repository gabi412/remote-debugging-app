const logger = require("morgan");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
var multer = require("multer");
const cp = require("child_process");

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

// storage for file upload
var storage = multer.diskStorage({
  destination: "public/programs-sent",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

// global variables to send back to the frontend
var compileData;
var currentFile;

app.get("/", (req, res) => {
  res.status(200);
});

app.post("/code", (req, res) => {
  const folder = "./public/programs-sent";
  const compileScript = "./public/script.sh";

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
  const result = cp.execFile(
    compileScript,
    [`${folder}/${fileName}`],
    function (err) {
      fs.readFile(
        `${folder}/${compileOutputFile}`,
        "utf8",
        function (err, data) {
          if (err) {
            return console.log(err);
          }
          compileData = data;
          res.send({ data: compileData });
        }
      );
      const move = cp.exec(
        `mv ~/backend/${sourceNameFile}.* ~/backend/public/programs-sent`
      );
    }
  );
  currentFile = path.parse(fileName).name + ".ihx";
  // const move = cp.exec(`mv ~/backend/${sourceNameFile}.* ~/backend/public/programs-sent` );
  // console.log("\nIn post: " + compileData);
  // console.log("\nNumele ihx:" + currentFile);
});

app.get("/compile-output", (req, res) => {
  console.log("\nIn get: " + compileData);
  res.send({ data: compileData });
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
app.post("/flashing", (req, res) => {
  console.log("\nFlashing: " + JSON.stringify(req.body.flashValue));
  var flashVal = JSON.stringify(req.body.flashValue);
  var compilePath = "./public/programs-sent";
  if (flashVal === "true") {
    cp.exec(
      `./stm8flash -c stlinkv2 -p stm8s103f3 -w ${compilePath}/${currentFile}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error:${error.message}`);
        }
      }
    );
  }
});
var readValues = {};
app.post("/config", (req, res) => {
    var values = req.body.values;
    var configIO = req.body.configuration;

  configData = JSON.parse(JSON.stringify(configIO));
  console.log(configData);
  writeVal = JSON.parse(JSON.stringify(values));
  console.log(writeVal);

  Object.keys(configData).forEach(function (key) {
    //  console.log("Key : " + key + ", Value : " + configData[key]);

    var configOption = configData[key].substr(0, 1);

    if (key == "PD4") {
      var pin4 = new Gpio(4, "in");
      if (configOption == "i") {
        pin4.setDirection("out");
        pin4.writeSync(parseInt(writeVal["PD4"].substr(0, 1)));
      } else {
        pin4.setDirection("in");
        readValues["PD4"] = pin4.readSync();
      }
    }
    if (key == "PD5") {
      var pin17 = new Gpio(17, "in");
      if (configOption == "i") {
        pin17.setDirection("out");
        pin17.writeSync(parseInt(writeVal["PD5"].substr(0, 1)));
      } else {
        pin17.setDirection("in");
        readValues["PD5"] = pin17.readSync();
      }
    }

    if (key == "PD6") {
      if (configOption == "i") {
        var pin27 = new Gpio(27, "out");
        pin27.writeSync(parseInt(writeVal["PD6"].substr(0, 1)));
      } else {
        var pin27 = new Gpio(27, "in");
      }
    }
    if (key == "PA1") {
      if (configOption == "i") {
        var pin22 = new Gpio(22, "out");
        pin22.writeSync(parseInt(writeVal["PA1"].substr(0, 1)));
      } else {
        var pin22 = new Gpio(22, "in");
      }
      var val = pin22.readSync();
      console.log("pin22 val " + val);
    }
    if (key == "PA2") {
      if (configOption == "i") {
        var pin0 = new Gpio(0, "out");
        pin0.writeSync(writeVal["PA2"]);
      } else {
        var pin0 = new Gpio(0, "in");
      }
    }
    if (key == "PA3") {
      if (configOption == "i") {
        var pin5 = new Gpio(5, "out");
        pin5.writeSync(writeVal["PA3"]);
      } else {
        var pin5 = new Gpio(5, "in");
      }
    }
  });
  console.log(JSON.stringify(readValues));
});

app.get("/get-values", (req, res) => {
  console.log("\nIn get-values: " + readValues);
  res.send({ readVal: JSON.stringify(readValues) });
});

const host = "127.0.0.1";
const port = 8082;
app.listen(port);

console.log(`Server running at ${host}:${port}`);
