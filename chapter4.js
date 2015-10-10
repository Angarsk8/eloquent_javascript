/*
DATA STRUCTURES: OBJECTS AND ARRAYS

Javascript provides a data type specifically for storing sequences of values. It's called an array and it's written as a list of values between squared brackets separated by comma.
*/

var listOfNumbers = [1, 2, 3, 4, 5];
console.log(listOfNumbers[0]); // => 1 
console.log(listOfNumbers[4]); // => 5
listOfNumbers[2] = 20;
console.log(listOfNumbers); // => [1, 2, 20, 4, 5]
/*
The notation for getting and setting the elements inside an array uses square brackets as shown above. And the argument passed is called index. The first index of an array is Zero, not one. 

PROPERTIES

<object-name || variable-name>.<property-name> is a valid expression for accessing a property of some value. 
myString.length => access the length property of the value in myString
Math.max(*args) => access the property named max in the Math Object (which is a collection of mathematics related values and functions)
Almost all Javascript values have properties with the exception of the undefined value, such as undefined and null
*/


try {
    null.length;
} catch (e) {
    console.log(e.message);
}

/*
The two most commons ways to acces properties in Javascript are with the .(dot) notation and with the squared brackets notation.
The difference between both manners is that the notation expression fetches the property named exactly like the expression after the notation, and the squared brackets first try to evaluate the argument and then uses the result as the property name.

The elements in an Array are stored in properties, because the names of these properties are numbers and we often need to get their name from a variable, we have to use the brackets syntax to access them. 
*/

console.log(listOfNumbers["length"] === listOfNumbers.length); // => true

/*
METHODS 

Both string and Array objects contain, in addition to the length property, a number of properties that refer to function values.
*/

var myString = "this is a test";
console.log(typeof myString.toUpperCase); // => function
console.log(myString.toUpperCase()); // => "THIS IS A TEST"

/*
Properties that contain functions are generally called methods of the value they belong to. toUpperCase is a method of a String.

OBJECTS

Values of the type object are arbitrary colections of properties and we can add or remove these properties as we please. One way of creating these objects is with a curly brace notation.

*/

var day1 = {
    squirrel: false,
    events: ["worked", "ouched tree", "pizza", "running", "television"]
};

console.log(day1.squirrel); // => false
console.log(day1.wolf); // => undefined
day1.wolf = false;
console.log(day1.wolf); // => false

/*
Inside the curly braces we can give a list of properties separated by commas. Each property is written as a name, followed by a colon, followed by an expression that provides a value for the property. Properties whose names are not valid variable names or valid numbers have to be quoted.*/

var description = {
    work: "Went to work",
    "touched tree": "Touched a tree"
};

/*
This means that curly braces have two meanings in Javascript, at the start of a statement, they start a block of statements. In any other position they describe an Object. Reading property that doesn't exist will produce the value "undefined". you can assign a value to a property with the = operator, this will replace the value if the property already exists or will create a new propery with the given name and assings the value after the = operator. 

The delete unary operator cuts off a property of an object.
The in binary operator when applied to an string and an object, returns a Boolean value that indicates wheter that object has that property
*/

var anObject = {
    left: 1,
    right: 2
}

delete anObject.left; // => delete the property named left of the anObject Object
console.log(anObject); // => { right: 2 }
console.log("left" in anObject); // => false

/*

MUTABILITY

It's impossible to change an existing value of basic data types in javascript (booleans, strings, numbers, etc), that means they're inmuttable. You can combine them, derive new values from them, but when you take an specific value from them, the value will always remain the same. "It means that once you instantiate the object, you can't change its properties --stackoverflow-- http://stackoverflow.com/questions/3200211/what-does-immutable-mean/#answer-3200221".
With objects on the other hand, the content of a value can be modified by changing its properties.

There's a difference between having two references to the same object and having two difference objects having the same properties.
 */

var object1 = {
    value: 10
};
var object2 = object1;
var object3 = {
    value: 10
};

console.log(object1 == object2); // => true
console.log(object1 == object3); // => false

object1.value = 15;
console.log(object2.value); // => 15 (they object3 object is linked to the object object2 trough the same reference)
console.log(object3.value); // => 10 (remains untouched because it is a complete differet object)

/*

THE LYCANTHROPE 'S LOG

*/

var journey = new Array();

function addEntry(events, didITurnIntoASquirrel) {
    journey.push({
        events: events,
        squirrel: didITurnIntoASquirrel
    });
}

addEntry(["work", "touched tree", "pizza", "running", "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna", "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts", "beer"], true);

