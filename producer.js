const amqp = require('amqplib');
const app  = require('express')();

const input = process.argv[2];

async function connect(input){

	const connection = await amqp.connect('amqp://localhost:5672');
	const channel    = await connection.createChannel();
	await channel.assertQueue("jobs");
	await channel.sendToQueue("jobs", Buffer.from(JSON.stringify({number:input})));
	console.log("message send");

	await channel.close();
	await connection.close();


}

const bp = require('body-parser');
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.post('/post', (req,res)=>{



	const data = req.body;
	console.log(data);
	connect(data);
	res.send(JSON.stringify(data));

});


app.listen(5000);





