'use strict'
const Clay = require('./Clay');
const BehavioralClay = require('./BehavioralClay');

class LogicalClay extends BehavioralClay {
    constructor(agreement) {        
        super(agreement);
        this.response =  (center) => this.logicAtCenter.call(center, this.agreement)      
    }

    logicAtCenter() {}
}

module.exports =  LogicalClay;