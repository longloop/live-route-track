Live Location Tracker
======

###Road Map

* To have a router send his position in live time to the server. - Done
* To have a viewer receive those locations from router and show in live map with marked destination and beginning. - Done
* To have a DB store in server to store the route send by router. - Done
* To use Google Maps for all purposes. - Done
* To have full route of the router displayed as a path on the end of journey i.e. `/view` to become `/path`. - To Do

###Working

* Make a copy of `sample.*` files as `*` files and fill details.
* Run with `node index.js`
* Open `/` of the site. Click `start` to begin a route. Keep this window/tab open.
* Open `/view` in a new tab to view the path in live time. (Currently latlongs update per second)

###Known bugs

* Socket is sending router's location to everyone connected. This should be tackled by making sessions and uni-casting the location.