//...................................................................................................//

var myObject = {
    x: 1,
    y: 2,
    z: 3
};

//This is how you loop through an Object in javascript
for (var key in myObject) {
    if (myObject.hasOwnProperty(key)) // => This is how you check wheter the object has that property
        console.log(key + ': ' + myObject[key]); // => x: 1 // y: 2 // z: 3
}

console.log([1, 2, 3, 4, 5].indexOf(3)); // => 2 (returns the index of the array that match the function argument) String has that method
console.log([1, 2, 3, 4, 5].lastIndexOf(3)); // => 2 (returns the index of the array that match the function argument, starting in reverse) String has that method
console.log([1, 2, 3, 4, 5].reverse()); // => [5,4,3,2,1]

//You can pass a second optional argument to both .lastIndexOf  and .indexOf functions, to indicate where to start the look up.

// Slice takes a start index and an end index and returns an array that only has the elements between those indeces
console.log([0, 1, 2, 3, 4].slice(2, 4)); // => [2,3] (the first argument is inclusive, the last is exclusive)
console.log([0, 1, 2, 3, 4].slice(2)); // => [2,3,4] (the second argument is optional and when you don't pass it it returns the array after the first argument including it) String has those methods

//...................................................................................................//

/*
THE ARGUMENT OBJECT

Whenever a function is called an special variable named arguments is added to the environment in which the function body runs. This variable refers to an object that holds all the arguments passed to the function. 

The "arguments" object has a length property that tells us the number of arguments that were really passed to the function, it also has a property for each argument named like 0,1,2,3 just like an array. It seems to be an array, but it's not, so it doesn't have some of the array's property and methods like slice.
*/

function myTestFunction() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}

console.log(myTestFunction(1, 2, 3, 4, 5));

/*
THE MATH OBJECT

As we've seen Math is a grab bag of number-related utilty functions and values, such as Math.max(), Math.min() and Math.sqrt()
The Math object is simply used as a container to group a bunch of related functionality. There's only one Math object and it's almost never useful as a value. Rather it provides a namespace so that all these functions and values don't have to be global variables'. Having too many global variables popullate the namespace*/

var validAngle = Math.random() * 2 * Math.PI;

console.log(Math.random(validAngle));
console.log(Math.PI);
console.log(Math.sin(validAngle));
console.log(Math.cos(validAngle));
console.log(Math.tan(validAngle));
console.log(Math.floor(validAngle)); // => rounds down to the nearest integer number
console.log(Math.ceil(validAngle)); // => rounds up to the nearest integer number
console.log(Math.round(validAngle)); // => rounds to the nearest integer number

/*

THE GLOBAL OBJECT

The global scope, the space in which global variables live, can also be approached as an object in Javascript. Each global variable is present as a property of this global object. In browsers , the global scope is stored in the window variable. The top-level scope is not the global scope; var something inside a Node module will be local to that module:

var myVariable = "This is my variable";
console.log("myVariable" in global);
console.log(global.myVariable);

Objects and Array are an specific kind of object.
*/

console.log(typeof {});
console.log(typeof []);
console.log(typeof new Object());

/*
You can acces the name of the constructor of an object with the .constructor property.*/

/*
EXERCISES

1.The sum of a range.
*/

function range(par1, par2, par3) {
    var toReturn = new Array();
    var length = Math.abs(par1 - par2)
    var result = par1;

    for (var i = 0; i <= length; i++) {
        if (typeof par3 === 'undefined') par3 = 1
        toReturn.push(result);
        result = result + par3;
    }
    return toReturn;
}

function sum(arr) {
    var result = 0;
    for (var i = 0; i < arr.length; i++) {
        result += arr[i];
    }
    return result;
}

console.log(range(1, 10)); // => [1,2,3,4,5,6,7,8,9,10]
console.log(sum(range(1, 10))); // => 55
console.log(range(5, 2, -1)); // => [5,4,3,2]

/*
2. Reversing an Array*/

function reverseArray(arr) {
    var toReturn = new Array();
    for (var i = arr.length - 1; i >= 0; i--) {
        toReturn.push(arr[i]);
    }
    return toReturn;
}

function reverseArrayInPlace(arr) {
    var toReturn = new Array();
    for (var i = arr.length - 1; i >= 0; i--) {
        toReturn.push(arr[i]);
    }
    return toReturn;
}

var myArray = reverseArray([1, 2, 3, 4, 5]);
console.log(myArray);
console.log(reverseArrayInPlace(myArray));