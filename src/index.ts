import { Tokenizer } from "./tokenizer";
import { readFileSync, existsSync, statSync } from "fs";
import { isValidSyntax } from "./check-valid-syntax";
import { isValidFile } from "./check-valid-file";

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("❌ Error: No file provided. Please specify a file path.");
    process.exit(1);
  }

  const filePath = args[0];

  // Check if the file exists
  if (!existsSync(filePath)) {
    console.error(`❌ Error: File '${filePath}' not found.`);
    process.exit(1);
  }

  // Check if the file is valid (correct extension)
  if (!isValidFile(filePath)) {
    console.error(
      "❌ Error: Invalid file type. Only JavaScript files are allowed."
    );
    process.exit(1);
  }

  // Check if the file is empty
  if (statSync(filePath).size === 0) {
    console.error("❌ Error: The file is empty.");
    process.exit(1);
  }

  // Read file contents
  const source = readFileSync(filePath, "utf8");

  // Check for syntax errors
  if (!isValidSyntax(source, filePath)) {
    process.exit(1);
  }

  // Tokenize the content
  const tokenizer = new Tokenizer(source);
  const tokens = tokenizer.tokenize();

  console.log(`✅ File: ${filePath}`);
  console.log("🔹 Tokenized Output:", tokens);
}

main();
