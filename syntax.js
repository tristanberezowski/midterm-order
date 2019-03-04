knex()
.select('phone')
.from('customers')
.where({id: req
.params.id})
.then(dbResults => {
  [{phone: '12345'}]
  if (dbResults.length) {
  client.messages.create({
        body: 'Your food will be ready in pick_up_time minutes',
        to: dbResults[0].phone, // PHONE NUMBER PROVIDED BY DB, can use function?
        from: '+16042393009' // this is our Twilio server number
      })
  }
})

    .then((message) => console.log(message.sid));