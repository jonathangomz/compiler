import Token from '../Token.js';
import {TokenType} from '../TokenType.js';
export default function Sin(s1){
  var t1 = s1;
  const rs = Math.sin(parseFloat(t1))

  if( rs%2 === 0){
    return Token(TokenType.INT_CONST, Math.cos(parseFloat(t1)));
  }else{
    return Token(TokenType.FLOAT_CONST, Math.cos(parseFloat(t1)));
  }
}
