import {TokenType} from './TokenType.js';
import Lexer from './Lexer.js';
import Token from './Token.js';
import Op from './Operation.js';

export default function Parser(input)
{
    const lex = Lexer(input);
    const para = [];
    let advs = true;         // Para llevar un control del avance de los tokens a analizar
    let tok = Token();

    return Object.freeze({
        tester,
        expression,
        termino,
        factor,
        par,
        advanceReturn,
        advance
    });

  /*** THE TESTER METHOD
   *
   * This method is used to test all the program
   * just is necessary change the method inside.
   *
   */
    function tester()
    {
        tok = lex.nextToken(); // Por mientras **
        return expression();
    }
    
 /* Métodos de la Clase */
    function expression() //=> Arreglar lo de paréntesis de clausura
    {
      let r1 = undefined;
        do
        {
            if(r1==undefined)
              r1 = termino();
            if (advs)
              advance(false);
            if (tok.getType() == TokenType.SUM || tok.getType() == 6){ //Suma y resta
                const tokTemp = tok;
                advance(false);
                let r2 = factor();
                r1 = Op(tokTemp, r1, r2);
            }
        } while(advs);
        // El primer método debe de llevar esto al final**
        if (tok.getType() != 80 && para.length == 0)
            throw "Error al final de la línea '"+tok.getText()+"' => {"+tok.getType()+"}";
        else
            return r1;
    }

    function termino()
    {
        let r1 = undefined;
        do
        {
            if(r1==undefined)
              r1 = factor();
            if (advs)
                advance(false);
            if (tok.getType() == 2 || tok.getType() == 5){ //Multiplicación y división
                const tokTemp = tok;
                advance(false);
                let r2 = factor();
                r1 = Op(tokTemp, r1, r2)
            }
        } while (advs);
        return r1;
    }

    function factor()
    {
        if (tok.getType() == 10) // Si es ID
          return advanceReturn(1);
        if (constante()) // Si es NUM
          return tok.getText();
        if (tok.getType() == 60 || tok.getType() == 61){ // Si es Seno o Coseno
          let tokTemp = tok;
          advance(true);
          if(tok.getType() == 12){
            let rs = Op(tokTemp, par())
            return rs;
          }else
            throw "Se esperaba PARA, se obtuvo '"+tok.getText()+"' => {"+tok.getType()+"}";
        }
        if (tok.getType() == 12) // Si es un paréntesis
          return par();
        else
          throw "Se esperaba ID || NUM se obtuvo '"+tok.getText()+"' => {"+tok.getType()+"}";
    }

    function constante()
    {
        if (tok.getType() == 550 ||
            tok.getType() == 551 ||
            tok.getType() == 552)
        {
            advanceReturn(1);
            return true;
        }
        else
            return false;
    }

    function par()
    {
        /*
         *  Check Paréntesis 
         */
        para.push(tok);
        advance(false);
        var rs = expression();
        if (tok.getType() == 13) // Deberá tener paréntesis de cierre
        {
            para.pop();
            advance(false);
            if (tok.getType() == 12) //Si encuentra otro paréntesis
            {
                par();
            }
            return rs;
        }
        else
        {
            throw "Se esperaba PARC, se obtuvo '"+tok.getText()+"' => {"+tok.getType()+"}";
        }
    }

    function advanceReturn(i)
    {
        /*
         *  This method is used
         *  in final ways of the code.
         */
        if (i==1)
            advs = true;
        else
            advs = false;
        return tok.getText();
    }
    function advance(adv)
    {
        /*
         *  This method is used
         *  to advance the token.
         */
        tok = lex.nextToken();
        advs = adv;
    }
}
