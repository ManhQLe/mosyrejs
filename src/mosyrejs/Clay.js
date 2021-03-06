'use strict'

class Clay {

    //<-- Communicated through my point"
    onCommunication(fromClay, atConnectPoint, signal) {}

    onConnection(withClay, atConnectPoint) {}

    static connect(clay1, clay2, atConnectPoint, atConnectPoint2) {
        clay1.onConnection(clay2, atConnectPoint);
        clay2.onConnection(clay1, atConnectPoint2 ? atConnectPoint2 : atConnectPoint);
    }

    static vibrate(clay, atConnectPoint, signal, sourceClay) {
        clay.onCommunication(sourceClay, atConnectPoint, signal);
    }
}

module.exports = Clay;