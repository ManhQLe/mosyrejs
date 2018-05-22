const VerifierClay = require("./VerifierClay")
const {RClay,Conduit} = require("../mosyrejs")
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
        [1,2,3],
        [2,3,5],
        [2,2,4],
        [3,6,9]
    ],
    connectPoints:["RESULT"]
})

const Block = new BlockClay();

function addCore(center){
    center.C = center.A + center.B
}

const Adder = new RClay({
    response:addCore,
    staged:true,
    connectPoints:["A","B"]
})

Conduit.createLink(Adder,"A",Verifier,"A")
Conduit.createLink(Adder,"B",Verifier,"B")
Conduit.createLink(Adder,"C",Verifier,"RESULT")
Conduit.createLink(Block,"EXIT",Verifier, VerifierClay.OutPoint)

Verifier.start();
