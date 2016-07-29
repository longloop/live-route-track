var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/livelocation');

Routes = require('./models/routes');

var _globals = require('./_globals.js');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.get('/view', function (req, res) {
    Route = Routes;
    Route.getRouteDetails(111, function(done){
        if(done.status)
        {
            if(done.begining!=null)
                res.render('viewer', {gMapsKey : _globals.gMapsKey, destination:{lat : done.destination[0], long: done.destination[1]}, begining:{lat : done.begining[0], long: done.begining[1]}});
            else
                res.render('viewer', {gMapsKey : _globals.gMapsKey, destination:{lat : done.destination[0], long: done.destination[1]}, begining:{lat : null, long: null}});
        } 
        else
        res.render('viewer', {gMapsKey : _globals.gMapsKey, destination:{lat : done.destination[0], long: done.destination[1]}, begining:{lat : null, long: null}});
    })
});

app.get('/path', function (req, res) {
    Route = Routes;
    Route.getRouteDetails(111, function(done){
        if(done.status)
        {
            if(done.begining!=null)
                res.render('viewer', {gMapsKey : _globals.gMapsKey, destination:{lat : done.destination[0], long: done.destination[1]}, begining:{lat : done.begining[0], long: done.begining[1]}});
            else
                res.render('viewer', {gMapsKey : _globals.gMapsKey, destination:{lat : null, long: null}, begining:{lat : null, long: null}});
        } 
        else
        res.render('viewer', {gMapsKey : _globals.gMapsKey, destination:{lat : null, long: null}, begining:{lat : null, long: null}});
    })
});

app.get('/start', function (req, res) {
    Route = Routes;
    Route.newRoute(111, [26.84701, 80.94482], function(done){
        if(done.status)
            {
                console.log(done);
                res.render('router');
            }
        else
            console.log(done.message);
    })
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('latlong', function (msg) {
        //console.log('latlong: ' + msg);
        Route = Routes;
        //console.log(msg);
        //var msgarr = toString(msg).split(",")
        Route.updateLatlong(111, msg , function(done){
            console.log(done);
        })
        io.sockets.emit('latlong registered', { latlong: msg });
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});