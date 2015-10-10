/*

BUGS AND ERROR HANDLING

Flaws in a program are ussually called bugs.

PROGRAMMER MISTAKES

The process of finding bugs or errors in a progam is called debugging.

STRICT MODE

Javacript can be made a little bit more strictly by using the "use strict" at the top of a function or a program file. 

*/

function canYouSpotTheProblem() {
    "use strict";
    for (var i; i < 10; i++)
        console.log("Happy happy");
}

canYouSpotTheProblem();

/*
When you forgot to put the var keyword in front of your variable, javascript quietly creates a global variable uses that. In strict mode however, an error is reported in instead. Another change in strict mode is that the this binding holds the value undefined in functions that are not called as methods. When making such call outside strict mode `this` refers to the global scope object. 
*/

function Person(name) {
    this.name = name;
}

var me = Person("Andrés");
console.log(name);

function Person(name) {
    //"use strict";
    this.name = name;
}

//var me = Person("Andrés");
//console.log(name);

/*
TESTING


*/

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function (other) {
    return new Vector(this.x + other.x, this.y + other.y);
}

function testVector() {
    var p1 = new Vector(10, 20);
    var p2 = new Vector(-10, 5);
    var p3 = p1.plus(p2);

    if (p1.x != 10) return "Fail: x porperty";
    if (p1.y != 20) return "Fail: y porperty";
    if (p2.x != -10) return "Fail: negative x porperty";
    if (p3.x != 0) return "Fail: x porperty from plus";
    return "everythink ok!";
}

console.log(testVector());

/*
Writing tests like this tends to produce rather repetitive, awkward code. Fortunately there exists pieces of software that help you build and run collection of tests (tests suites) by providing a language suited to expressing test by outputting informative information when a test fails. these are called testing frameworks.

EXCEPTIONS

When a function cannot proceed normally we would like to stop what we are doing and jump back to a place that knows how to handle the problem. This is what exception handling does. Exceptions are a mechanism that make it possible for code that runs into a problem to raise(or throw) an exception, which is simply a value.

Raising an exception resembles a super charged return from a function: it jumps out of not only the current function, but also out of it callers, all the way down to its first call that started the current execution. This is called unwinding the stack. 

*/

function promptDirection(question) {
    var answer = 'hola'; //prompt(question, '');
    if (answer.toLowerCase() === 'left') return "L";
    if (answer.toLowerCase() === 'rigth') return "R";
    throw new Error("Invalid direction: " + answer);
}

function look() {
    if (promptDirection("Which way?") === 'L') {
        return "a house";
    } else {
        return "two angry birds";
    }
}

try {
    console.log(look());
} catch (e) {
    //console.log(e);
    //console.log(e.message);
    console.log(e.stack);
}

/*
The throw keyword is used to raise an exception. Catching one is done by wrapping a piece of code in a try block, followed by the keyword catch. when the code in the try block raise an exception to be raised, the cath block is evaluated. the variable name after the catch will be bound the exception value. after the catch block finishes or if the try block finishes with no problem, control proceeds beneath the entire try/cath statement

In this case we use the Error constructor to create our exception value. this creates an object with a message property. In modern javascript environments, instances of this constructos also gather information about the call stack that existed when the exception was created, a so called stack trace. this information is stored in the satck property and can be usefull to debug a program. It tells us the precise function when the problem ocurred and which other functions led up to the call that failed

CLEANING UP AFTER EXCEPTIONS

Considering the following situation: a function withContext, want to make sure that, during its execution, the top level variable context holds a specific context value. after i finishes it restores its value to its old context value.

*/

var context = null;

function withContext(newContext, body) {
    var oldContext = context;
    context = newContext;
    var result = body();
    context = oldContext;
    return result;
}

/*
What if the body raises an exception? in that case the call to withContext will be thrown off the stack by the exception, and context will never be set back to its old value. A finally block means, no matter what happens, run the code after trying to run the code in try block.*/

var context = null;

function withContext(newContext, body) {
    var oldContext = context;
    context = newContext;
    try {
        return body();
    } finally {
        context = oldContext;
    }
}

try {
    withContext(5, function () {
        if (context < 10)
            throw new Error('Not enough context');
    });
} catch (e) {
    console.log('ignoring: ' + e.message);
}

console.log(context);

var hoo = function () {
    console.log("Hola");
};

/*
SELECTIVE CATCHING 

When a exception makes it all the way to the bottom of the stack without being caught, it gets handled by the environment. What this means differs between environments. When a catch body is entered all we know is that something in our try block caused an exception but we don't know what or which exception is caused. Javacript doesn't provide direct support for selectively catching exception. Either you catch them all or you don't catch any. But you can use a new type of error and use instanceof to indentify it.
*/

function InputError(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}

InputError.prototype = Object.create(Error.prototype);
InputError.prototype.name = "InputError";

function promptDirection(question) {
    var answer = "hola"; //prompt(question, '');
    if (answer.toLowerCase() === 'left') return "L";
    if (answer.toLowerCase() === 'rigth') return "R";
    throw new InputError("Invalid direction: " + answer);
}

while (false) {
    try {
        var dir = promptDirection("Where?");
        console.log("You choose " + dir);
        break;
    } catch (e) {
        if (e instanceof InputError)
            console.log("Not a valid directions. Try again!");
        else
            throw e;
    }
}

/*
The above example shows how is possible to write selective catching exceptions in javascript, you define a constructor for each error type you want to catch, and in the catch block you identify it with an instanceof binary operator. But before that, you have to set the custom error constructor prototype as a prototype of the Error.prototype and a set or override the name property.

ASSERTIONS

Assertions are a sanity tool to do basic sanity checking for programmer errors. Consider this helper function called assert:

*/

function AssertionFailed(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}

AssertionFailed.prototype = Object.create(Error.prototype);
AssertionFailed.prototype.name = "AssertionFailed";

function assert(test, message) {
    if (!test) throw new AssertionFailed(message);
}

function lastElement(array) {
    assert(array.length > 0, "empty array in lastElement");
    return array[array.length - 1];
}

//lastElement([]);

/*

EXCERCISES

1. Retry */

function MultiplicatorUnitFailure(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}

MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);

function primitiveMultiply(x, y, message) {
    if (Math.random() < 0.5) {
        return x * y;
    } else {
        throw new MultiplicatorUnitFailure(message);
    }
}

function wrapper() {
    while (true) {
        try {
            var result = primitiveMultiply(5, 10, "Random Error");
            return result;
        } catch (e) {
            if (e instanceof MultiplicatorUnitFailure)
                console.log(e.message);
            else
                throw e;
        }
    }
}

console.log(wrapper());

/*
2. The locked box.
*/

var box = {
    locked: true,
    unlock: function () {
        this.locked = false;
    },
    lock: function () {
        this.locked = true;
    },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};


function withBoxUnlocked(action) {
    try {
        box.unlock();
        action();
    } catch (e) {
        console.log(e);
    } finally {
        box.lock();
    }
}

withBoxUnlocked(function () {
    if (Math.random() < 0.5)
        console.log("test message");
    else
        throw new Error("Bad Input");
});

console.log(box.locked);