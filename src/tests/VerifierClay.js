const chalk = require('chalk')
const {
    Clay,
    Conduit,
    RClay
} = require('../mosyrejs');


class VerifierClay extends RClay
{
    constructor(ag){
        super(ag);
        this.staged = true;
        this.caseIndex = 0;
        this.createProp("testSet",[]);
        this.createProp("actLogic",()=>{});
        this.createProp("verifyLogic",()=>{});
        const cps = this.contactPoints;
        if(cps.indexOf(VerifierClay.OutPoint)>=0)          
            throw new Error(`${VerifierClay.OutPoint} is reserved`)        
    }    

    getCurrentTestCase(){
        return this.caseIndex < this.TESTSET.length ? this.testSet[this.caseIndex]: null
    }

    onResponse(cp){        
        const isEnded = false;
        try{ 
            this.verifyLogic(this.getCurrentTestCase(),this.getCenter());
            ++this.caseIndex;            
            this.test();            
        }
        catch(ex){
            console.log(chalk.red(ex));
            console.log(chalk.yellow('------- Call Stack -------'))
            console.log(chalk.yellow(ex.stack));
            console.log(`------- End of ${this.constructor.name} -------`);      
            this.finalizeTest();
        }   
            
    }    

    test(){    
        const testCase = this.getCurrentTestCase();
        if(testCase)
            this.actLogic(testCase,this.getCenter());
        else
        {            
            console.log(chalk.green("Test Passed"));
            console.log(`------- End of ${this.constructor.name} -------`);
            this.finalizeTest();
        }
    }

    finalizeTest(){
        this.caseIndex = 0;
        this.getCenter()[VerifierClay.OutPoint] = 1;  
    }

    start(){
        console.log(`------- Start of ${this.constructor.name} -------`);
        test();       
    }

    static Assert(actual,expect){
        if(actual !== expect) 
        throw new Error(`Actual: ${actual} is not the same as expected: ${expect}`)
    }

    static OutPoint = "__M3G1CPO47";
}