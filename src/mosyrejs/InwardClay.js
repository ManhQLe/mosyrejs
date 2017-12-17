const AttribClay  = require('./AttribClay');

class InwardClay extends AttribClay{
    constructor(agr){
        super(agr);
        this.contacts = new Map();
        this.__.center = new Proxy(this,{
            get(target,connectPoint){
                return target.__.signalStore[connectPoint];
            },
            set(target,connectPoint,signal){
                target.__.sensor.next({connectPoint,signal});
                return true;
            }
        });
        this.storeSignal = true;
    }

    response(cp,signal){
        const {center} = this.__;
    }

    onConnection(withClay,atConnectPoint){
        this.contacts.set(atConnectPoint,withClay);
    }

    onCommunication(fromClay,atConnectPoint,signal){
        const contacts = this.contacts;
        contacts.get(atConnectPoint)===fromClay 
        && this.storeSignal ?
        (this.response(atConnectPoint,signal)):1;
    }
}