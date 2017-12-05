const LogicalClay = require('mosyrejs/LogicalClay');
const Conduit = require('mosyrejs/Conduit');

/**
 * SIMPLE EQUATION
 * (A + B) * C
 *              .------.
 *   A----------|      |       .--------.
 *              | ADD  |-------|        |
 *   B----------|      |       | MULT   |      .--------.
 *              `------'       |        |------| LOGGER |
 *   C-------------------------|        |      '--------'
 *                             '--------'
 */                            



 class Mult extends LogicalClay{
     constructor(a){
         super(a);
         this.connectPoints=["A","B"];         
     }
     logicAtCenter(){  
        //Emulate Delay                   
        setTimeout(()=>{
            this.PRODUCT = this.A * this.B;
        },Math.random()*2000)         
     }
 }


class Adder extends LogicalClay
{
    constructor(agreement){
        super(agreement);
        this.connectPoints = ["A","B"]
    }

    logicAtCenter(){
        //Emulate Delay
        setTimeout(()=>{
            this.SUM = this.A + this.B
        },Math.random()*2000)     
        
    }
}

class Logger extends LogicalClay{
    constructor(a){
        super(a);
        this.connectPoints = ["DATA"]
    }
    
    logicAtCenter(props){
        console.log(`[${props.Name}] Logging value: ` + this.DATA);
    }
}

let Adder1 = new Adder();
let Mult1 = new Mult();
let FinalLog = new Logger({Name:"F1n4l"});
let SumLog = new Logger({Name:"5um"});

const linkA = Conduit.link(Adder1,"A");
const linkB = Conduit.link(Adder1,"B");
const linkC = Conduit.link(Mult1,"B");
const linkOfSum =  Conduit.link(Adder1,"SUM","A",Mult1);
linkOfSum.connect(SumLog,"DATA");

Conduit.link(Mult1,"PRODUCT","DATA",FinalLog);



console.log("Sending 2 -> Add(A)");
linkA.signal = 2;

console.log("Sending 3 -> Add(B)");
linkB.signal = 3;

console.log("Sending 3.14 -> Mult(B)");
linkC.signal = 3.14;

console.log("Waiting for answer...");






