import Token from './Token.js';
import {TokenType} from './TokenType.js';
import {reservedWords} from './main.js';

const letter = /[a-z]/i;
const digit = /[0-9]/;
const letterORdigit = /[a-zA-Z0-9]/;
const simbol = /[+, *,\/,\-, (, ), [,\],{,}, %, ^, !, =, \|, >, <, ;]/;

export default function Lexer(foobar) {

    let input = foobar;
    let index = 0;
    let edo = 0;
    let text = "";
    let tokenType = TokenType.TOKEN_NONE;

    return Object.freeze({
        changeInput,
        nextToken,
        listOfTokens,
        reboot
    });

    function changeInput(input){
        input = input;
    }

    function reboot(){
        index = 0;
        edo = 0;
        text = "";
        tokenType = TokenType.TOKEN_NONE;
    }

    function listOfTokens(){
        let listTokens = [];
        let tok = nextToken();
        while(tok.getType() != TokenType.EOL){
            listTokens.push(tok);
            tok = nextToken();
        }
        reboot();
        return listTokens;
    }

    function nextToken(){
        for (let i = index; i < input.length; i++){
            let c = input.charAt(i);

            while ((c == ' ' || c == '\t') && edo == 0)
            {
                i++;
                c = input.charAt(i);
            }
            if (i >= input.length)
            {
                return Token(text, tokenType);
            }
            // **SUMA**
            if (edo == 0 && c == '+')
                return Token(TokenType.SUM, input.substring(index, ++index));
            // **RESTA**
            if (edo == 0 && c == '-')
                return Token(TokenType.RES, input.substring(index, ++index));
            // **DIVISIÓN**
            if (edo == 0 && c == '/')
                return Token(TokenType.DIV, input.substring(index, ++index));
            // **MULTIPLICACIÓN**
            if (edo == 0 && c == '*')
                return Token(TokenType.MUL, input.substring(index, ++index));
            // **MÓDULO**
            if(edo == 0 &&  c == '%')
                return Token(TokenType.MOD, input.substring(index, ++index));
            // **POTENCIA**
            if(edo == 0 && c == '^')
                return Token(TokenType.POT, input.substring(index, ++index));
            // **PUNTO Y COMA
            if (edo == 0 && c == ';')
                return Token(TokenType.SEMICOLON, input.substring(index, ++index));
            // **IGUAL O ASIGNACIÓN**
            if(edo == 0 && c == '=')
            {
                edo = 1;
                continue;
            }
            // *ASIGNACIÓN
            if(edo == 1 && c != '=')
            {
                edo = 0;
                text = input.substring(index, i - index).trim();
                index = i;
                tokenType = TokenType.ASIGNA;
                return Token(tokenType, text);
            }
            // *IGUAL
            if (edo == 1 && c == '=')
            {
                edo = 0;
                return Token(TokenType.EQUAL, input.substring(index, ++index));
            }
            // **MENOR, MAYOR O DIFERENTE**
            if (edo == 0 && (c == '<' || c == '>' || c == '!'))
            {
                if(c == '<')
                    edo = 2.1;
                if (c == '>')
                    edo = 2.2;
                if (c == '!')
                    edo = 2.3;
                continue;
            }
            // *MENOR
            if (edo == 2.1 && c != '=')
            {
                edo = 0;
                return Token(TokenType.LESS, input.substring(index-1, ++index - i));
            }
            // *MENOR O IGUAL
            if (edo == 2.1 && c == '=')
            {
                i++;
                edo = 0;
                text = input.substring(index, i - index).trim();
                index = i;
                tokenType = TokenType.LESS_EQUAL;
                return Token(tokenType, text);
            }
            // *MAYOR
            if (edo == 2.2 && c != '=')
            {
                edo = 0;
                return Token(TokenType.GREATER, input.substring(index, ++index));
            }
            // MAYOR O IGUAL
            if (edo == 2.2 && c == '=')
            {
                i++;
                edo = 0;
                text = input.substring(index, i - index).trim();
                index = i;
                tokenType = TokenType.GREATER_EQUAL;
                return Token(tokenType, text);
            }
            // *NEGACIÓN
            if (edo == 2.3 && c != '=')
            {
                edo = 0;
                return Token(TokenType.NOT, input.substring(index, ++index));
            }
            // *DIFERENTE
            if (edo == 2.3 && c == '=')
            {
                i++;
                edo = 0;
                text = input.substring(index, i - index).trim();
                index = i;
                tokenType = TokenType.NOT_EQUAL;
                return Token(tokenType, text);
            }
            // **PARÉNTESIS DE APERTURA**
            if (edo == 0 && c == '(')
                return Token(TokenType.PARA, input.substring(index, ++index));
            // **PARÉNTESIS DE CIERRE**
            if (edo == 0 && c == ')')
                return Token(TokenType.PARC, input.substring(index, ++index));
            // **LLAVE DE APERTURA**
            if(edo == 0 && c == '{')
                return Token(TokenType.LLAVEA, input.substring(index, ++index));
            // **LLAVE DE CIERRE
            if (edo == 0 && c == '}')
                return Token(TokenType.LLAVEC, input.substring(index, ++index));
            // **CORCHETE DE APERTURA**
            if (edo == 0 && c == '[')
                return Token(TokenType.CORCHETEA, input.substring(index, ++index));
            // **CORCHETE DE CIERRE
            if (edo == 0 && c == ']')
                return Token(TokenType.CORCHETEC, input.substring(index, ++index));
            // **COMA**
            if (edo == 0 && c == ',')
                return Token(TokenType.COMA, input.substring(index, ++index));
            // **STRING**
            if((edo == 0 && c == '"') || (edo == 10 && c != '"'))
            {
                edo = 10;
                continue;
            }
            if(edo == 10 && c == '"')
            {
                i++;
                edo = 0;
                text = input.substring(index, i - index).trim();
                index = i;
                return Token(TokenType.CHAR_CONST, text);
            }
            // **ID**
            // Si es un ID y está al final de la línea
            if (((edo == 0 && letter.test(c)) || (edo == 3 && letterORdigit.test(c))) && i + 1 >= input.length)
            {
                i++;
                edo = 0;
                text = input.substring(index, i).trim();
                index = i;
                if (text in reservedWords)
                    tokenType = reservedWords[text];
                else
                    tokenType = TokenType.ID;
                return Token(tokenType, text);
            }
            // Si comienza un ID o continua sigue al siguiente caracter
            if ((edo == 0 && letter.test(c)) || (edo == 3 && (letterORdigit.test(c) || c == '_')))
            {
                edo = 3;
                continue;
            }
            //Si el siguiente caracter es otro simbolo regresa el texto del ID
            if (edo == 3 && simbol.test(c))
            {
                edo = 0;
                text = input.substring(index, i).trim();
                index = i;
                if (text in reservedWords)
                    tokenType = reservedWords[text];
                else
                    tokenType = TokenType.ID;
                return Token(tokenType, text);
            }
            // **NUM**
            // Si es un NUM y está al final de la línea
            if (((edo == 0 && digit.test(c)) || (edo == 5 && digit.test(c))) && i + 1 >= input.length)
            {
                i++;
                edo = 0;
                text = input.substring(index, i).trim();
                tokenType = TokenType.INT_CONST;
                index = i;
                return Token(tokenType, text);
            }
            // Si comienza un NUM o continua sigue al siguiente caracter
            if ((edo == 0 || edo == 5) && (digit.test(c) || c == '.'))
            {
                edo = 5;
                continue;
            }
            //Si el siguiente caracter es otro simbolo regresa el texto del NUM
            if (edo == 5 && simbol.test(c))
            {
                edo = 0;
                text = input.substring(index, i).trim();
                if (text.indexOf(".") > -1)
                    tokenType = TokenType.FLOAT_CONST;
                else
                    tokenType = TokenType.INT_CONST;
                index = i;
                return Token(tokenType, text);
            }
            else
            {
                throw "No se reconoció el dígito => "+c+" Con el index:{"+i+"}";
            }
        }
        return Token(TokenType.EOL, "");
    }
}