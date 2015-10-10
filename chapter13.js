/*

Global document

THE DOCUMENT OBJECT MODEL

When you open a web page in your browser, the browser retrieves the page's HTML and parses it. The Browser builds up a model to draw the page on the screen. This representation of the document is one of the toys that javascript program has available in its sandbox. you can read from the model and also change it. It acts like a live data structure, when it is modified the page on the screen is updated to reflect the changes. 

DOCUMENT STRUCTURE

You can imagine an HTML document as a nested set of boxes. Tags such as <body> and </body> enclose other tags, which in turn contain other tags or text. For each box there is an Object, which we can interact with to find out things such as what html tag it represents and which boxes and text it contains. This representation is called the Document Object Model (DOM)

The global variable `document` gives us access to these objects. Its documentElement property refers to the object representing the <html> tag. It also provides the prperties body and head, which holds the object for those elements.
*/

var document;

console.log(document.documentElement); // retrieves the object representing the actual HTML code of the document
console.log(document.head);
console.log(document.title);
console.log(document.body);

/*
TREES

We call a data structure a tree when it has a branching structure, has no cycles (a node may not contain itself, directly or indirectly), and has a single well defined root. In the case of the DOM, document.documentElement serves as the root.

A typical tree has different kind of nodes. Application nodes always have children, whereas variables and values are leaves, or nodes withouts children. The same way goes for the DOM. Nodes for regular elements, which represents HTML tags, determine the structure of the document. These can have child nodes. An example of such a node is the document.body. Some of these children can be leaf nodes, such as pieces of text or comments.

Each DOM node object has a nodeType property, which contains a numeric code that identifies the type of node. Regular elements have the value 1. which is also define as the constant property document.ELEMENT_NODE. Text nodes, representing a section of text in the document, have the value 3 (document.TEXT_NODE). Comments have the value 8 (document.COMMENT_NODE)

THE STANDARD

The DOM wasn't designed just for javascript. Rather it tries to define a language-neutral interface that can be used in other systems as well –not just HTML but also XML, which is a generic data format with an HTML-like format. (childNode property not a real array unless it looks like one, create an element and defining its children and its attributes one by one cause side effects)

This is unfortunate. Code that interacts heavily with the DOM tends to get long, repetitive and ugly.

MOVING THROUGH THE TREE

DOM nodes contains a wealth of links to other nearby nodes. The followig diagram illustrate these: (see image in the root folder). 

Although the diagram shows only one link of each type, every node has a parentNode property hat points to its containing node. Likewise every element (node type 1) node has a childNodes property that points to an array like object holding its children.

In theory you could move anywhere in the tree using just these parent and child links. But javascript gives you access to an option of aditional convenience links. The firstChild and lastChild properties points to the first and last child node or have the value null for nodes without children, similarly previousSibling and nextSibling point to adjacent nodes, which are nodes with the same parent that appear inmediately before or after the node itself. For a first child, previousSibling will be null, and for the last child nextSibling will be null as well.

When deling with a nested data structure like this one, recursive functions are often usefull. The following recursive function scans a document for text nodes containing a given sting and returns true when it has found one.

*/

function talksAbout(node, string) {
    if (node.nodeType == document.ELEMENT_NODE) {
        for (var i = 0; i < node.childNodes.length; i++) {
            if (talksAbout(node[i], string)) {
                return true;
            }
        }
        return false;
    } else if (node.nodeType == document.TEXT_NODE) {
        return node.nodeValue.indexOf(string) > -1;
    }
}

console.log(talksAbout(document.body, "book"));

/*
The nodeValue property of a text node referes to the string of text that it represents.

FINDING ELEMENTS 

Rather than traversing the DOM with primitive properties and methods like parentNode, childNodes, children, nextSibling, previousSiblinf,firstChild and lastChild. Javascript allows to select the element you're trying to find with a set of improved methods. What if we wanna get the first link element in the document.
*/

var firstLink = document.getElementsByTagName("a")[0];
console.log(firstLink);

/*
All element nodes have a getElementByTagName property or method, which collects all elements with the given tag name that are descendants (direct or indirect children) of the given node and returns them as an array like object. To find an specific single node you can give it a id and use the document.getElementById instead.
*/

var ostrich = document.getElementById("gertrude");
console.log(ostrich);

