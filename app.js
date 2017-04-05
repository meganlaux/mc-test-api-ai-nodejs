const express = require('express')
const bodyParser = require('body-parser')

// Create a new instance of express
const app = express()

app.set('port', (process.env.PORT || 5000));

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', function(req, res) {
  res.send('Hello World!')
})

// Route that receives a POST request to /webhook
app.post('/webhook', function(req, res) {
  const body = req.body.Body
  console.log("You sent " + body + " to Express")
})

app.listen(app.get('port'), function(err) {
  if (err) {
    throw err
  }
  console.log('Node app is running on port', app.get('port'));
})
