import { ALLOWED_EXTENSIONS } from "./constants";
import { extname } from "path";

export function isValidFile(filePath: string): boolean {
  return ALLOWED_EXTENSIONS.includes(extname(filePath));
}
