var req = require('request');
const util = require ('util');

var request = util.promisify(req);

function fetchSubData(subName) {
    return request({
	url: 'http://reddit.com/r/soccer.json',
	json: true
    }).then( data => {

	return data.body.data.children.map(children => {
	    var d = children.data;
	    return {
		url: d.url,
		title: d.title
	    }
	})
    }).catch(err => console.log(err))
}

// , "haskell", "scala", "javascript", "erlang", "elixir",
//                   "common_lisp", "sports", "soccer"
var subReddits = ["clojure", "haskell", "scala", "javascript", "erlang", "elixir",
                  "common_lisp", "sports", "soccer"]

const getDa = async item => {
  return await fetchSubData(item)
}

const getData = async () => {
  return await Promise.all(subReddits.map(sub => getDa(sub)))
}

function fetchAll() {
    getData().then(d => {
	console.log(d.flat().length)
	console.timeEnd('fetchAll');
    })
}

console.time('fetchAll');
fetchAll();
