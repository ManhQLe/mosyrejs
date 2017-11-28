const mar3 = require("../mar3");
const {Clay,BehavioralClay,Conduit} = mar3;


console.log("---------------------TESTING CONDUIT NO STAGE---------------------")

const AddBlock = new BehavioralClay({
    connectPoints:["A","B"],
    response: center=>{
        center.C = center.A + center.B;
    }
})

class LogBlock extends BehavioralClay{
    constructor(props){        
        super(props);
        this.connectPoints = ["IN"],
        this.response = (center)=>{
            console.log("Logging: " ,center.IN);
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


const MultBlock = new BehavioralClay({
    connectPoints:["A","B"],
    staged:1,
    response:(center)=>{        
        center.C = center.A * center.B;
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