var express = require("express");
var app = express();

const hostname = 'timestamp.alan';

app.get('/', function (req, res) {
    res.send(req.query);
});
app.get('/:date', function(req, res) {
    var datetime = require('node-datetime');
    console.log(req.params.date);
    console.log(new Date((req.params.date)*1000));
    
    var date = new Date(req.params.date);
    console.log(date);
    if (isNaN(date.getTime())) {
        console.log("checking the date");
        date = new Date((req.params.date)*1000);
    }
    var dt = datetime.create(date, 'f d, Y');
    console.log(dt);
//    var datetime = new Date(req.params.date);
    if (!isNaN(date.getTime())) {
        var dates = {
            'unix': dt.epoch(),
            'natural': dt.format()
        };
    } else {
        dates = {
            'unix': null,
            'natural': null
        }
    }
    
    res.send(dates);
});

app.listen(8080, hostname, function () {
    console.log("example app listening on port 8080");
});