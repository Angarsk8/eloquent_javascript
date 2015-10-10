/*
FUNCTIONS

The proccess of wrapping a piece of program in a value, stored in a variable!

DEFINIGN A FUNCTION

A function definition is just a regular variable definition where the value happens to be a function. For example the following code defines a variable called squared whose value is a function that produces or return the square value of the parameter asigned
*/

var squared = function (value) {
    if (Object.prototype.toString.call(value) === '[object Number]') {
        return Math.pow(value, 2);
    } else {
        throw new Error('The value provided should be a number');
    }
}

Object.prototype.toString.call(4); // => [object Number]
console.log(squared(4)); // => 16

/*
...
A function is created with an expression that starts with the keyword function. Functions have a set of parameters and a body that contains the statements that are to be executed when the function is called in the program.

A function can have multiple parameters or no parameters at all. As shown below:
*/

var makeNoise = function () {
    console.log("Hello world!!")
};

makeNoise(); // => "Hello world!!"

var power = function (base, exponent) {
    var toReturn = 1;
    for (var i = 0; i < exponent; i++) {
        toReturn *= base;
    }
    return toReturn;
};

console.log(power(4, 2)); // => 16

/*
...
Some functions produce a value such as square and power, and some don't such as makeNoise which produce only a side effect. A return statement defines the value the function returns. THE RETURN KEYWORD WITHOUT AN EXPRESSION AFTER IT WILL CAUSE THE FUNCTION TO RETURN THE VALUE "Undefined". By default, functions return undefined. To return any other value, the function must have a return statement that specifies the value to return.

PARAMETERS AND SCOPES

The parameters on a function behavies like regular variables, but the initial values are given by the caller of the function, not the code of the function itself. An important property of functions is that variables created inside of them, including their parameters, are "Local" to the function. these willl be newly created every time the function is called.

This "Localness" applies only to parameters and variables created with the var keyword inside the function body. Variables decalred outside of any function are called "Global", because they are visible trhougout the program. Its is possible to access such variables from inside a function as long as you haven't declared a local variable with the same name:
*/

var x = "Outside the function";

var f1 = function () {
    var x = "Inside a function";
};

console.log(x); // => Outside a function

var f2 = function () {
    x = "Inside a function";
};

console.log(x); // Inside a function

/*
The language makes it possible to read and understand function as small universes without having to worry about all the code at once.

NESTED SCOPE

Javascript distinguishes not only between local and global variables. Functions can be created inside others functions, producing several degrees of locality. 

*/

var landscape = function () {
    var result = '';
    var flat = function (size) {
        for (var count = 0; count < size; count++) {
            result += '_';
        }
    };
    var mountain = function (size) {
        result += '/';
        for (var count = 0; count < size; count++) {
            result += '`';
        }
        result += '\\';
    };
    flat(3);
    mountain(4);
    flat(6);
    mountain(1);
    flat(1);
    return result;
};

console.log(landscape()); // => ___/````\______/`\_

/*
...
the flat and mountain functions can see the result variable since they are defined within the same function scope, but they cannot see each other count variables since they're outside each other's scope. The environment outside the landscape scope doesn't see any of the variables defined inside of landscape.
In javascript only functions create a new scope, not like in other programming languages where a block define itself a scope. A block is used for conditional and control flow as a tool for separation or grouping statements.
The next version of javascript will introduce the keyword let, which works like var but creates a variable that is local to the enclosing block.
*/
var x = "this is x outside the block";

{
    var x = "This is x inside the block";
}

console.log(x); // => "This is x inside the block"

/*
FUNCTIONS AS VALUES

Function variables usually simply act as names for an specific piece of the program. A variable that holds a function is just a regular variable and can be assigned a new value.
*/

var x = function () {
    console.log(true)
}
x = function () {
    console.log(false);
}
x(); // => false

/*
...
DECLARATION NOTATION

There's a shorter way to write a function, in fact the function keyword can be use as the start of a function declaration:
*/
console.log(square2(4)); // => 16
function square2(value) {
    return Math.pow(value, 2);
}

/*
...
This is a function declaration. The statement defines the variable square and points it at the given function. The above code works even though the function has been defined below the call. This is because functions declarations are not part of the regular top-to-bottom regular-flow of control. They are conceptually moved to the top of their scope and can be used by all the code in that scope. USE IT IN THE OUTERMOST BLOCK OF A FUNCTION

THE CALL STACK

function greet(who){
    console.log('Hello ' + who);
}
greet("Andrés");
console.log("Bye");

Call stack => {
    top  
        greet
            console.log
        greet
    top
        console.log
    top
}

The place where the computer stores this context is called the "Call Stack", everytime a function is called the current context is put on top of this "stack". when the function returns, it removes the top context from the stack and uses it to continue execution. Storing this stack requires space in the computer's memory. When the stack grows too big, the computer will fail with a message like "out of stack space" or "too much recursion" 

*/

function chicken() {
    return egg();
}

function egg() {
    return chicken();
}

try {
    console.log(chicken());
} catch (e) {
    console.error('Error: ' + e.message); // => Maximum call stack size exceeded
}

/*
OPTIONAL ARGUMENTS

Javascript is xtremely braod-minded about the number of arguments you pass to a function. If you pass too many, the extra ones are ignored; if you pass to few, the simply parameters get assigned the value undefined. Javascript will never notice you about neither escenario, but you can use it to define default values:
 */

function power2(base, exponent) {
    if (typeof exponent === 'undefined') exponent = 2;
    var toReturn = 1;
    for (var i = 0; i < exponent; i++) {
        toReturn *= base;
    }
    return toReturn;
}

console.log(power2(4)); // => 16
console.log(power2(4, 3)); // => 64

/*
...

CLOSURE

The ability to treat functions as values combined with the fact that local variables are "re-created" every time a function is called. Brings up an interesting question. What happens to local variables when the function call that created them is no longer active?

*/

function wrapValue(param) {
    var localVariable = param;
    return function () {
        return localVariable;
    }
}

var wrap1 = wrapValue(1);
console.log(wrap1());
var wrap2 = wrapValue(2);
console.log(wrap2());

/*
...
The above is allowed and works just as you'd think, the variable can still be accessed. In fact, multiple instances of the same variable can be alive at the same time, which is another good illustration of the concept that local variables are literally re-created for every call. THIS FEATURE, BEING ABLE TO REFERENCE A SPECIFIC INSTANCE OF LOCAL VARIABLES IN A ENCLOSING FUNCTION IS CALLED CLOSURE.

RECURSION

Its is perfectly normal for a function to call itself as long as it doesn't overflow the stack. The function that call itself is called "Recursive". 
*/

/*

EXERCISES

1. minimun
*/

function min(par1, par2) {
    return par1 > par2 ? par2 : par1;
}

console.log(min(1, 10));

/*
2. recursion
*/

function isEven(par) {
    try {
        if (typeof par === 'number' && par >= 0) {
            if (par === 0) {
                return true;
            } else if (par === 1) {
                return false;
            } else {

                return isEven(par - 2);
            }
        }
    } catch (e) {
        console.error(e.message);
    }
}

console.log(isEven(50));
console.log(isEven(75));
//console.log(isEven(-1));

/*
3. Bean Counting
*/
function countBs(str) {
    toReturn = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) === 'B') toReturn++;
    }
    return toReturn;
}

console.log(countBs('BAD BOYS'));

function countChar(str, chr) {
    toReturn = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) === chr) toReturn++;
    }
    return toReturn;
}

console.log(countChar('Esto es una prueba', 's'));