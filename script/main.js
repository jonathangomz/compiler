import {TokenType} from './TokenType.js';
import Token from './Token.js';
import Lexer from './Lexer.js';
import Parser from './Parser.js';

const reservedWords = {
  'sin': TokenType.SEN
}

export {TokenType, Token, Lexer, Parser, reservedWords};
