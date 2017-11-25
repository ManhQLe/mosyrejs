'use strict'

class Clay {
   
    onCommunication(fromClay, atMedium, signal) {}

    onConnection(withClay,atMedium){}

    static connect(clay1,clay2,atMedium){
        clay1.onConnection(clay2,atMedium);
        clay2.onConnection(clay1,atMedium);
    }

    static vibrate(clay,atMedium,signal,soureClay){
        clay.onCommunication(soureClay,atMedium,signal);
    }    
}

module.exports = Clay;