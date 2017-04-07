const express = require('express')
const bodyParser = require('body-parser')

// Create a new instance of express
const app = express()

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {
  res.send('Hello World!')
})

// Route that receives a POST request to /webhook
app.post('/webhook', function(req, res) {
  const body = req.body
  console.log("Request body: " + body)
  console.log("Resolved Query: " + body.result.resolvedQuery)
  console.log("Action: " + body.result.action)
  const webhookResponse = buildWebhookResponse(body)
  res.set('Content-Type', 'application/json');
  return res.send(webhookResponse)
})

function buildWebhookResponse(body) {
  const action = body.result.action
  var speech
  switch(action) {
    case 'webhook.test':
      speech = "Megans webhook.test response"
      break
    default:
      speech = "Megans default response"
  }
  return {
      "speech": speech,
      "displayText": speech,
      // "data": data,
      // "contextOut": [],
      "source": "mc-test-api-ai-nodejs"
    }
}

app.listen(app.get('port'), function(err) {
  if (err) {
    throw err
  }
  console.log('Node app is running on port', app.get('port'));
})
