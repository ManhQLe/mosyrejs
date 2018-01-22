const {
    Clay,
    Conduit
} = require('../mosyrejs');
const TestFrame = require('./TestFrame')

class TestConduit extends TestFrame{
    constructor(){
        super();
        this.Clay; 
    }

    Test(){
        TestFrame.Assert(1,1);
    }

    onCommunication(fromClay,atConnection,signal){

    }

    onConnection(withClay,atConnection){

    }
}

module.exports = TestConduit;