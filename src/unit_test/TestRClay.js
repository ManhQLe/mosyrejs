const {
    Clay,
    RClay    
} = require('../mosyrejs');
const TestFrame = require('./TestFrame')



class TestRClay extends TestFrame{
    constructor(){
        super();        
    }

    Test(){
        let Init  = 0;
        let Result = 0;

        function addCore(center){

           Result = center.A + center.B
        }

        const initfx = ()=>{
            Init++;
        }

        const C1 = new RClay({
            "response":addCore,
            "init":initfx,
            "connectPoints":["A","B"]
        });

        C1.onConnection(this,"A");
        C1.onConnection(this,"B");

        C1.onCommunication(this,"A",2);        
        C1.onCommunication(this,"B",3);
 
        TestRClay.Assert(Result,5);
        //Test init function get called once only
        TestRClay.Assert(Init,1);

        C1.onCommunication(this,"B",6);
        TestRClay.Assert(Result,8);

        C1.onCommunication(this,"A",7);
        TestRClay.Assert(Result,13);

        //Change status to staged
        C1.agreement.staged = true;
        C1.onCommunication(this,"A",3);
        //Collection should be cleared at this staged
        TestRClay.Assert(Result,9);
        
        C1.onCommunication(this,"B",7);
        //Result should still be the same
        TestRClay.Assert(Result,9);
        
        //Send result to the same port again
        C1.onCommunication(this,"B", 12);
        //Result should be the same;
        TestRClay.Assert(Result,9);
        C1.onCommunication(this,"A", 8);
        TestRClay.Assert(Result,20);

        C1.onCommunication(this,"A", 0);
        //Result should be the same since collection got cleared
        TestRClay.Assert(Result,20);
        C1.onCommunication(this,"B", 1);
        TestRClay.Assert(Result,1);
        //We still want to assure that Init was only got called once.
        TestRClay.Assert(Init,1);
    }

    onCommunication(fromClay,atConnection,signal){

    }

    onConnection(withClay,atConnection){
        
    }
}

module.exports = TestRClay;

