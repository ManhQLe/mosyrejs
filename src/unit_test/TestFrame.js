const {
    Clay,
    Conduit
} = require('../mosyrejs');
const chalk = require('chalk')

class TestFrame extends Clay{
    Start(){
        console.log(`-------- Testing ${this.constructor.name} --------`)
        try{
            this.Test();
            console.log(chalk.green("Test passed"));
        }
        catch(ex){
            console.log(chalk.red(ex));
            console.log(chalk.yellow('Stack: '))
            console.log(chalk.yellow(ex.stack));
        }
        console.log(`-------- End of Testing ${this.constructor.name} --------`)
    }

    Test(){}

    static Assert(actual,expect){
        if(actual !== expect) 
            throw new Error(`Actual: ${actual} is not the same as expected: ${expect}`)
    }
}

module.exports = TestFrame;