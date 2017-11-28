const mar3 = require("../mar3");
const {
    Clay,
    BehavioralClay,
    Conduit,
    LogicBlock
} = mar3;
const readline = require('readline');

class Logger extends LogicBlock {
    constructor(agm){
        super(agm);
        this.connectPoints = ["TEXT"]
    }
    logic(agreement) {
        console.log(agreement.Name, "says:", this.TEXT);
    }
}

const Log = new Logger({
    "Name": "Log1"
});
const link = Conduit.link(Log, "TEXT");
link.signal = 1;
link.signal = 2;

const link2 = Conduit.link(link, "A");


const Log2 = new Logger({
    "Name": "Log2"
})
Clay.connect(link2, Log2, "TEXT");

console.log(link.__.contacts);

for (var i = 0; i < 2; i++)
    link2.signal = "Hello" + i;

console.log("----------------------2INPUT TEST---------------------------")

class AddBlock extends LogicBlock{
    constructor(agm){
        super(agm);
        this.connectPoints = ["A","B"]
    }
    logic(){
        this.C = this.A + this.B;
    }
}
var Add = new AddBlock();
var Logger3 = new Logger({"Name":"AddResult"})
Conduit.link(Add,"C","TEXT",Logger3);
var linka = Conduit.link(Add,"A");
var linkb = Conduit.link(Add,"B");
linka.signal = 1;
linkb.signal = 1;