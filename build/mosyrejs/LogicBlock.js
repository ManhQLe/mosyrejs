'use strict'
const Clay = require('./Clay');
const BehavioralClay = require('./BehavioralClay');

class LogicBlock extends BehavioralClay {
    constructor(agreement) {        
        super(agreement);
        this.response =  (center) => this.logic.call(center, this.agreement)      
    }

    logic() {}
}

module.exports =  LogicBlock;