internal class Parser: Lexer
{
    bool advance    = true;         // Para llevar un control del avance de los tokens a analizar
    Token tok       = new Token();
    Stack<Token> PAR = new Stack<Token>();

/* 
         * * Constructores 
 */
    public Parser()
    {
    }

/*
         * * THE TESTER METHOD
         
 * Description: This method is used to test all the program
 *              just is necessary change the method inside. 
 */
    public float Tester()
    {
        tok = NextToken(); // Por mientras **
        return Inicio();
    }
    
 /* Métodos de la Clase */
    public float Expression() //=> Arreglar lo de paréntesis de clausura
    {
        do
        {
            Termino();
            if (advance)
                Advance(false);
            if (tok.Type == TokenType.SUM || tok.Type == TokenType.RES)
                Advance(true);
        } while(advance);
        // El primer método debe de llevar esto al final**
        if (tok.Type != TokenType.EOL && PAR.Count == 0)
            throw new ParserException(string.Format("Error al final de la línea "+errorToken, tok.Text, tok.Type));
        else
            return 1;
    }

    public float Termino()
    {
        do
        {
            Factor();
            if (advance)
                Advance(false);
            if (tok.Type == TokenType.MUL || tok.Type == TokenType.DIV)
                Advance(true);
        } while (advance);
        return 1;
    }

    public float Factor()
    {

        if (tok.Type == TokenType.ID) // Si es ID
            return Advance(1);
        if (tok.Type == TokenType.NUM) // Si es NUM
            return Advance(1);
        if (tok.Type == TokenType.PARA)
            return Par();
        else
            throw new ParserException(string.Format("Se esperaba ID || NUM se obtuvo " + errorToken, tok.Text, tok.Type));
    }

    public float Advance(byte i)
    {
        /*
         *  This method is used
         *  in final ways of the code.
         */
        if (i==1)
            advance = true;
        else
            advance = false;
        return 1;
    }
    public void Advance(bool adv)
    {
        /*
         *  This method is used
         *  to advance the token.
         */
        tok = NextToken();
        advance = adv;
    }
}