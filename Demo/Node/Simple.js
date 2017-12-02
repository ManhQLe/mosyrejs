const LogicalClay = require('mosyrejs/LogicalClay');
const Conduit = require('mosyrejs/Conduit');

class Adder extends LogicalClay
{
    constructor(agreement){
        super(agreement);
        this.connectPoints = ["A","B"]
    }

    logicAtCenter(){
        this.SUM = this.A + this.B
    }
}


