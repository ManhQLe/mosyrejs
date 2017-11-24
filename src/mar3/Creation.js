'use strict'

const Creation = {
    connect(clay1,clay2,atMedium){
        clay1.onConnection(clay2,atMedium);
        clay2.onConnection(clay1,atMedium);
    },
    vibrate(clay,atMedium,signal,soureClay){
        clay.onCommunication(soureClay,atMedium,signal);
    }
}

module.exports = Creation;