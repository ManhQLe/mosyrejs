const AttribClay  = require('./AttribClay');

class InwardClay extends AttribClay{
    constructor(agr){
        super(agr);
        this.contacts = new Map();    
    }

    response(){
        
    }

    onConnection(withClay,atConnectPoint){
        this.contacts.set(atConnectPoint,withClay);
    }

    onCommunication(fromClay,atConnectPoint,signal){

    }
}