/*

THE SECRET LIFE OF OBJECTS

This story, like most programming stories start with the problem of complexity. One philosophy is that complexity can be manageable by separating it into small comparments that are isolated from each other. These compartments have ended up with the name objects. The object oriendted proramming alternative. 

METHODS

Methods as simple properties that hold functions values. This is a simple methods:

*/

var rabbit = {};
rabbit.speak = function (line) {
    console.log("The rabbit says '" + line + "'");
}

rabbit.speak('I\'m a alive');

/*
Usually a method needs to do something with the object it was called on. when a function is called as a method, the special variable or keyword this will create a reference to the object it was called on.
*/

function speak(line) {
    console.log("The " + this.type + " rabbit says " + line);
}

var whiteRabbit = {
    type: 'white',
    speak: speak
};
var fatRabbit = {
    type: 'fat',
    speak: speak
};

whiteRabbit.speak('I\'m the white rabbit');
whiteRabbit.speak('I\'m the fat rabbit');

/*
There is a method similar to apply, called call. It also calls the function it is a method of but takes its argumets normally, rather than as array. Like apply and bind, call can be passed this value.
bind pass the this binding to an specific object, and returns the function.
*/

speak.apply(whiteRabbit, ['I\'m a white rabbit']);
speak.call(whiteRabbit, 'I\'m a white rabbit');

/*
PROTOTYPES

Watch closely...
*/
var empty = {};
console.log(empty.toString);
console.log(empty.toString());

/*I just pulled a property out of an empty object. In addition to their set of properties, almost all objects also have a prototype.
A prototype is another object that is used as a fallback source of properties. When an object gets a request for property that it does not have, its prototype will be searched for the property, then prototype's protoype, and son on. So who is the prototype of that empty object? It is the greatest ancestral prototype, the entity behind almost all objects, `Object.prototype`*/

console.log(Object.getPrototypeOf({})); // {} the .getPrototypeOf(<object>) method returns the prototype of an object
console.log(Object.prototype); // {}

/*
The prototype relations of Javascript objects form a tree-shaped structure, and at the root of this structure sits Object.prototype. It provides few methods that show up in all objects, such as toString, which converts an object to an String representation.

Many Objects don't directly have Object.prototype as their prototype. But instead have another object, which provides its own default properties. Functions derived from Function.prototype, Arrays form Array.prototype.
*/

console.log(Object.getPrototypeOf(isNaN)); // [Function: Empty]
console.log(Object.getPrototypeOf([])); // []

/*
You can use Object.create(<object>) to create an object with an specific prototype.*/

var protoRabbit = {
    speak: function (line) {
        console.log("The " + this.type + " rabbit says " + line);
    }
};

var killerRabbit = Object.create(protoRabbit);
killerRabbit.type = 'Killer';
killerRabbit.speak('SKREEE!');

/*
CONSTRUCTORS

A more convenient way to create objects that derived from some shared prototype is to use a constructor. In javascript calling a function with new keyword in front of it causes it to be treated as a constructor. The constructor will have its this variable bound to a freh object, and unless its explicitly return another object value, this new Object will be returned from the call. An object created with new is said to be an instance of its contructor
*/

{
    function Person(firstName, lastName, age, sex) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.sex = sex;
    }

    console.log(Person.prototype);

    var Person2 = {
        firstName: null,
        lastName: null,
        age: null,
        sex: null,
        instantiate: function (firstName, lastName, age, sex) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.sex = sex;
        }
    };

    var me = new Person("Andrés", "García", 22, "Male");

    var me2 = Object.create(Person2);
    me2.instantiate("Andrés", "García", 22, "Male")

    var him = new Object({
        firstName: "Andrés",
        lastName: "García",
        age: 22,
        sex: "Male"
    });

    console.log(me);
    console.log(me2);
    console.log(him);
};

/*
Constructors (in fact all functions) get a property named prototype, which by default holds a plain empty object that derives from Object.prototype. Every instance created with this constructor will have this object as its prototype. so to add a speak method to rabbits created with the Rabbit constructor, we can simply do this:*/

function Rabbit(type) {
    this.type = type;
}

console.log(Object.getPrototypeOf(Rabbit));
console.log(Rabbit.prototype); // => {}
var killerRabbit = new Rabbit("Killer");
Rabbit.prototype.speak = function (line) {
    console.log("The " + this.type + " rabbit says '" + line + "'");
};
console.log(Rabbit.prototype); // => {speak: [Function]}
killerRabbit.speak('Hello!, World');

/*
It is important to note the distinction between the way a prototype is associated with a constructor (through its prototype property) and the way objects have a prototype (which can be retrieved with Object.getPrototypeOf). The actual prototype of a constructor is Function.prototype since constructors are functions, but its prototype property will be the prototype of instances created through it but is not its own prototype

OVERRIDING DERIVED PROPERTIES

When you add a property to an object, whether it is present in the object or not, the property is be added to the object  itself, which will henceforth have it as its own property. If theres is a property by the same name in the prototype, this property will no longer affect the object. The prototype itself is not changed.

*/

Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
killerRabbit.teeth = "long, sharp and bloody";
console.log(killerRabbit.teeth);
console.log(Rabbit.prototype.teeth);

