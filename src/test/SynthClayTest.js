const SynthClay = require("../mosyrejs/SynthClay");
const Conduit = require("../mosyrejs/Conduit");
const LogicalClay = require("../mosyrejs/LogicalClay")

class AddBlock extends LogicalClay{    
    constructor(aggrement){
        super(aggrement);
        this.connectPoints = ["A","B"];
    }
    logicAtCenter(){
        this.C = this.A + this.B;
    }
}
class MultBlock extends LogicalClay{
    constructor(aggrement){
        super(aggrement);
        this.connectPoints = ["MA","MB"]
    }
    
    logicAtCenter(){       
        this.MC = this.MA * this.MB;
    }
}

class LogBlock extends LogicalClay{
    constructor(aggrement){
        super(aggrement);
        this.connectPoints = ["TEXT"]
    }
    
    logicAtCenter(props){
        console.log(`Logger (${props.Name}) says:`,this.TEXT);
    }
}

const Over= new SynthClay({
    buildfx:()=>{
        const Add1 = new AddBlock();
        const Mult1 = new MultBlock();
        Conduit.link(Add1,"C","MA",Mult1);
        Conduit.link(Mult1,"MB").signal = 2;
        return [
            ["X",Add1,"A"],
            ["Y",Add1,"B"],
            ["OUT",Mult1,"MC"]
        ]
    }
})

const Log1 = new LogBlock({Name:"Result"})
const L1 = Conduit.link(Over,"X");
const L2 = Conduit.link(Over,"Y");
Conduit.link(Log1,"TEXT","OUT",Over);
L1.signal = 4;
L2.signal = 3;


