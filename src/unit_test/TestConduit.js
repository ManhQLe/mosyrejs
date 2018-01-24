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
        let Result2 =0;
        function addCore(center){
            Result = center.A + center.B;
        }        

        const C1 = new RClay({
            "response":addCore,
            "connectPoints":["A","B"]
        })
       

        const con = Conduit.createLink(this,"START1",C1,"A");
        con.ParallelTrx = false;
        const con2 = Conduit.createLink(this,"START2",C1,"B");
        con2.ParallelTrx = false;

        con.onCommunication(this,"START1",2);

        TestFrame.Assert(Result,0)

        con2.onCommunication(this,"START2",1);        

        TestFrame.Assert(Result,3);

        con2.onCommunication(this,"START2",4);        

        TestFrame.Assert(Result,6);

        const C2 = new RClay({
            "response":(core)=>{Result2+=core["IN"]},
            "connectPoints":["IN"]
        })

        Clay.connect(con,C2,"IN");

        con.onCommunication(this,"START1",3);

        TestFrame.Assert(Result,7);
        TestFrame.Assert(Result2,3);
        
        con2.onCommunication(this,"START2",8);

        TestFrame.Assert(Result,11);
        TestFrame.Assert(Result2,3);

        con.onCommunication(this,"START1",5);
        TestFrame.Assert(Result,13);
        TestFrame.Assert(Result2,8);
        
        //Turn on staged
        C1.staged = true;

        con.onCommunication(this,"START1",7);
        TestFrame.Assert(Result,15);
        TestFrame.Assert(Result2,15);

        con.onCommunication(this,"START1",1);
        
        //Should still be 15
        TestFrame.Assert(Result,15);

        TestFrame.Assert(Result2,16);

        con2.onCommunication(this,"START2",4);
        
        TestFrame.Assert(Result,5);
        TestFrame.Assert(Result2,16);
    }


    onCommunication(fromClay,atConnection,signal){        
    }

    onConnection(withClay,atConnection){
        
    }
}

module.exports = TestConduit;