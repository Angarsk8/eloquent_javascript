/*global require*/

var ancestry = require('./ancestry.js');

/*
HIGH ORDER FUNCTIONS

ABSTRACTIONS

Abstractions hide details and give us the ability to talk about problems at a higher lever. 

ABSTRACTIONG ARRAY TRAVERSAL

*/

//not abstracted way
var array = [1, 2, 3];
for (var i = 0; i < array.length; i++) {
    console.log(array[i]);
}

//abstracted solution
function logEach(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}

//abstracted and general solution
function forEach(arr, action) {
    for (var i = 0; i < arr.length; i++) {
        action(arr[i]);
    }
}

forEach(array, console.log); // => 1,2,3

/*
Often you don't pass a function predefined but instead you create a function value on the spot.
*/

var sum = 0;
forEach(array, function (value) {
    sum += value;
});

console.log(sum);

/*
HIGHER ORDER FUNCTIONS

Functions that operates on other functions, either taking them as arguments or by returning them are called "Higher order functions".

PASSING ALONG ARGUMENTS

The noisy function defined earlier, which wraps its arguments in anoter function has rather serious deficit.

*/

function noisy(f) {
    return function (arg) {
        console.log("calling with", arg);
        var val = f(arg);
        console.log("called with", arg, "- got", val);
        return val;
    };
}

/*
If f gets more than one parameter, it gets only the first one. For these kind of situations, javascript functions have an "apply" method. You pass it to an array (or an array like object) of arguments and it will call those functions with those arguments.

*/

function transparentWrapping(f) {
    return function () {
        return f.apply(null, arguments);
    };
}

console.log(transparentWrapping(console.log)(1, 2, 3, 4, 5));

/*
JSON

JSON stands for Javascript Object Notation. It's widely used as a data storage and comunication format on the web. Json is similar to the way of writting arrays and object, with few restrictions. All property names must be surrounded by double quotes and only simple data expressions are allowed, no function calls, variables or anything that involves actual computation. Comments are not allowed in json.

*Properties must be surrounded by double quotes
*Only simple data expressions are allowed, not function calls, variables or any that involves actual computation
*Comments are not allowed in JSON

Javascript give us functions, JSON.stringify and JSON.parse, that convert data from and to this format. The first takes a javascript value and returns a JSON encoded string. The secong takes such as string and converts to the value it encoded.*/

var myString = JSON.stringify({
    x: 10,
    y: 20
});

console.log(myString);

var myObject = JSON.parse(myString);
console.log(myObject);

var myAncestry = JSON.parse(ancestry.ANCESTRY);
//console.log(myAncestry);
console.log(myAncestry.length);

/*
FILTERING AN ARRAY

To find the people in the ancestry data who were young in 1924, the following function might be helpful.
*/

function filter(array, test) {
    var passed = [];
    for (var i = 0; i < array.length; i++) {
        if (test(array[i])) {
            passed.push(array[i]);
        }
    }
    return passed;
}

console.log(filter(myAncestry, function (person) {
    return person.born > 1900 && person.born < 1925;
}));

/*
Just like forEach, filter is a method provided by the Array object
*/

/*
TRANSFORMING WITH MAP

the map method transform an array by applying a function to all its elements and building a new array from the returned values. 

*/
function map(array, transform) {
    var mapped = [];
    for (var i = 0; i < array.length; i++) {
        mapped.push(transform(array[i]));
    }
    return mapped;
}

var overNinety = myAncestry.filter(function (person) {
    return person.died - person.born > 90;
});

console.log(map(overNinety, function (person) {
    return person.name;
}));

/*
SUMARAZING WITH REDUCE

Another common pattern of computation on arrays is computing a single value from them. Summing a collection of numbers is an instance of this. Another example would be finding the person with the earlest date of birth in the data set. The higher order operation that represents this pattern is caled reduce.*/

function reduce(array, combine, start) {
    var current = start;
    for (var i = 0; i < array.length; i++) {
        current = combine(current, array[i]);
    }
    return current;
}

console.log(reduce([1, 2, 3], function (a, b) {
    return a + b;
}, 0));

/*
The standard array reduce method has an added convenience. if your array contains at least one element, your allowed to leave off the start argument. The method will take the first element of the array as its start element and start reducing at the second element.*/

console.log(myAncestry.reduce(function (current, value) {
    return value.born < current.born ? value : current;
}));

/*
EXERCISES

1. Flattering...

*/
var myLongArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];
console.log(myLongArray.reduce(function (current, subArray) {
    return current.concat(subArray);
}));

/*
2. Mother-child age difference.
*/
function ageDifference(arr) {
    var newArray = [];
    arr.forEach(function (person) {
        var mother = searchPerson(arr, person.mother);
        if (mother) {
            newArray.push(Math.abs(person.born - mother.born));
        }
    });
    return newArray;
}

function searchPerson(arr, name) {
    var toReturn = arr.filter(function (person) {
        return person.name === name;
    });
    return toReturn ? toReturn[0] : false;
}

function computeAverage(arr) {
    var ageDifferenceArray = ageDifference(arr);
    return Math.round(ageDifferenceArray.reduce(function (current, element) {
        return current + element;
    }) / ageDifferenceArray.length);
}

console.log(computeAverage(myAncestry));

/*
3. Average age per century
*/


function loadPersonsByCentury(arr) {
    var newHash = {};
    arr.forEach(function (person) {
        var century = Math.ceil(parseInt(person.died) / 100);
        century in newHash ? newHash[century].push(person) : newHash[century] = [person];
    });
    return newHash;
}

function calculateAverage(arr) {
    return Math.round(arr.map(function (person) {
        return Math.abs(person.died - person.born);
    }).reduce(function (current, age) {
        return current + age;
    }) / arr.length);
}

function averageAgePerCentury(arr) {
    var centuries = loadPersonsByCentury(arr);
    var averageAgeArray = {};
    for (var century in centuries) {
        if (centuries.hasOwnProperty(century)) {
            averageAgeArray[century + ' Century: '] = calculateAverage(centuries[century]);
        }
    }
    return averageAgeArray;
}

//console.log(loadPersonsByCentury(myAncestry));
console.log(averageAgePerCentury(myAncestry));