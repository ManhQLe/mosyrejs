const mar3 = require("../nodejs");
const {Clay,SynEntity} = mar3;

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

const c = new Clay2({
    "X":1,    
})
var v = c.X;
console.log(v);
console.log(c.X);
console.log(c.Y);

c.interact(c,"P",2);
