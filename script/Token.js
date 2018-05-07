import { TokenType } from 'TokenType.js';
export { Token, TokenType }

var Token = class
{   
    constructor()
    {
        this.Type = TokenType.TOKEN_NONE;
        this.Text = "not assigned";
    }

    create(t, text) {
        this.Text = text;
        this.Type = t;
    }

    get Text(){ return this.Text}
    set Text(text){ this.Text = text}

    get Type(){ return this.Text }
    set Type(t){ this.Type = t}
}