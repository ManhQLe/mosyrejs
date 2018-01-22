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

        
        


    }

    onCommunication(fromClay,atConnection,signal){

    }

    onConnection(withClay,atConnection){
        
    }
}

module.exports = TestRClay;

