const amqp = require('amqplib');

async function consume(){

const connection = await amqp.connect('amqp://localhost:5672');
const channel    = await connection.createChannel();

await channel.assertQueue('jobs');


channel.consume('jobs', message =>{


	console.log(message.content.toString());


});
};

consume();
