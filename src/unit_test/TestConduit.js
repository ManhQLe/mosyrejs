const {
    Clay,
    Conduit,
    RClay
} = require('../mosyrejs');
const TestFrame = require('./TestFrame')

class TestConduit extends TestFrame{
    constructor(cb){
        super(cb);
    }

    Test(){
        let Result= 0;

        function addCore(center){
            Result = center.A + center.B;
        }        

        const C1 = new RClay({
            "response":addCore,
            "connectPoints":["A","B"]
        })

        const con = Conduit.link(this,"START1",C1,"A");
        con.ParallelTrx = false;
        const con2 = Conduit.link(this,"START2",C1,"B");
        con2.ParallelTrx = false;

        con.onCommunication(this,"START1",2);

        TestFrame.Assert(Result,0)

        con2.onCommunication(this,"START2",1);        

        TestFrame.Assert(Result,3);

    }


    onCommunication(fromClay,atConnection,signal){        
    }

    onConnection(withClay,atConnection){
        
    }
}

module.exports = TestConduit;