export enum TokenType {
    Function = 'Function',
    Identifier = 'Identifier',
    LeftParen = 'LeftParen',
    RightParen = 'RightParen',
    LeftBrace = 'LeftBrace',
    RightBrace = 'RightBrace',
    If = 'If',
    Else = 'Else',
    While = 'While',
    For = 'For',
    Do = 'Do',
    Switch = 'Switch',
    Case = 'Case',
    Try = 'Try',
    Catch = 'Catch',
    LogicalAnd = 'LogicalAnd',
    LogicalOr = 'LogicalOr',
    Arrow = 'Arrow',
    EOF = 'EOF'
  }
  
  export interface Token {
    type: TokenType;
    value: string;
    position: number;
    line: number; 
  }
  
  export class Tokenizer {
    private source: string;
    private position: number = 0;
    private line: number = 1; 
  
    constructor(source: string) {
      this.source = this.removeComments(source);
    }
  
    private removeComments(source: string): string {
      return source
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/\/\/.*/g, '');          // Remove single-line comments
    }
  
    tokenize(): Token[] {
      const tokens: Token[] = [];
      while (this.position < this.source.length) {
        const char = this.source[this.position];
  
        if (this.isWhitespace(char)) {
          if (char === '\n') this.line++; // Update line number on new line
          this.position++;
          continue;
        }
  
        if (this.isAlphabet(char)) {
          tokens.push(this.readIdentifier());
          continue;
        }
  
        if (char === '(') tokens.push(this.createToken(TokenType.LeftParen));
        else if (char === ')') tokens.push(this.createToken(TokenType.RightParen));
        else if (char === '{') tokens.push(this.createToken(TokenType.LeftBrace));
        else if (char === '}') tokens.push(this.createToken(TokenType.RightBrace));
        else if (char === '&' && this.lookForNextCharacter() === '&') {
          tokens.push(this.createToken(TokenType.LogicalAnd));
          this.position++;
        }
        else if (char === '|' && this.lookForNextCharacter() === '|') {
          tokens.push(this.createToken(TokenType.LogicalOr));
          this.position++;
        }
        else if (char === '=' && this.lookForNextCharacter() === '>') {
          tokens.push(this.createToken(TokenType.Arrow));
          this.position++;
        }
  
        this.position++;
      }
  
      tokens.push({ type: TokenType.EOF, value: '<<EOF>>', position: this.position, line: this.line });
      return tokens;
    }
  
    private readIdentifier(): Token {
      const start = this.position;
      while (
        this.position < this.source.length &&
        (this.isAlphabet(this.source[this.position]) || this.isDigit(this.source[this.position]))
      ) {
        this.position++;
      }
      const value = this.source.slice(start, this.position);
      return this.createTokenFromIdentifier(value, start);
    }
  
    private createTokenFromIdentifier(value: string, position: number): Token {
      const keywords: { [key: string]: TokenType } = {
        'function': TokenType.Function,
        'if': TokenType.If,
        'else': TokenType.Else,
        'while': TokenType.While,
        'for': TokenType.For,
        'do': TokenType.Do,
        'switch': TokenType.Switch,
        'case': TokenType.Case,
        'try': TokenType.Try,
        'catch': TokenType.Catch
      };
  
      return {
        type: keywords[value] || TokenType.Identifier,
        value,
        position,
        line: this.line
      };
    }
  
    private createToken(type: TokenType): Token {
      return { type, value: this.source[this.position], position: this.position, line: this.line };
    }
  
    private lookForNextCharacter(): string {
      return this.position + 1 < this.source.length ? this.source[this.position + 1] : '';
    }
  
    private isWhitespace(char: string): boolean {
      return /\s/.test(char);
    }
  
    private isAlphabet(char: string): boolean {
      return /[a-zA-Z_$]/.test(char);
    }
  
    private isDigit(char: string): boolean {
      return /[0-9]/.test(char);
    }
  }
  