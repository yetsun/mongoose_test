var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;


function saveCallback(err, kitten){
	if(err){
		console.error(err);
	}else{
		console.log(kitten.name + " age " + kitten.age + " is saved into mongodb");
	}
}

function findCallback(err, kittens){
    if(err){
        console.error(err)
    }else{
        console.log(kittens)
    }

}


db.once('open', function callback(){
	console.log('mongoose db connected')
	
	var kittySchema = mongoose.Schema({
		name: String,
		age: Number
	})

	var Kitten = mongoose.model('Kitten', kittySchema)
	
	var silence = new Kitten({name: 'Silence', age:3})

	silence.save(saveCallback);

	var fluffy = new Kitten({name:'Fluffy', age: 5})
	fluffy.save(saveCallback);

    Kitten.find({name: /^Fluff/ }, findCallback)


})

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
    });
});



