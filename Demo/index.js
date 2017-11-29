const readline = require('readline')
const chalk = require('chalk');
const log = console.log;

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

rl.on('line',(aa)=>{
    process.stdout.write(chalk.blue(aa));
    if(aa == 'q')
    rl.close();
})
