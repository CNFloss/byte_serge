const fs = require("fs");
const { program } = require("commander");
const readline = require("readline");
const { createCanvas, loadImage } = require("canvas");

function findFilesInFolder(folderPath, pattern) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const matchedFiles = files.filter((file) => pattern.test(file));
      resolve(matchedFiles);
    });
  });
}

function createTileSheetData(
  totalTiles,
  cellWidth,
  cellHeight,
  columns,
  rows,
  filename
) {
  let tilesheetData = {};

  for (let i = 0; i < totalTiles; i++) {
    let x = (i % columns) * cellWidth;
    let y = Math.floor(i / columns) * cellHeight;
    tilesheetData[i] = { cell: { x: x, y: y } };
  }

  const dataStr = JSON.stringify(tilesheetData, null, 2);
  const fs = require("fs");
  fs.writeFileSync(`${filename}TileData.json`, dataStr);
}

function loadImages(fileNames) {
  return Promise.all(
    fileNames.map((fileName) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = fileName;
      });
    })
  );
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Command functions
const commands = {
  help: (options) => {
    console.log("Help Command");
    console.log("List Commands");
    for (let key in commands) {
      console.log(" - ", key);
    }
    if (options.verbose) {
      console.log("Verbose Help Description");
    }
  },
  close: () => {
    console.log("Close Command");
    rl.close();
  },
  createTileSheetDataFile: (options) => {
    const totalTiles = options.args[0];
    const cellWidth = options.args[1];
    const cellHeight = options.args[2];
    const columns = options.args[3];
    const rows = options.args[4];
    const filename = options.args[5];
    createTileSheetData(
      totalTiles,
      cellWidth,
      cellHeight,
      columns,
      rows,
      filename
    );
    console.log("Success, your JSON File has been created.");
  },
  findAndCombinePNGsByPatternInFolder: (options) => {
    const directory = options.args[0];
    const regexStr = new RegExp(options.args[1]);
    findFilesInFolder(directory, regexStr).then((files) => {
      const canvas = createCanvas(2560, Math.ceil(files.length / 10) * 256);
      const ctx = canvas.getContext("2d");
      console.log(
        ` - Searching '${directory}'...\n\t- For PNG files matching '${regexStr}'...`
      );
      files.forEach((file, i) => {
        loadImage(directory + "/" + file).then((image) => {
          //console.log((i % 10) * 256, Math.floor(i / 10) * 256);
          ctx.drawImage(
            image,
            (i % 10) * 256,
            Math.floor(i / 10) * 256,
            image.width,
            image.height
          );
        });
      });
      //console.log('<img src="' + canvas.toDataURL() + '" />');
      const out = fs.createWriteStream("./assets/img/test.png");
      const stream = canvas.createPNGStream();
      stream.pipe(out);
      out.on("finish", () => console.log("Success the PNG file was created."));
    });
  },
};

program.option("-v, --verbose", "Enable verbose output");

program.parse(process.argv);

rl.setPrompt("GWiz_> ");
rl.prompt();

rl.on("line", (line) => {
  const [command, ...args] = line.trim().split(" ");
  if (commands[command]) {
    commands[command]({ args, verbose: program.opts().verbose });
  } else {
    console.log(`Unknown command: ${command}`);
  }
  rl.prompt();
}).on("close", () => {
  console.log("CLI tool exited");
  process.exit(0);
});
