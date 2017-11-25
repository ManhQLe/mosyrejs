const mar3 = require("../mar3");
const {Clay,ProgrammableClay,Conduit,LogicBlock} = mar3;
const readline = require('readline');
class AddBlock extends LogicBlock{
    definePorts(){
        return ["A","B"];
    }
    logic(){
        this.C = this.A + this.B;
    }
}
class MultBlock extends LogicBlock{
    definePorts(){
        return ["MA","MB"];
    }
    logic(){
        console.log("Called M")
        this.C = this.MA * this.MB;
    }
}

class LogBlock extends LogicBlock{
    definePorts(){
        return ["IN"];
    }
    logic(){
        console.log(this.IN);
    }
}

var Add = new AddBlock();
var Mult = new MultBlock();
var Logger = new LogBlock();

Conduit.link(Add,"C","MA",Mult);
const link1 = Conduit.link(Mult,"MB");

Conduit.link(Mult,"C","IN",Logger);

const a = Conduit.link(Add,"A");
const b = Conduit.link(Add,"B");

a.signal = 1;
b.signal = 2;
for(let i = 0;i<2;i++)
link1.signal = i;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Press enter to quit ', (answer) => {
    // TODO: Log the answer in a database
    console.log(`Thank you`);  
    rl.close();
  });