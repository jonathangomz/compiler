import {TokenType} from './TokenType.js';
import Token from './Token.js';
import Lexer from './Lexer.js';
import Parser from './Parser.js';

export {TokenType, Token, Lexer, Parser, reservedWords};

const reservedWords = {
  'sin': TokenType.SEN
}
