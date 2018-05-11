import Cos from './Cos.js';
import Sin from './Sin.js';

export default function Trigonometry(){

  return Object.freeze({
    cos,
    sin,
    toRadians,
    toDegrees
  });


  function cos (val) { return Cos(val); }

  function sin (val) { return Sin(val); }

  function toRadians(grades){ return grades * (Math.PI / 180); }

  function toDegrees(grades){ return grades * (180 / Math.PI); }
}