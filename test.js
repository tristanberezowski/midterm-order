// # TO INSTALL TWILIO

// ## npm install twilio


const twilio = require('twilio');
const accountSid = 'AC00a4b43fa33d38e988101427f710d8ee'; // Your Account SID from www.twilio.com/console
const authToken = 'c7ddf7090ebf04a597f74545d2f06b76'; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

client.messages.create({

    body: 'THE MESSAGE WE WANT TO SEND',
    to: '7788839717', // NUMBER WE WANT TO TEXT
    from: '+16042393009' // THIS IS OUR TWILIO SERVER NUMBER

  })
  .then((message) => console.log(message.sid));

//node yourFile.js to test
