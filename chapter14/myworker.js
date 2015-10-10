addEventListener("message", function (e) {
    postMessage(e.data * e.data);
});