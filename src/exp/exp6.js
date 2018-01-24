
function A(...args){
    args.forEach(x=>{
        console.log(x);
    })    
}

A(1,2,3,4);

A(["A","B","C"])