let buffer ="0";
let runningTotal=0;
let previousOperator;
const screen = document.querySelector(".results");

document.querySelector(".cont").addEventListener("click",function(event){
    if(event.target.tagName==="BUTTON"){
        buttonClick(event.target.innerText);
    }
})

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    rerender();
}
function handleSymbol(value){
    switch(value){
        case "C":
            buffer="0";
            runningTotal=0;
            previousOperator=null;
            break;
            
        case "=":
            if(previousOperator===null){
                return;
            }else{
                flushOperation(parseInt(buffer));
                previousOperator=null;
                buffer=""+runningTotal;
                runningTotal=0;
                break;    
            }
            default:
                handleMath(value);
                break;
    }
}
function handleNumber(value){
    if(buffer==="0"){
        buffer=value;
    }else{
        buffer+=value;
    }
} 
function rerender(){
    screen.value=buffer;
}

function handleMath(value){
    const intBuffer = parseInt(buffer);// ekranın inti
    if(runningTotal===0){
        runningTotal=intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator=value;
    buffer="0";
}

function flushOperation(intBuffer){
    if(previousOperator==="*"){
        runningTotal *=intBuffer;
    }else if(previousOperator==="/"){
        runningTotal /=intBuffer;
    }else if(previousOperator==="+"){
        runningTotal +=intBuffer;
    }else{
        runningTotal -=intBuffer;
    }
}