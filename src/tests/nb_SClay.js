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
        [3,6,72],
        [2,2,16]
    ],
    connectPoints:["RESULT"]
})


class Adder extends RClay{
    constructor(agr){
        super(agr);
        this.connectPoints=["X","Y"],
        this.staged = true;
    }

    onResponse(){        
        const center = this.getCenter();
        center.C = center.X + center.Y
    }
}

class Mult extends RClay{
    constructor(agr){
        super(agr);
        this.connectPoints=["X","Y"]
        this.staged = true;
    }

    onResponse(){
        const center = this.getCenter();
        center.C = center.X * center.Y
    }
}

const Add1 = new Adder()
const Add2 = new Adder()
const Mul = new Mult()

Conduit.createLink(Add1,"C",Mul,"X");
Conduit.createLink(Add2,"C",Mul,"Y");


const SClaySubject = new SClay({
    layoutMap:[
        ["A",Add1,"X"],
        ["A",Add1,"Y"],
        ["B",Add2,"X"],
        ["B",Add2,"Y"],
        ["R",Mul,"C"]
    ]    
})

const Block = new BlockClay();

Conduit.createLink(SClaySubject,"A",Verifier,"A");
Conduit.createLink(SClaySubject,"B",Verifier,"B");
Conduit.createLink(SClaySubject,"R",Verifier,"RESULT");
Conduit.createLink(Block,"EXIT",Verifier,VerifierClay.OutPoint)



Verifier.start();