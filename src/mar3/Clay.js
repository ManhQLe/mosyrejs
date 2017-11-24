'use strict'

class Clay {
   
    onCommunication(fromClay, atMedium, signal) {}

    onConnection(withClay,atMedium){}

  
}

Clay.connect = function(clay1,clay2,atMedium){
    clay1.onConnection(clay2,atMedium);
    clay2.onConnection(clay1,atMedium);
},
Clay.vibrate =function(clay,atMedium,signal,soureClay){
    clay.onCommunication(soureClay,atMedium,signal);
}    

module.exports = Clay;