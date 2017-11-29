'use strict'

class Clay {
   
    onCommunication(fromClay, atConnectPoint, signal) {}

    onConnection(withClay,atConnectPoint){}

    static connect(clay1,clay2,atConnectPoint){
        clay1.onConnection(clay2,atConnectPoint);
        clay2.onConnection(clay1,atConnectPoint);
    }

    static vibrate(clay,atConnectPoint,signal,soureClay){
        clay.onCommunication(soureClay,atConnectPoint,signal);
    }    
}

module.exports = Clay;