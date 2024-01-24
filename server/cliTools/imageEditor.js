const { program } = require("commander");
const readline = require("readline");

// Command functions
const commands = {
  help: (options) => {
    console.log("Help Command");
    if (options.verbose) {
      console.log("Verbose Help Description");
    }
  },
  // Add other commands here
};

program.option("-v, --verbose", "Enable verbose output");

program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("Your-CLI> ");
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
