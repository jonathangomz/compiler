import {TokenType} from './TokenType.js';
import Token from './Token.js';

export default function Add(op, r1, r2){
    const var1 = r1;
    const var2 = r2;
    /*if( var1.includes(".") && var2.includes(".") ){*/ // Creo que no se necesita (AUN)
    if(op.getType() == 3) // SUMA
        return parseFloat(var1) + parseFloat(var2);
    else if(op.getType() == 6) // RESTA
        return parseFloat(var1) - parseFloat(var2);
    /*}*/

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