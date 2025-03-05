export function isValidSyntax(source: string, filePath: string): boolean {
  try {
    new Function(source);
    return true;
  } catch (err: unknown) {
    console.error(`❌ Syntax Error in '${filePath}':\n${err}`);
    return false;
  }
}
