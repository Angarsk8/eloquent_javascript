/*
Values
There are six basic types of values in javascript:
    *Numbers
    *Strings
    *Booleans
    *Objects
    *Functions
    *Undefined values.

Number
For very big or very small numbers, you can also use scientific notation by adding an e for "exponent" followed by the exponent of the number:
*/

console.log(1.9e10);

/*
...
Arithmetic (The main thing to do with numbers)
Arithmetic or binary operators:
+ => addition
- => substraction
/ => division
* => multiplication
% => module (remainder)
*/

console.log(1 + 1); // => 2
console.log(3 - 1); // => 2
console.log(2 * 1); // => 2
console.log(4 / 2); // => 2

/*
...
Special Number
The following values are considered numbers but don't behave like normal numbers:

Infinity  => The positive value of an infinite like number
-Infinity => The negative value of an infinite like number
NaN       => Not a Number special number
*/

console.log(Infinity > 0); // => true
console.log(0 > -Infinity); // => true
console.log(0 !== NaN); // => true
console.log(0 / 0); // => NaN

/*
...
Strings
They are written by enclosing their content in quotes ("" or ''), as long as the ending quote match the beginning one there will be no problem with the string.
Newlines and quotes can't be put between quotes, to make possible such a thing, the following notation is used (\), whenever a back slash is found inside a quoted text, it indicates that the character after has a special meaning. This is called SCAPING the character. (\n) add a new line, (\t) add a tab, etc...
*/

console.log('This is a line \nThis is another'); // => This is a line
//    This is another

console.log('This is a sample text \"\\n\".'); // => This is a sample text "\n"

/*
...
String cannot be divided, multiplied or subtracted, but the + operator can be used on them, it does not add, but it concatenates-it glues two strings together
*/

console.log('con' + 'cat' + 'e' + 'nate'); // => concatenates

/*
...
Unary Operators (operator that use one single value)
Not all operators are symbols. Some are written as words. One example is the "typeof" operator, which produces a string value naming the type of the value you give it
*/

console.log(typeof 0); // => number
console.log(typeof + Infinity); // => number
console.log(typeof - Infinity); // => number
console.log(typeof NaN); // => number
console.log(typeof ""); // => string
console.log(typeof true); // => boolean
console.log(typeof
        function () {}) // => function
console.log(typeof hello); // => undefined

/*
...
Boolean Values
javascript has two values True or False

Comparisson
Relational Operators
==  => equal to
!=  => different to or not equal to
<   => less than
>   => greater than
<=  => less or eaqul to
>=  => greater or equal to

There is only one value in Javascript that is not equal to itself, and that is NaN, which stands for "not a number".
*/

console.log(0 == 0); // => true
console.log(0 != 1); // => true
console.log(1 > 0); // => true
console.log("z" > "a"); // => true (based on unicode standard)
console.log(0 < 1); // => true
console.log("a" < "z"); // => true (based on unicode standard)
console.log(1 >= 1); // => true
console.log(1 <= 1); // => true
console.log(NaN == NaN); // => false

/*
...
Logical Operators
There are also some operations that can be applied to Boolean values themselves. Javascript supports three logical operators: and, or and not. These can be used to reason about Booleans

&& => and operator
|| => or operator
!  => not operator
*/

console.log(true && true); // => true
console.log(true || false); // => true
console.log(!false); // => true

/*
...
The last logical operator I will discuss is not unary, not binary, but ternary, operating on three values. It is written with a question mark and colon, like this:
*/

console.log(0 < 1 ? true : false); //=> true

/*
...
Undefined Values
There are two special values null and undefined, that are used to denote the absence of a meaningful value. They are themselves values, but they carry no information.
Many operations in the language that don't produce a meaningful value yield undefined simply because they have to yield some value
*/

console.log(null == undefined); // => true (refer to the same thing)

/*
...
Automatic Type Conversion
Javascript goes out of its way to accept almost any program you give it, even programs that do odd things.
*/

console.log(8 * null); // => 0
console.log("5" - 1); // => 4
console.log("5" + 1); // => 51
console.log("five" * 2); // => NaN
console.log(false == 0); // => true

/*
...
when an operator is applied to the wrong type of value, javascript will quietly convert that value to the type it wants, using a set of rules that often aren't what you want or expect. This is called "type coercion", so in the first example null becomes 0 and in the second examples "5" becomes 5.

For cases where you do not want automatic type conversion, there are two extra relational operators:

===  => Precisely equal to
!==  => Not precisely equal to
*/

console.log(false !== 0); // => true
console.log(("5" + 1) === (5 + 1)); // => false

/*
...
Short-Circuiting of Logical Operators
The logical operators  && and || handle values of different types in a peculiar way. They will convert the value on their left side to Boolean type in order to decide what to do, but depending on the operator and the result of that conversion, they return either the original left-hand value or the right-hand value
The || operator for example, will return the value of its left when that can be converted to true and will return the value of its right otherwise.
*/

console.log(null || "me"); // => me because the left value cannot be converted to true
console.log("me" || "him"); // => return me because the left value can be converted to true
console.log((true || false) === true);

/*
...
the && operator works similarly, but the other way around. When the value to its left is something that converts to false, it returns that value, and otherwise it returns the value of its right.
*/

console.log(null && "me"); // => null
console.log("me" && "him"); // => him
console.log((false || true) === false); // => false