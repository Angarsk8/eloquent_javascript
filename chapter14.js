/*
HANDLING EVENTS

Some programs work with direct user inputs, such as a mouse and keyboard interaction. The timing and order of such input can't be predicted in advance. This requires a different approach to control flow than the one we have used so far.

EVENT HANDLERS

–Polling is the process where the computer or controlling device waits for an external device to check for its readiness or state, often with low-level hardware. For example, when a printer is connected via a parallel port, the computer waits until the printer has received the next character– Most programmers avoid this process whenever possible.
A beter mechanism is for the underlying system to give our code a chance to react to events as they occur. Browsers do this by allowing us to register functions as handlers for specific events. (chapter14/sample1.html)

The addEventListener method registers its second argument to be called whenever the event described by its first argument occurs.

EVENTS AND DOM NODES

Each browser event handler is registered in a context. When you call addEventListener as shown previously, you are calling as a method on the whole window , because in the browser the global scope is equivalent to the window object. Every DOM element has its own addEventListener mehtod, which allows you to listen specifically on that element. (chapter14/sample2.html)

This example attaches a handler to the button node. Thus, click on the button cause that handler to run, whereas clicks on the rest of the document do not.

Giving a node an onclick attribute has a similar effect. But a node has only one onclick attribute, so you can register one handler per node that way. The addEventListener allows to add any number of handlers, so you can't accidentally replace a handler that has already been registered.

The removeEventListener method, called with arguments similar to as addEventListener, removes a handler. (chapter14/sample3.html)
To be able to unregister a handler function, we give it a name (such as once) so we can pass it to both addEventListener and removeEventListener. 

EVENT OBJECTS

Though we have ignored in the last examples, event handler objects are passed an argument: the event object. This object gives us additional information about the event. For example, if we want to know which mouse button was pressed, we can look at the event's object `which` property.  (chapter14/sample4.html)

The information stored in an event object differs per type of event. We'll discuss various types later in this chapter. The object's type property always holds a string indentifying the event (for example "click" or "mousedown").


PROPAGATION 

Event handlers registered on nodes with children will also receive some events that happen in the children. If a button inside a paragraph is clicked, event handlers on the paragraph will also receive the click event. But if both the paragraph and the button have a hanldler, the more specific handler –the one on the button– gets to go first. The event is said to propagate outward. From the node where it happened to that node's parent and on to the root of the document. Finally after al handlers registered on an specific node have had their turn, handlers registered on the whole window have a chance to respond to the event. At any point, an event handler can call the stopPropagation method on the event object to prevent handlers further upfrom receiving the event. (chapter14/sample5.html)

Most event objects have a target property that refers to the node where they originated. You can use this property to ensure that you are not accidentally handling something that propagated up from a node that you do not want to handle. It is also possible to use the target property to cast a wide net for a specific type of event. For example if you have a node containing a long list of buttons, it might be more convenient to register a single click handler on the outer node and have it use the target property to figure out wheter a button was clicked, rather than register individual handlers on all of the buttons. (chapter14/sample6.html)

DEFAULT ACTIONS

Many events have a default action associated with them, if you click a link you will be taken to the link's target. If you press the down arrow, the browser will scroll the page down. If you right click you'll get a context menu. And so on.

For most types of events the javascript event handlers are called before the default behaviour is performed. If the handler doesn't want the normal behaviour to happer, typically because it has already taken care of handling the event, it can call the preventDefault method on the event Object. (chapter14/sample7.html)

KEY EVENTS

When a key on the keyboard is pressed, your browser fires a keydown event. When it is released a keyup event fires. (chapter14/sample8.html)
Despite its name, "keydown" fires not only when the key is phisically pushed down. When a key is pressed and held, the event fires again every time the key repeats. The keyCode event's property allows us to get the unicode value of the key being pressed or released. A way to know the uncode value of a key is through the charCodeAt method of the String.prototype

Modifiers such as Shift, Ctrl, Alt and Meta generate key events just like normal keys. But when looking for keys combinations, you can also find whether these keys are held down by looking at the shiftKey, ctrlKey, altKey, and metaKey properties of keyboard and mouse events. (chapter14/sample9.html)

The keydown and keyup events give you information about the phisycall key that is being pressed. But waht if you are interested in the actual text being typed? Geting the text from key codes is akward. Instead, there's exist another event, keypress, which fires right after the keydown event, but only for keys that produce character input. The charCode property in the event object contains a code that can be interpreted as a unicode character code. We can use the String.fromCharCode function to turn this code into an actual single character string. (chapter14/sample10.html)

The DOM node where the event originates depend on the element that has focus when the key is pressed. Normal nodes cannot have focus (unless you give them a tabindex attribute) but things such as links, buttons and form fields can. When nothing in particular has focus document.body acts as the target node of key events.

MOUSE CLICKS

Pressing a mouse button also causes a number of events to fire. The `mousedown` and `mouseup` events are similar to `keydown` and `keyup` and fire when the buttons are pressed and released. This will happen in the DOM nodes that are inmediately below the mouse pointer when the event occurs. 

After the mouseup event, a click event fires on the most specific node that contained both the pressed and the released of the button. For example if I press down the mouse button on one paragraph and them move the pointer to another paragraph and release the button, the click event will happen on the element that contains both those paragraphs. If two clicks happen close together, a "dbclick" event also fires, after the second click event. 

To get precise information about the place where a mouse event happened, you can look at its pageX and pageY properties, which contains the event's coordinates (in pixels) relative to the top -left corner of the document.  (chapter14/sample11.html)

The clientX and clientY event's properties are similar to the pageX and pageY properties but relative to the part of the document that is currently scrolled into view. These can be usefull when comparing mosue coordinates returned by getBoundClientRect, that also return view port relative coordinates

MOUSE MOTION

Every time the mouse pointer moves, a "mousemove" event fires. This event can be used to track the position of the mouse. A common situation where this is useful is when implementing some form of mouse-dragging functionality. As an example, the following program displays a bar and sets up event handlers so that dragging to the left or right on this bar makes it narrower or wider.(chapter14/sample12.html)

Whenever the mouse pointer enters or leaves a node, a "mouseover" or "mouseout" events fires. These two events can be used , among other things, to create hover effects, showing or styling something when the mouse is over a given element. When the mouse moves onto one of its children, the mouseout fires on the parent node, though the mouse did not actually leave the node's extent. To make things worse, these events propagate just like other events, and thus you will also receive "mouseout" events when the mouse leaves off one of the child nodes of the node on which the handler is registered. (chapter14/sample13.html)

To work around this problem we can use the relatedTarget event's property created for these events. It tells us in the case of mouseover, what element the pointer was over before, in the case of mouseout what element it is going to. We want to change our hover effect only when the relatedTarget is outside of our target node. Only in that case this event actually represent a crossing over from outside to inside the node (or the other way around).

SCROLL EVENTS

Whenever an element is scrolled, a "scroll" event fires on it. This has various uses, such as knowing what the user is looking at (for disabling off screen animations or sending spy reports to your evil head quarters) or showing some indication of progress. The following example draws a progress bar in the top-right corner of the document and updates it to fill up as you scroll down. (chapter14/sample14.html)

FOCUS EVENTS

When an element gains focus, the browser fires a "focus" event on it. When it loses focues, a "blur" event fires.
Unlike the events discussed earlier, these two events do not propagate, A handler on a parent is not notified when a child element gains or loses focus. (chapter14/sample15.html).

LOAD EVENTS

When a page finishines loading, the "load" event fires on the window and the document body objects. This is often used to schedule initialization that require the whole document. 
Elements such as images and script tags that load an external file also have a "load" event that indicates the file they reference when loaded. Like the focus related events, loading events do not propagate.

When a page is closed or naviagted away from, a "beforeunload" event fires. The main use of this event is to prevent the user on accidentally losing work by closing a document. Preventing the page from unloading is not, as you migth expect, done with the preventDefault method. Instead it is done by returning a string from the event handler. The string will be used in a dialog that asks the user if they want to stay on the page or leave it. This mechanism ensures hat a user is able to leave the page, even if its running  malicious script that would prefer to keep them there forever in order to force them to look a dodgy weight ads.

SCRIPT EXECUTION TIMELINE

The are various things that can make a script start executing. Reading a script tag is one such thing. An event firing is another. Chapter13 discussed the requestAnimationFrame function, which schedule a function to be called before the next page redraw. That is yet another one in which a script can start running.

It is important to understand that even though events can fire at any time, no two scripts in a single document ever run at the same momment. If a script is already running, event handlers and pieces of code scheduled in other ways have to wait for their turn. This is the reason why a document will freeze when a script runs for a long time. The browser cannot react to clicks and other events inside the document because it can't run vent handlers until the current script finishes running. Some programming environments allow multiple threads of execution to run at the same time. Doing things at the same time can be used to make a program faster. But when you have multiple actors touching the same parts of the system at the same time, thinking about a program at least an order of magnitude harder. 

For cases where you really do want to do some time consuming thing in the background without freezing the page, browsers provide something called web workers. A worker is an isolated Javascript environment that runs alongside the main program for a document and can communicate with it only by sending and receiving messages. 

The postMessage function sends a message, which will cause a "message" event fire in the receiver. That script that created the worker sends and receives messages through the worker object, whereas the worker talks to the script that created it by sending and listening directly on its global scope--which is a new global scope not shared with the original script. 

SETTING TIMERS

The setTimeout function is similar to requestAnimationFrame. It schedules another function to be called later. But instead of calling the function at the next redraw, it waits for a given amount of milliseconds. This page turn from blue to yellow after two seconds. 

Sometimes you need to cancel out a function that you have scheduled. This is done by storing the value returned by setTimeout and calling clearTimeout on it

*/

(function () {
    var bombTimer = setTimeout(function () {
        console.log("BOOM!");
    }, 500);
    if (Math.random() < 0.5) {
        console.log("Defused.");
        clearTimeout(bombTimer);
    }
})();

/*
The cancelAnimationFrame function works in the same way as clearTimeout –calling it on a value returned by requestAnimationFrame will cancel frame (assuming it hasn't already be called). A similar set of functions, setInterval and clearInterval are used to set timers that should repeat every x milliseconds.
*/

(function () {
    var ticks = 0;
    var clock = setInterval(function () {
        console.log("ticks", ticks++);
        if (ticks == 10) {
            clearInterval(clock);
            console.log("Stop!");
        }
    }, 200);
})();

/*
DEBOUCING

Some types of events have the potential to fire rapidly, many times in a row ("mousemove", "scroll"). When handling such events, you must be careful not to do anything too time-consuming or your handler will take up so much time that interaction with the document starts to feel slow and choppy.

If you need to do something not trivial in such handler, you can use setTimeout to make sure you are not doing  it too often. This is usually called deboucing the event. (chapter14/sample18.html). Giving an undefined value to clearTimeout or calling it on a timeout that has already fired has no effect. We don't have to be carefully about when to call it, and we do so for every event.
*/