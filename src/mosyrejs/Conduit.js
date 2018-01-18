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
        //We do not want a conduit to connect to conduit with more than 1 contact
        //We do not want a to keep more than one records of a clay connect to the same point on conduit
        
        const {
            contacts
        } = this;

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
            x &&
            (
                this.isSameConnectionPoint(x.connectPoint, atConnectPoint) ||
                (x.withClay instanceof Conduit)
            )
        ) &&
        contacts.push({
            withClay,
            connectPoint: atConnectPoint
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

            withClay !== fromClay &&
                !this.isSameConnectionPoint(connectPoint, atConnectPoint) &&
                setTimeout(Clay.vibrate, 0, withClay, connectPoint, signal, this);
        }
    }

    connect(withClay, atConnectionPoint) {
        this.onConnection(withClay, atConnectionPoint);
    }
}

Conduit.link = function (clay1, p1, p2, clay2) {
    var con = new Conduit();
    Clay.connect(clay1, con, p1);
    (p2 && clay2) ? Clay.connect(clay2, con, p2): 1;
    return con;
}

Conduit.multiLink = function (...args) {
    var con = new Conduit();
    for (let x = 0; x < args.length; x += 2) {
        Clay.connect(args[x], con, args[x + 1])
    }
    return con;
}

module.exports = Conduit;