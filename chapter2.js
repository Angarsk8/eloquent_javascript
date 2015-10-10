/*
PROGRAM STRUCTURE

EXPRESSIONS AND STATEMENTS

A fragment of code that produces a value is called an expression. Every value that is written literaly like 22 or "Psychoanalaysis" is an expression. If an expression correspond to a fragment sentence, a Javascript statement correspond to a full sentence in human language. A program is simply a list of statements! The simplest kind of sentence is an expression with a semicolon (;) after it (1;)

VARIABLES

To catch and hold values Javascript provides a thing called a Variable! 
*/

var caught = 5 * 5; // => caught = 25

/*
...
The special keyword "var" indicates that this sentence is going to define a variable.
var <variable-name> = <expression>
after a variable has been defined, its name can be used as an expression. the value of that expression is the value that variable currently hold.
The variables cannot start with numbers or characters except for $ and ._

A var statement can define multiple variables separated by a comma:
*/

var x = 1,
    y = 2,
    z = 3;

/*
KEYWORDS AND RESERVE WORDS

Words with an special meaning such as var, are keywords, and they might not be used as variable names, there are also some special words that are reserved for being used in future versions of javascript, those are called reserved words!

THE ENVIRONMENT

The collections of variables and their values that exists at a given time in a program is called the environment. When a program starts up the environment is not empty. It always contains variables that are part of the language standard, and most of the time it has variables that provide ways to interact with the surrounding system.

FUNCTIONS

A lot of the values provided in the default environment are of type "function". A function is a piece of program wrapped in a value. Such values can be applied to run the wrapped program. For example the browser environment has a variable called alert that holds a function to show an alert message
Values given to a funtion are called arguments 
Functions that doesn't return a value produce a side effect because they tend to change the current state of the program.

RETURN VALUES

Showing a dialog box or wrting text to the console is a Side Effect. Functions may also produce values, and in that case they don't need to have a side effect to be useful. For example the Math.max function, that takes any number of numbers and return the greatest one:
*/

console.log(Math.max(1, 2, 3, 4, 5)); // => 5
console.log(Math.min(1, 2, 3, 4) + 1); // => 5

/*
PROMPT AND CONFIRM

Browser environments contain other functions besides alert for popping up up windows. you can ask the user and ok/cancel question using "confirm" this returns a boolean.

confirm("Shall we, then?");

The prompt function can be used to ask an open question. The first argument is the question, the second is the text the user starts with.

prompt("Tell me everything you know", "...");

CONTROL FLOW

When your program contains more than one statement, the statements are executed predictably, from top to bottom
*/

var myNumber = 10; // 1.line
console.log(myNumber); // 2.line

/*
============>>>> this would be a trivial semantic representation of a straight control flow

CONDITIONAL FLOW

An alternative is condtional execution, where the program choose between two different routes based on a boolean value. Conditional execution is written with the keyword "if"

*/

var x = "Hello, world!";
if (isNaN(x)) console.log("This is not a number");

/*
The "else" keyword can be used in conjunction with "if" to create two different execution paths for the program depending on the returned value of the evaluated expression.
*/

x = 2;
if (isNaN(x))
    console.log("This is not a number");
else
    console.log("This is indeed a number!");

/*
if the contional has more than two execution paths then the "else if" keyword can be used to chain multiple contidions
*/

x = false;
if (isNaN(x))
    console.log("This is not a number");
else if (!isNaN(x))
    console.log("This is indeed a number");
else
    console.log("This could be anything");

/*
WHILE AND LOOPS

A repetitive form of flow control is called loop! Looping control flow allow us to go back at some point of the program where we were before and repeat it with our current program state.
*/

x = 0;
while (x < 10) {
    console.log(x + 1);
    x++;
}

/*
A statement created with the keyword while creates a loop; the keyword is followd by an expression in parenthesis followed by an statement or a piece of program. The loop executes the statement as long as the expression being evaluated return true when converted to Boolean type
Whenever we need to execute multiple statements within a loop, we wrap them in curly braces ({}), braces do for statements what parenthesis does for expressions, they group them together, making them count as a single statement. A sequence of statements wrapped in braces is called a block.
.*/
x = 0;
do {
    console.log(x + 1);
    x++;
} while (x < 1);

/*
The do while loop differs from the simple while loop, in the sense that the first always executes its block at least one!

FOR LOOPS

Are a defined structure for repetitive execution!
*/

for (var i = 0; i < 10; i++) {
    console.log(i + 1);
}

/*
Having the loop's condition produce false is not the only way to a loop can finish. There is a special statement called break that has the effect of inmediately enclosing the loop.
*/

for (var i = 20;; i++) {
    if (i % 7 == 0) break;
}
console.log(i);

/*
the "continue" keyword is similarly used to break, but in that case you have to set a break to get out of the loop!
*/

for (var i = 0;; i++) {
    if (i < 10)
        continue;
    else
        break
}
console.log(i);

/*
UPDATING VARIABLES SUCCINGTLY

<variable>+= <value>;
<variable>-= <value>;
<variable>*= <value>;
<variable>/= <value>;
<variable>++;
<variable>--;

DISPATCHING ON A VALUE WITH SWITCH

when you have multiple conditions to evaluate in a conditional flow, it's much better to use a switch statement rather than a multiple if conditional control flow:
*/

x = parseInt(Math.random() * 5);
switch (x) {
case 1:
    console.log(x);
    break;
case 2:
    console.log(x);
    break;
case 3:
    console.log(x);
    break;
case 4:
    console.log(x);
    break;
case 5:
    console.log(x);
    break;
}


/*
EXCERSICES

1. Write a loop that makes seven call to console.log to output the following triangle

#
##
###
####
#####
######
#######

*/

message = "#"
for (var i = 0; i < 7; i++) {
    console.log(message);
    message += "#";
}

/*
2. FizzBuzz problem ...
*/

for (var i = 1; i <= 100; i++) {
    if (i % 5 == 0 && i % 3 == 0)
        console.log("FizzBuzz");
    else if (i % 5 == 0 && i % 3 != 0)
        console.log("Buzz");
    else if (i % 3 == 0)
        console.log("Fizz");
    else
        console.log(i);
}

/*
3. Write a program that creates an 8X8 grid.

# # # #
 # # # #
# # # #
 # # # #
# # # #

*/

for (var i = 1; i <= 8; i++) {
    if (i % 2 == 0)
        console.log("# # # # ");
    else
        console.log(" # # # #");
}
/*
4. */