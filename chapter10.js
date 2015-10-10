/*
MODULES

Modules divide programs into clusters of code that, by some criterion, belong together. 

NAMESPACING

Objects can be used to create puclicly accessible subnamespaces (Math Object), and functions can be used to create an isolated, private namespace inside of a module. 

USING FUNCTIONS AS NAMESPACES

Functions are the only thing in javascript that creates a new scope. So if we want our modules to have their own scope, we will have to base them in functions.

*/

var dayName = function () {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return function (number) {
        return names[number];
    };
}();

console.log(dayName(3)); // => Wednesday

(function () {
    function square(x) {
        return Math.pow(x, 2);
    }
    var hundred = 100;
    console.log(square(hundred));
})();

/*
OBJECTS AS INTERFACES

*/

var dayName = function () {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return {
        number: function (name) {
            return names.indexOf(name);
        },
        name: function (number) {
            return names[number];
        }
    };
}();

console.log(dayName.name(dayName.number("Sunday")));

(function (exports) {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    exports.number = function (name) {
        return names.indexOf(name);
    };
    exports.name = function (number) {
        return names[number];
    };
})(this.$weekDay = {});

console.log(weekDay.name(weekDay.number("Sunday")));

function FetchDays() {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.number = function (name) {
        return names.indexOf(name);
    };
    this.name = function (number) {
        return names[number];
    };
    return this;
}

FetchDays.apply(weekDay2 = {});
console.log(weekDay2.name(2));
console.log(weekDay2.number("Saturday"));

/*
DETACHING FROM THE GLOBAL SCOPE => require to use external modules or libraries as dependencies that live outside the global scope.

EVALUATING DATA AS CODE

Ther are several ways to take data (a string of code) and run it as part of the current program.
The most obvios way is the special operator `eval` which will execute a string of code in the current scope. This is usually a bad idea because it breaks some of the sane properties that scopes normally have, such as being isolated from the outside world.

*/

function evalAndReturn(code) {
    eval(code);
    return x;
}

console.log(evalAndReturn("var x = 10"));

/*
A better way of interpreting data as code is to use the function constructor. This takes two arguments: a sting contained a comma separatedlist of arguments ames and a string containing the functions body.
*/

var plusOne = new Function("n", "return n + 1;");
console.log(plusOne(3));

/*
This is precisely what we need for our modules. We can wrap a module's code in a function, with that function's scope becoming our module's scope.

REQUIRE

The following is a minimal implemetation of require:
*/

/*function require(name) {
    var code = new Function("exports", readFile(name));
    var exports = {};
    code(exports);
    return exports;
}

console.log(require("weekDay").name(1));*/

/*
Modules provide structure to bigger programs by separating the code into different files and namespaces. Giving these modules well defined interfaces makes them easier to use and reuse and makes it possible to continue using them as module evolves.

Though  the javascript language is characteristically unhelpful when it comes to modules, the flexible functions and objects it provides make it possible to provide rather nice module systems. Function scopes can be used as internal namespaces for the module, and objects can be used to store sets of exported values.


There are two popular, well defined approaches to such modules. One is called CommonJS Modules and revolves around a require function that fetches a module by name and return its interface. The other is called AMD and uses a define function that takes an aray of module names and a function and, after loading the modules, runs the function with their interfaces as arguments. 
*/