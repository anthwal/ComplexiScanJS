import { readFileSync } from "node:fs";

function removeCommentsAndStrings(code) {
  return code
    .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "") // Remove single-line & multi-line comments
    .replace(/(["'`])(?:(?!\1|\\).|\\.)*\1/g, ""); // Remove string literals
}

function tokenizeJavaScript(code) {
  const tokenRegex =
    /\b(function|if|else|for|while|switch|case|default|try|catch|return|throw|continue|break|const|let|var|class|new|=>)\b|[{}()\[\];,]|[+\-*/=<>!&|?:]+|\w+/g;
  const tokens = [];
  let match;

  while ((match = tokenRegex.exec(code)) !== null) {
    tokens.push({ value: match[0], index: match.index });
  }

  return tokens;
}

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("❌ Usage: node tokenize.js <path-to-js-file>");
    process.exit(1);
  }

  const code = readFileSync(filePath, "utf-8");
  const cleanedCode = removeCommentsAndStrings(code);
  const tokens = tokenizeJavaScript(cleanedCode);

  console.log("\n✅ Tokenized Output:");
  console.log(tokens);
}

main();