/*
PROTOTYPE INTERFERENCE

A prototype can be used at any time to add new properties and methods to all objects based on it. 

*/

Rabbit.prototype.dance = function (arguments) {
    console.log("The " + this.type + " rabbit dances a jig");
};

killerRabbit.dance();

/*
When you loop over an object in javascript using the for in loop, the object's prototype always get in the way. so, it might be probable that some enumerable properties of the object's prototype must be present in the loop, properties such as toString of the ancestral Object.prototype doesn't appear because they're `nonenumerable`. Javascript distinguishes between enumerable and nonenumerable properties. All properties that we create by simply assigning to them are enumerables. The standard properties in Object.prototype are nonenumerables, which is why they do not show up in such a for/in loop. It is possible to create our own nonenumerable properties by using the Object.defineProperty function   
*/

Object.defineProperty(Object.prototype, "hiddenProperty", {
    enumerable: false,
    value: "hi"
});

for (var key in him)
    console.log(him[key]);

console.log("hiddenProperty" in him); // we apparently still have this property in our him object

/*
For that we can use the hasOwnProperty method*/

console.log(him.hasOwnProperty('hiddenProperty')); // this shows that the hiddenProperty property is not from the him object

/*
this method tells us whether the object itself has the property, without looking at its prototype.
*/

for (key in him) {
    if (him.hasOwnProperty(key)) {
        console.log(him[key]);
    }
}

/*

PROTOTYPE-LESS OBJECTS

*/

var map = Object.create(null); // sets null as its prototye, and null is just a meaningless value in javascript
console.log("toString" in map); // => false

/*
all the properties that a prototype-less object has are their own

POLYMORFISM

Is the concept of writing code that can work with objects of multyple types and classes at once. toString works wth numbers, arrays, objects, booleans, etc... 
*/

console.log(true.toString());

/*
Using a variable starting with an underscore `_` or consisting entirely of a underscore is a way to indicate that this argument is not going to be used. 

GETTERS AND SETTERS

When specifying an interface, it is possible to include properties that are not methods but in Javascript is better not to include nonmethod properties in interfaces. In object literal, the get or set notation for properties allows you to specify a function to be run when the property is read or written, you can add such property to an existing object, using the Object.defineProperty method*/

{
    function Test(argument) {
        Object.defineProperty(this, "myArgument", {
            writable: false,
            enumerable: false,
            value: argument
        });
        this.getMyArgument = function () {
            return this.myArgument;
        };
        this.setMyArgument = function (newArgument) {
            this.myArgument = newArgument;
        };
    }

    var myTest = new Test('Hello');
    console.log(myTest.getMyArgument());
    myTest.setMyArgument('Hola');
    console.log(myTest.getMyArgument());
    console.log(myTest.myArgument + '@@@@');
}

{
    var pile = {
        get elements() {
            return [1, 2, 3, 4, 5];
        },
        set elements(numArray) {
            console.log(numArray);
        }
    };

    console.log(pile.elements);
    pile.elements = [6, 7, 8, 9, 10];
    console.log(pile.elements);

}

{
    var myNewObject = {
        elements: [1, 2, 3, 4, 5]
    };

    Object.defineProperty(myNewObject, "items", {
        get: function () {
            return this.elements.length;
        },
        set: function (items) {
            this.elements = items;
        }
    });

    console.log(myNewObject.items);
    myNewObject.items = [6, 7, 8];
    console.log(myNewObject.items);
}

{
    var myOtherObject = {
        elements: [1, 2, 3, 4, 5]
    };

    myOtherObject.__defineGetter__("largo", function () {
        return this.elements.length;
    });

    console.log(myOtherObject.elements);
    console.log(myOtherObject.largo);
    myOtherObject.largo = 10;
    console.log(myOtherObject.largo);
}

/*
INHERITANCE

Prototypes may themselves have prototypes and this allows us to do something clever.
*/

function Person(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = lastName;
    this.age = age;
}

Person.prototype.foo = "bar";

function Zoombie(firstName, lastName, age, level) {
    Person.apply(this, [firstName, lastName, age]);
    this.level = level;
}

Zoombie.prototype = Object.create(Person.prototype);
console.log(Object.getPrototypeOf(Zoombie.prototype));

/*
This pattern is called inheritance. It allows us to build slightly different data types from existing data types with relatively little effort.

THE INSTANCE OF OPERATOR

It is occasionally useful to know whether an object was derived from an specific constructor. For this Javascript provides a binary operator called instanceof. it tells you whether an object is an instance of that constructos <object-name> instanceof <constructor-name>
*/

console.log(myTest instanceof Test); // => true
console.log(Zoombie.prototype instanceof Person); // => true