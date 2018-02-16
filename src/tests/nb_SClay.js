const {SClay,RClay,Conduit} = require("../mosyrejs")
const VerifierClay = require("./VerifierClay")
const BlockClay = require("./BlockClay")

const Verifier = new VerifierClay({
    actLogic:(testCase,center)=>{
        center.A = testCase[0];
        center.B = testCase[1];
    },
    verifyLogic:(testCase,center)=>{
        VerifierClay.Assert(center.RESULT,testCase[2]);
    },
    testSet:[
        [2,3,24],
        [1,3,12],
        [5,1,20],
        [3,6,72]
    ],
    connectPoints:["RESULT"]
})


class Adder extends RClay{
    constructor(agr){
        super(agr);
        this.connectPoints=["A","B"],
        this.staged = true;
    }

    onResponse(){
        console.log("X")
        const center = this.getCenter();
        console.log("ADD")
        center.C = center.A + center.B
    }
}

class Mult extends RClay{
    constructor(agr){
        super(agr);
        this.connectPoints=["A","B"]
        this.staged = true;
    }

    onResponse(){
        const center = this.getCenter();
        center.C = center.A * center.B
    }
}

const Add1 = new Adder()
const Add2 = new Adder()
const Mul = new Mult()

Conduit.createLink(Add1,"C",Mul,"A");
Conduit.createLink(Add2,"C",Mul,"B");


const SClaySubject = new SClay({
    layoutMap:[
        ["A",Add1,"A"],
        ["A",Add1,"B"],
        ["B",Add2,"A"],
        ["B",Add2,"B"],
        ["R",Mul,"C"]
    ]    
})

const Block = new BlockClay();

Conduit.createLink(SClaySubject,"A",Verifier,"A");
Conduit.createLink(SClaySubject,"B",Verifier,"B");
Conduit.createLink(SClaySubject,"R",Verifier,"RESULT");
Conduit.createLink(Block,"EXIT",Verifier,VerifierClay.OutPoint)

console.log(Add1.contacts)

//Verifier.start();