/*
A third, similar method is getElementsByClassName, which like getElementsByTagName, searches through the contents of an element node and retrieves all elements that have the given string in their class attribute.

CHANGING THE DOM

Almost everything about the DOM data structure can be changed. Element nodes have a number of methods that can be used to change their content. The removeChild method removes the given child node from the document. To add a child we can use the appendChild method, which puts it at the end of the list of children, or insertBefore, which inserts the node given as the first argument before the node given as the second argument.

The replaceChild method is used to replace a child node with another one. It takes as arguments two nodes: a new node and the node to be replaced. The replaced node must be a child of the element the method is called on. Note replaceChild and insertBefore expect the new node is their first argument.

CREATING NODES

In the following example, we want to write a script that replaces all images tags in the document with the the text held in their alt attributes, which specifies an alternative textual representation of the image. This involves not only removing the images but adding a new text node to replace them. For this we use the document.createTextNode method. (see chapter13/sample1.html)

The loop that goes over the images starts at the end of the list of nodes. This is necessary because the node list returned by a method like getElementsByTagName (or a property like childNodes) is live. That it is updated as the document changes. If we started from the front, removing the first image would cause the list to loose its first element so that the second time the loop repeats, where i is 1, it would stop because the length of the collection is now also 1.

If you want a solid collection of nodes, as opposed to a live one, you can convert the colection to a real array by calling the array slice method on it. 

*/

var arrayLikeObject = {
    0: "first",
    1: "second",
    length: 2
};

var realArray = Array.prototype.slice.call(arrayLikeObject);
realArray.forEach(function (elem) {
    console.log(elem);
});

/*
To create regular element nodes (type 1), you can use the document.createElement method, this method takes the tag name and returns a new empty node of the given type. (chapter13/sample2.html)

ATTRIBUTES

Some elements attributes, such as href for links, can be accesed through a property of the same name on the element's DOM object. But html allows you to set any attribute you want on nodes. This can be usefull because it allows you to store extra information in the document. If you make up your own attribute names, such attributes will no be present as a property in the element's node.  instead you'll have to use the getAttribute and setAttribute methods to work with them. (chapter13/sample3.html)

I recommend prefixing such made attribute with data- to ensure they do not conflict with any other attibutes. There's one comonly used attribute that cannot be accesed directly through its name as a property in a element's node, class, which is a reserved word in the javascript language. Instead you have to use the className property or the getAttribute and setAttribute passing as an argument class.


LAYOUT

You might have noticed that different types of elements are laid out differently. Some, such as paragraphs and headings, take up the whole width of the document and are rendered on separate lines. These are called block elements. others such as links or the strong element are rendered in the same line with their surrounding text. Such elements are called inline elements. 

For any given document, browsers are able to compute a layout, which gives each element a size and position based on its type and content. This layout is actually used to draw the document. The size and psition of an element can be accessed from javascript. The offsetWidth and the offsetHeight properties gives you the space the element takes up in pixels. Similarly the clientWidth and clientHeight properties gives you the size of the space inside the element ignoring the border width. (chapter13/sample4.html)

The most effective way to find the precise position of an element on the screen is the getBoundingClientRect method, it returns an object with top, bottom, left, right, indicating the pixel positions of the sides of the element relative to the top left of the screen. If you want relative to the whole document you must add the current scroll position, found under the pageXOffset and pageYOffset global variables. (chapter13/sample5.html)

STYLING

Javascript code can directly manipulate the style of an element through the node's style property. This property holds an object that has properties for all possible style properties. (unless the css declarations in the style node's property are inline)

QUERY SELECTORS

The querySelectorAll method, which is defined in both the document object and on element nodes takes a selector string and returns an array like object containing all the elements that it matches.

Unlike methods such as getElementsByClassName, the object returned by queryAllSelector is not live. It won't change when you change the document.

POSITIONING AND ANIMATING

The position style property influences layout in a powerful way. By default it has a value of static, meaning the element sits in its normal place in the document. When it is set relative, the elements still takes up space in the document, but now the top and left style properties can be used to move it relative to its normal place. When position is set to absolute, the element is removed from the normal document flow –that is, it no longer takes up space and may overlap with other elements. Also, its top and left properties can be used to absolutely position it relative to the top left corner of the nearest enclosing element whose position isn't static, or relative to the document if no such enclosing element exists. We can use this create an animation. The following document displays a picture of a cat that floats around in a elipse.
*/