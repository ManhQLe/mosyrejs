const readline = require('readline');
const chalk = require('chalk')
const {
    Clay,
    Conduit,
    RClay
} = require('../mosyrejs');

//This test is for non blocking function call;

function Assert(actual,expect){
    if(actual !== expect) 
        throw new Error(`Actual: ${actual} is not the same as expected: ${expect}`)
}

class Verifier extends RClay {
    constructor(agreement){
        super(agreement);
        this.TestPhase = 0;
        this.TestFixture =[
            [1,2],
            [2,3],
            [19,20]
        ]
    }

    onResponse(cp){
        const center = this.getCenter();
        try{
            const {TestFixture} = this;            

            Assert(center.RESULT,TestFixture[this.TestPhase][1])
            if(++this.TestPhase<TestFixture.length){
                this.test();
            }
            else
            {
                console.log(chalk.green("Test passed"))
                process.exit();
            }
        }
        catch(ex){
            console.log(chalk.red(ex));
            console.log(chalk.yellow('Stack: '))
            console.log(chalk.yellow(ex.stack));
            process.exit();
        }       
    }

    getCurrentTest(){
        return this.TestFixture[this.TestPhase];
    }

    test(){
        const Test = this.getCurrentTest();
        const center = this.getCenter();
        center.TEST = Test[0];
    }

}

const Add1 = new RClay({
    "connectPoints":["IN"],
    "response":(center)=>{ 
        center.OUT = center.IN + 1
    }
})

const Checker = new Verifier({
    "connectPoints":["RESULT"]
});


const con1 = Conduit.createLink(Checker,"TEST",Add1,"IN");
const con2 = Conduit.createLink(Checker,"RESULT",Add1,"OUT")
con1.agreement.name="CON1";
con2.agreement.name="CON2";

Checker.test();

readline.emitKeypressEvents(process.stdin);