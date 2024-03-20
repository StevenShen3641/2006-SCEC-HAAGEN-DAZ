console.log("hello world");
document.addEventListener("DOMContentLoaded", function(){
    let input = document.querySelector('input');
    input.addEventListener("keyup",function(event){
        let display = document.getElementById("display");
        if(input.value){
            display.innerHTML = `hello, ${input.value}`;
        }
        else{
            display.innerHTML = "hello who the hell are you";
        }
    })
})
