const toggles = document.querySelectorAll(".toggle")
const good = document.querySelector("#good")
const cheap = document.querySelector("#cheap")
const fast = document.querySelector("#fast")

toggles.forEach(toggle => toggle.addEventListener('change', e => doTheTrick(e.target)))

function doTheTrick(theClickedOne) {
    if(good.checked && cheap.checked && fast.checked){
        if(good === theClickedOne ) fast.checked = false;
        if(fast === theClickedOne ) cheap.checked = false;
        if(cheap === theClickedOne ) fast.checked = false;
    }
}

// function foo(){   
//     function bar() {   
//              return 3;    
//     }    
    
//     return bar();   
             
//     function bar() { 
//                 return 8;  
//     }
// }

// alert(foo());


// function parent() {   
//     var hoisted = "I'm a variable";   
//     function hoisted() {      
//         return "I'm a function";   
//     }    
    
//     return hoisted(); 
// }

// console.log(parent());


// alert(foo());
// function foo() {  
//     var bar = function() {    
//         return 3;  
//     };  
    
//     return bar();  
    
//     var bar = function() {    
//         return 8;  
//     };
// }

// var myVar = 'foo';

// (function() { 
//      console.log('Original value was: ' + myVar);  
//      var myVar = 'bar';  
//      console.log('New value is: ' + myVar);
// })();