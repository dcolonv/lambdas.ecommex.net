var AWS = require("aws-sdk")
var dynamodb =  new AWS.DynamoDB.DocumentClient()
exports.handler = function(event, context) {
  var provider = event.provider || {}
  var params = {
    TableName: 'EasySpread_PROVIDERS',
    Item: provider,
    ConditionExpression: 'attribute_not_exists (id)'
  }
  dynamodb.put(params, function(err, data){
    if (err) {
      if (err.code === 'ConditionalCheckFailedException') {
        context.succeed({inserted: false, id: provider.id, error: 'Provider already exists'})
      } else {
        context.succeed({inserted: false, id: provider.id, error: 'Error inserting provider in DB: ' + err})
      }
    } else {
      context.succeed({inserted: true, id: provider.id})
    }
  })
}
