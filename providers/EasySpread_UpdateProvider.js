var AWS = require("aws-sdk")
var dynamodb =  new AWS.DynamoDB.DocumentClient()
exports.handler = function(event, context) {
  var provider = event.provider || {}
  var params = {
    TableName: 'EasySpread_PROVIDERS',
    Item: provider
  }
  dynamodb.put(params, function(err, data){
    if (err) {
      context.succeed({updated: false, id: provider.id, error: 'Error updating provider in DB: ' + err})
    } else {
      context.succeed({updated: true, id: provider.id})
    }
  })
}
