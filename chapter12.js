/*
JAVASCRIPT AND THE BROWSER

NETWORKS AND THE INTERNET

A network protocol describes a style of communication over a network. There are protocols for sending emails, for fetching emails, for sharing files or even for controlling computers that happen to be inffected by malicious viruses.

Most protocols are built on top of other protocols. THE TRANSMISSION CONTROL PROTOCOL (TCP) –all internet connected devices speak it, and most communication on the internet is built on top of it.

A TCP connection works as follows: one computer must we waiting or listening, for other computers to start talking to it. To be able to listen for different kind of communications at the same time on a single machine, each listener has a number (called port) associated with it. Most protocols specify which port should be used by default. For example when we want to send an email using the SMTP protocol, the machine through which we send it is expected to be listening on port 25. Another computer can then establish the connection by connecting to the target machine using the correct port number. If the target machine can be reached and is listening on that port, the connection is succesfully created. The listening computer is called the server and the connecting computer is called the client. 

Such a connection acts as a two-way pipe through which bits can flow –the machines on both ends can put data into it. Once the bits are succesfully transmitted, they can be read out again by the machine on the other side. This is a convenient model. You could say that TCP provides an abstraction of the network.

THE WEB

The World Wide Web is a set of protocols and formats that allows us to visit web pages in a browser. The "Web" part in the name refers to the fact that such pages can easily link to each other.

To add content to the web, all you need to do is connect a machine to the internet, and have it listen on port 80, using the Hyper Transfer Protocol HTTP. This protocol allows other computers request documents over the network.

Each document in the web is named by a Universal Resorce Locator, which looks something like this.

 http://          www.eloquentjavascript.net  /12_browser.html
|  protocol  |   |          server         |  |     path     |

The first part tells us that this URL uses the HTTP protocol, then comes the part that identifies which part which server we are requesting the document from. Last is a path string that identifies the specific document (or resource) we are interested in. 

Each machine connected to the internet gets a unique ip address, which looks something like this `37.187.37. 82`. You can use this directly as the server part of the URL. But lists of more or less random numbers are hard to remember and akward to type, so you can instead register a domain name to point toward an specific machine or set of machines. I registered eloquentjavascript.net to point at the IP address of a machine I control and can thus use that domain name to serve web pages. 

If you type the previous URL into your browser's address bar, it will try to retrieve and display the document at that URL. First your browser has to find out what address eloquentjavascript.net referes to. Then using the HTTP protocol, it makes a connection to the server at that address and asks for the resource /12_browser.html.

*/