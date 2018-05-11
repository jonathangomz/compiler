import Token from '../Token.js';
import {TokenType} from '../TokenType.js';
export default function Add(r1, r2){
    const var1 = r1;
    const var2 = r2;
    const rs = (parseFloat(var1) + parseFloat(var2));
    console.log("var1: "+var1+" var2: "+var2+" => "+rs);
    if( rs%2 === 0){
      return Token(TokenType.INT_CONST, rs);
    }else{
      return Token(TokenType.FLOAT_CONST, rs);
    }

    /*** Falta comprender ***
     *  else if( t1== SymbolType.VECTOR && t2 == SymbolType.VECTOR ){
     *       if(op== TokenType.SUM)
     *           return	new Symbol("", SymbolType.VECTOR, (Vector3) s1.Value +   ((Vector3)s2.Value));
     *       else
     *           return	new Symbol("", SymbolType.VECTOR, (Vector3) s1.Value -   ((Vector3)s2.Value));
     *   }
     */

    /*** No permitido  *** Comentado por el profesor ***
     *  Vector3 v= new Vector3(1,2,3);
     *  v= v+1;
     */
    return null;
}
