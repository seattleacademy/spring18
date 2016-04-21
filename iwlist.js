var express = require('express');
var app = express();
var iw = require('iwlist')('wlan0');
iw.scan(scanresults);
var scanfinalresults;

function scanresults(err, results) {
    if (err) {
        console.log("err", err);
    } else {
        console.log("results", results);
        aps = [];
        for(i = 0; i < results.length; i++){
        	console.log(results[i].address +"\t"+ results[i].essid +"\t"+ results[i].signal);
        	ap = results[i].address +','+ results[i].essid +','+ results[i].signal;
        	aps.push(ap);
        }
    	console.log(aps.join("\n"));
    	scanfinalresults = aps.join("\r")
    }
}

app.get('/', function (req, res) {
	  res.setHeader("Access-Control-Allow-Origin", "*");
  	iw.scan(scanresults);
  	res.send(scanfinalresults);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


