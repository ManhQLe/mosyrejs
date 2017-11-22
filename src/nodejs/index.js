//inPorts:[]
//saveContact()
//onVibration()
//
var X = {};

class Unit {
    constructor(props) {
        this.__ = {
            props: props || {}
        }
    }
    saveContact(unit, atMedium) {}

    onVibration(fromUnit, atMedium, signal) {}

    createProp(name, defVal, get, set) {
        Unit.createProp(this, name, defVal, get, set, this.__.props)
    }

    static createProp(O, name, def, getFx, setFx, storage) {
        getFx ? 1 : getFx = Unit.CONST.defaultGet;
        setFx ? 1 : setFx = Unit.CONST.defaultSet;

        Object.defineProperty(O, name, {
            get: function () {
                getFx.call(this, name, storage, defVal);
            },
            set: function (val) {
                setFx.call(this, name, storage, val)
            }
        })
    }

    static CONST = {
        defaultGet(name, store, defVal) {
            store.hasOwnproperty(name) ? 1 : this[name] = defVal;
            return store[name];
        },
        defaultSet(name, store, val) {
            store[name] = val;
        }
    }
}

export default Unit;


class Pack extends Unit {
    constructor(props) {
        super(props);
        this.__.ports = {};
        this.__.contacts = new Map();

        this.createProp("staged", true);
        this.createProp("fx", function () {})
        this.createProp("inPorts", []);
        this.createProp("props", null, function () {
            return this.__.props;
        }, function () {})

        this.createProp("ports", null, function () {
            return this.__.ports
        }, function () {});


    }

    saveContact(unit, atMedium) {
        const inPorts = this.inPorts;
        const {contacts} = this.__;
                
    }

    onVibration(fromUnit, atMedium, signal){
        
    }
}


export default Pack;