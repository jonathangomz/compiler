import Math from './Math/Math.js';

export default function Operation(op, val1, val2 = 0){
  if (op.getType() == 60){ // Seno
    return Math().Sin(val1).getText();
  }else if(op.getType() == 61){ // Coseno
    return Math().Cos(val1).getText();
  }else if (op.getType() == 3){ // Suma
    console.log("val1: "+val1+" val2: "+val2+" => "+Math().Add(val1, val2).getText());
    return Math().Add(val1, val2).getText();
  }else if(op.getType() == 6){ // Resta
    return Math().Add(val1, val2).getText();
  }else if (op.getType() == 2){ // Multiplicación
    return Math().Mul(val1, val2).getText();
  }else if(op.getType() == 5){ // División
    return Math().Mul(val1, val2).getText();
  }else
    return null;
}
