// src/analyzer.ts
import { readFileSync } from "fs";
import { Tokenizer, TokenType, Token } from "./tokenizer";

interface FunctionAnalysis {
  name: string;
  complexity: number;
  threshold: number;
}

export function analyze(
  filePath: string,
  threshold: number
): FunctionAnalysis[] {
  const source = readFileSync(filePath, "utf8");
  const tokenizer = new Tokenizer(source);
  const tokens = tokenizer.tokenize();
  return analyzeFunctions(tokens, threshold);
}

function analyzeFunctions(
  tokens: Token[],
  threshold: number
): FunctionAnalysis[] {
  const functions: FunctionAnalysis[] = [];
  let currentFunction: FunctionAnalysis | null = null;
  let braceStack = 0;
  let currentNestingLevel = 0;
  const nestingStack: number[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === TokenType.Function || token.type === TokenType.Arrow) {
      const name = getFunctionName(tokens, i);
      currentFunction = { name, complexity: 0, threshold };
      functions.push(currentFunction);
    }

    if (token.type === TokenType.LeftBrace) {
      braceStack++;
    } else if (token.type === TokenType.RightBrace) {
      braceStack--;
      if (braceStack === 0) {
        currentFunction = null;
        currentNestingLevel = 0;
        nestingStack.length = 0;
      } else if (nestingStack.length > 0) {
        currentNestingLevel = nestingStack.pop()!;
      }
    }

    if (currentFunction) {
      const complexityIncrement = calculateTokenComplexity(token);
      if (complexityIncrement > 0) {
        if (
          token.type === TokenType.LogicalAnd ||
          token.type === TokenType.LogicalOr ||
          token.type === TokenType.Else ||
          token.type === TokenType.ElseIf
        ) {
          currentFunction.complexity += 1;
        } else {
          currentFunction.complexity += 1 + currentNestingLevel;
          if (isNestingToken(token)) {
            nestingStack.push(currentNestingLevel);
            currentNestingLevel += 1;
          }
        }
      }
    }
  }

  return functions;
}
function calculateTokenComplexity(token: Token): number {
  switch (token.type) {
    case TokenType.If:
    case TokenType.While:
    case TokenType.For:
    case TokenType.Do:
    case TokenType.Case:
    case TokenType.Catch:
    case TokenType.LogicalAnd:
    case TokenType.LogicalOr:
    case TokenType.Else:
    case TokenType.ElseIf:
      return 1;
    default:
      return 0;
  }
}

function isNestingToken(token: Token): boolean {
  return [
    TokenType.If,
    TokenType.While,
    TokenType.For,
    TokenType.Do,
    TokenType.Case,
  ].includes(token.type);
}

function getFunctionName(tokens: Token[], index: number): string {
  for (let i = index + 1; i < tokens.length; i++) {
    if (tokens[i].type === TokenType.Identifier) {
      return tokens[i].value;
    }
  }
  return "<anonymous>";
}
