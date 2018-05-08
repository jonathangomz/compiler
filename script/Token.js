import {TokenType} from './TokenType.js';
export default function Token(ty, txt) {
    const type = ty;
    const text = txt;

    return Object.freeze({
        empty,
        getText,
        getType,
    })

    function empty () {
        text = "not assigned";
        type = TokenType.TOKEN_NONE;
    }

    function getText () {
        return text;
    }

    function getType () {
        return type;
    }
}