'use strict'
const Clay = require('./Clay')
const AttribClay = require('./AttribClay')

class Conduit extends AttribClay {
    constructor(agreement) {
        super(agreement)
        this.contacts = [];

        this.createProp("signal", null, function () {}, function (name, store, signal) {
            this.onCommunication(this, Symbol("DecisionfromAbove"), signal);
        })
    }

    onConnection(withClay, atConnectPoint) {
        const { contacts } = this;

        const x = contacts.find(c => {
            return c.withClay === withClay
        });

        // x && (x.connectPoint === atConnectPoint || (x.withClay instanceof Conduit)) ?
        // 1 :
        // contacts.push({
        //     withClay,
        //     connectPoint:atConnectPoint
        // });

        !(
            x 
            && (
                this.isSameConnectionPoint(x.connectPoint,atConnectPoint) 
                || (x.withClay instanceof Conduit)
            ) 
        )
        && contacts.push({
            withClay,
            connectPoint:atConnectPoint
        });

    }

    onCommunication(fromClay, atConnectPoint, signal) {
        const {
            contacts
        } = this.__;
        for (const c of contacts) {            
            const {
                withClay,
                connectPoint
            } = c;
           
            withClay !== fromClay 
            && !this.isSameConnectionPoint(connectPoint,atConnectPoint)
            && setTimeout(Clay.vibrate, 0, withClay, connectPoint, signal, this);            
        }
    }
}

Conduit.link = function (clay1, p1, p2, clay2) {    
    var con = new Conduit();
    Clay.connect(clay1, con, p1);
    (p2 && clay2) ? Clay.connect(clay2, con, p2): 1;
    return con;
}

module.exports = Conduit;