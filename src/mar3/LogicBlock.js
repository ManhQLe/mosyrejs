'use strict'
const Clay = require('./Clay');
const ProgrammableClay = require('./ProgrammableClay');

class LogicBlock extends ProgrammableClay {
    constructor(props) {        
        super(props);
        Object.assign(this.props, {
            "inputNames": this.definePorts(),
            "fx": (ports) => this.logic.call(ports, this.props)
        })
    }

    definePorts() {
        return [];
    }

    logic() {}
}

module.exports =  LogicBlock;