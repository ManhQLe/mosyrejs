const mar3 = require("../mar3");
const {LogicBlock,Clay,Conduit} = mar3;

class Clay2 extends Clay{
    constructor(props){
        super(props);        
        this.createProp("X",0);
        this.createProp("Y","Hello");
    }

    onCommunication(fromClay,atMedium,sig){
        console.log(fromClay,atMedium,sig);
    }
}

console.log("---------------------TESTING CLAY---------------------")

const c = new Clay2({
    "X":1,    
})
var v = c.X;
console.log(v);
console.log(c.X);
console.log(c.Y);

Clay.vibrate(c,"Test Test Test",1,{});

const c1 = new Clay({
    "Y":2
})

console.log("---------------------TESTING LogicBlock---------------------")

const c2 = new LogicBlock({
    "fx":function(ports,sigs){
        console.log(ports.A);
        console.log(ports.B);
        console.log(sigs)
    },
    "inPortNames":["A","B"],
})
Clay.connect(c,c2,"A");
Clay.connect(c1,c2,"B");

Clay.vibrate(c2,"A",1,c);
Clay.vibrate(c2,"B",3,c1);
//Clay.vibrate(c2,"B",4,c1);






