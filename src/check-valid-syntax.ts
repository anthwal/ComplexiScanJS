import * as vm from "vm";

export function isValidSyntax(source: string, filePath: string): boolean {
  try {
    new vm.Script(source, { filename: filePath });
    return true;
  } catch (err: unknown) {
    console.error(`❌ Syntax Error in '${filePath}':\n${err}`);
    return false;
  }
}
