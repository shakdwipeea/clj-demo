var req = require('request');
const util = require ('util');

function fetchSubData(subName, cb) {
    req({
	url: 'http://reddit.com/r/soccer.json',
	json: true
    }, function(error, response, body) {
	var h = body.data.children.map(children => {
	    var d = children.data;
	    return {
		url: d.url,
		title: d.title
	    }
	})
	cb(h);
    });
}

var subReddits = ["clojure", "haskell", "scala", "javascript", "erlang", "elixir",
                  "common_lisp", "sports", "soccer"]

function fetchAll(cb) {
    var coll = [];

    var completed = 0;

    for(var i = 0; i < subReddits.length; i++) {
	fetchSubData(subReddits[i], data => {
	    coll = coll.concat(data);
	    completed++;
	    checkNow(coll, subReddits.length, completed, cb);
	})
    }
}

function checkNow(coll, todo, completed, cb) {
    if(todo == completed) {
	console.log("Done")
	console.log(coll.length);
	cb(coll);
    }
}


console.time('fetchAll');
fetchAll(coll => {
    console.timeEnd('fetchAll');
});
