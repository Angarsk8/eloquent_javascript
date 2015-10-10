/*

REGULAR EXPRESSIONS

Regular expressions are a way to describe patterns in string data. They form a small separate language that is part of Javascript and many other languages and tools. They are a powerful tool for inspecting and processing strings.

CREATING A REGULAR EXPRESSION 

A regular expression is a type of object. It can either be constructed with the RegExp() constructor or written as a literal value by enclosing the pattern in forward slash characters (/).
*/

var re1 = new RegExp("abc");
var re2 = /abc/;

/*
Both of the above expressions represents the same pattern, a followed by b followed by c. Backslashes have an special meaning too, in the sense they change the pattern of the expression.

TESTING FOR MATCHES

Regular expressions objects have a number of methods. The simplest one is test. If you pass it a string, it will return a boolean telling you whether the string contains a match of the pattern in the expression.
*/

console.log(/abc/.test("abcdef"));

/*
MATCHING A SET OF CHARACTERS

Putting a set of characters between square brackets makes that part of the expression match any of the characters between the brackets. 
 */

console.log(/[0-9]|[123456789]/.test("I was born in 1992"));

/*
There are a number of commom characters that have their own built in shortcuts

\d any digit character
\w any alphanumeric character
\s any white space character
\D a character that is not a digit
\W a nonalphanumerical character
\S a nonwhitespace character
\. any character except for a new line
*/

var dateTime = /\d\d-((\d\d)|(\w\w\w))-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("21-06-1992 12:00"));
console.log(dateTime.test("21-jan-1992 12:00"));

/*
When you want to match any character except the ones in the set. you can write a caret after the opening bracket.*/

var notBinary = /[^01]/;
console.log(notBinary.test("0101011100010"));
console.log(notBinary.test("0101011102010"));

/*
REPEATING PARTS OF A PATTERN

We know now how to match a single digit. What if we want to match a whole number -a sequence of one or more digits-?
When you put a plus (+) after something in a regular expression, it indicates that the element may be repeated more than once. thus /\d+/ matches any sequence of numbers.
*/

console.log(/\d+/.test("1234456666")); // => true
console.log(/\d+/.test("")); // => false
console.log(/\d*/.test("1234456666")); // => true
console.log(/\d*/.test("")); // => true

/*
The star (*) has a similar meaning but also allows the pattern to match zero times
A question mark a part of the expression optional, meaning it may occur zero or one time*/

console.log(/neighbou?r/.test("neighbour")); // => true
console.log(/neighbou?r/.test("neighbor")); // => true

/*
To indicate that a pattern should occur a precise number of times, use curly braces ({}) you can use it also to define a range of times it might occur. You can also specify open ended ranges. {,<number>} or {<number>,}
*/

var dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("21-6-1992 12:00"));

/*
GROUPING SUBEXPRESSIONS

To use an operator like + or * on more than one element at a time, you can use parentheses. A part of a regular expression that is enclosed in a parentheses  counts as a single element as far as the operator following are concerned.
*/

var cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("boohooohooooooboo".toUpperCase())); // => true

/*
The i at the end of the expression makes this regular expression insensitive.

MATCHES AND GROUPS

The test method is the absolute simplest method to match a regular expression. It tells you wheter it matches and nothing else. Regular expressions also have a exec (execute) method that will return null if no match was found and return an object with information about the match otherwise.
*/

var match = /\d+/.exec("I was born in 1992");
console.log(match);

/*
The object returned from exec has an index property that tells us where in the string the succesfull match begins. other than that the object looks like and array of strings. String values have a similar method called match*/

var match2 = "I was born in 1992".match(/\d+/);
console.log(match2);

/*
When the regular expression contains subexpressions grouped with parentheses, the text that matched those groups will also show up in the array 
*/

var quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'Hello'"));

console.log(/bad(ly)?/.exec("bad"));
console.log(/(\d)+/.exec("1234"));

/*
THE DATE TYPE

Javascript has a standard object type for representing dates –or rather points in time- It is called Date. if you simply create a date object using new, you get the current date and time. 
*/

console.log(new Date());
console.log(new Date(1992, 5, 21, 12, 23, 02, 45));

/*
Javascript uses a convention where months numbers start at 0, so december is 11. Timestamps are stored as the number of milliseconds since the start of 1970, using negative numbers for times before 1970 (folowing a convention set by UNIX TIME or EPOCH). The getTime() method returns this number.
*/

var myBirthDay = new Date(1992, 05, 21);
console.log(myBirthDay.getTime());

/*
If you give the date cnstructor a single argument, that argument is treated as such a millisecond count.
You can get the current millisencond count creating a new Date object and calling the getTime method on it, and also by using the Date.now function.
*/

console.log((new Date()).getTime() == Date.now());

/*
Dates objects provides methods like getFullYear, getMonth, getDate, getHours, getMinutes and getSeconds to extract their components. There's also getYear that gives you a rather usefull two digits value indicating the year

Putting parentheses around the parts that we're interested in, we can now easily create a date object from a string.
*/       

function findDate(string) {
    var dateTime = /(\d{1,2})-(\d{1,2})-(\d{4})/;
    var match = dateTime.exec(string);
    return new Date(match[3], match[2] - 1, match[1]);
}

console.log(findDate("21-6-1992"));

/*
WORDS AND STRING BOUNDARIES

If we want to enforce that the match must span the whole string, we can add markers ^ and $. The caret matches the start of the input string, while the dollar sign matches the end.

If on the other hand we just wann make sure the date starts and ends on a word boundary, we can use the marker \b. A word boundary can be the start or end of the string or any point in the sting that has a word character.
*/

console.log(/^\d/.test("123")); // => true
console.log(/\d$/.test("123")); // => true
console.log(/cat/.test("concatenate")); // => true
console.log(/\bcat\b/.test("concatenate")); // => false

/*
CHOICE PATTERNS

*/