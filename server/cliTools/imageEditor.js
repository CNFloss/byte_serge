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
