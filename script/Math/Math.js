import Mul from './Mul.js';
import Add from './Add.js';
import Cos from './Cos.js';
import Sin from './Sin.js';
import Trigonometry from './Trigonometry.js';

export {Mul, Add, Cos, Sin, Trigonometry};

export default function Math(){
  return Object.freeze({
    Mul,
    Add,
    Cos,
    Sin,
    Trigonometry
  });
}
