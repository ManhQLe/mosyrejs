'use strict'
const Clay = require('./Clay');
const ResponsiveClay = require('./ResponsiveClay');

class LogicalClay extends ResponsiveClay {
    constructor(agreement) {        
        super(agreement);
        this.createProp("logic",function(){});
        this.response =  (center) => this.logicAtCenter.call(center, this.agreement)      
    }

    logicAtCenter() {
        
    }
}

module.exports =  LogicalClay;