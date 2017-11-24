'use strict'
const Clay = require('./Clay')
const PropClay = require('./PropClay')

class Conduit extends PropClay {
    constructor(props) {
        super(props)
        this.__.contacts = [];

        this.createProp("signal", null, function () {}, function (name, store, signal) {
            this.onCommunication(this, undefined, signal);
        })
    }

    onConnection(withClay, withMedium) {
        const {
            contacts
        } = this.__;
        const x = contacts.find(c => {
            return c.withClay === withClay
        });
        x && (x.withMedium === withMedium || (x.withClay instanceof Conduit)) ?
            1 :
            contacts.push({
                withClay,
                withMedium
            });
    }

    onCommunication(fromClay, atMedium, signal) {
        const {
            contacts
        } = this.__;
        for (const c of contacts) {            
            const {
                withClay,
                withMedium
            } = c;
            
            withClay !== fromClay && withMedium !== atMedium ?
                setTimeout(Clay.vibrate, 0, withClay, withMedium, signal, this) :
                1
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