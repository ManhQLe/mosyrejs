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
        this.connectPoints = ["TEXT"]
    }
    
    constructor()
}

let Adder1 = new Adder();
let Mult1 = new Mult();
let Logger1 = new Logger();

const linkA = Conduit.link(Adder1,"A");
const linkB = Conduit.link(Adder1,"B");
const linkC = Conduit.link(Mult1,"B");
Conduit.link(Adder1,"SUM","A",Mult1);







