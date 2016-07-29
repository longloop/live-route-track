var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RouteSchema   = new Schema({
    rid : { type : String, required : true, unique : true }, 
	latlong : Array,
    destination: Array
}, { versionKey: false } );

RouteSchema.statics.getRouteDetails = function (rid, callback) {
    this.findOne({ rid: rid}, function (err, docs) {
        if (err){
            var output={status: false, message:err};
            callback(output);
        }
        else {
            if(docs != null)
            var output={status: true, destination:docs.destination, begining:docs.latlong[1]};
            else var output={status: true, destination:null, begining:null}
            callback(output);
        }
    });
};

RouteSchema.statics.updateLatlong=function(rid,latlong,callback){
    this.update({rid : rid},{$push:{latlong: latlong } }, function (err, docs) {
        if (err)
            callback(err);
        else
            callback(docs);
    });
};

RouteSchema.statics.newRoute=function(rid,destination,callback){
    this.create({rid:rid, destination:destination},function(err,data){
        if(err) { 
            var output={status: false, message:err};
            callback(output);
        }
        else
        {
           var output={status: true, id:data._id};
            callback(output);
        }
    });    
};



module.exports = mongoose.model('Route', RouteSchema);