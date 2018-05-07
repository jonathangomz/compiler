import {TokenType} from './TokenType.js';
export default function Token(txt, ty) {
    const text = txt;
    const type = ty;

    return Object.freeze({
        empty,
        getText,
        getType,
        setText,
        setType,
    })

    function empty () {
        text = "not assigned";
        type = TokenType.TOKEN_NONE;
    }

    function getText () {
        return text;
    }

    function getType (ty) {
        type = ty;
    }
}