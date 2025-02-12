import * as vm from "vm";

export function isValidSyntax(source: string, filePath: string): boolean {
  try {
    new vm.Script(source, { filename: filePath });
    return true;
  } catch (err: Error) {
    console.error(`❌ Syntax Error in '${filePath}':\n${err.message}`);
    return false;
  }
}
