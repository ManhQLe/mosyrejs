const mar3 = require("../mar3");
const {Clay,ProgrammableClay,Conduit} = mar3;


console.log("---------------------TESTING CONDUIT NO STAGE---------------------")

const AddBlock = new ProgrammableClay({
    inputNames:["A","B"],
    fx:(ports)=>{
        ports.C = ports.A + ports.B;
    }
})

class LogBlock extends ProgrammableClay{
    constructor(props){        
        super(props);
        this.props.inputNames = ["IN"],
        this.props.fx = (ports)=>{
            console.log("Logging: " ,ports.IN);
        }
    }
}

const Logger1 = new LogBlock()

let link = Conduit.link(AddBlock,"C","IN",Logger1);
let alink =Conduit.link(AddBlock,"A")
let blink =Conduit.link(AddBlock,"B")
console.log("Send signal to A: ",2)
alink.signal = 2;
console.log("Send signal to B: ",3)
blink.signal = 3;

console.log("Send signal to B: ",13)
blink.signal = 13;

console.log("---------------------TESTING CONDUIT STAGED---------------------")


const MultBlock = new ProgrammableClay({
    inputNames:["A","B"],
    staged:1,
    fx:(ports)=>{        
        ports.C = ports.A * ports.B;
    }
})
const Logger2 = new LogBlock();


link = Conduit.link(MultBlock,"C","IN",Logger2);
alink =Conduit.link(MultBlock,"A")
blink =Conduit.link(MultBlock,"B")
console.log("Send signal to A: ",2)
alink.signal = 2;
console.log("Send signal to B: ",3)
blink.signal = 3;

console.log("Send signal to B: ",13)
blink.signal = 13;
console.log("We should not see a logging of 26");

console.log("And then after 2 seconds we will see logging of 39...");
setTimeout(()=>{
    console.log("2 seconds are up.");
    alink.signal = 3;
},2000)