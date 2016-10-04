var AWS = require("aws-sdk")
var dynamodb =  new AWS.DynamoDB.DocumentClient()
exports.handler = function(event, context) {
  var market = event.market || {}
  var params = {
    TableName: 'EasySpread_MARKETS',
    Item: market,
    ConditionExpression: 'attribute_not_exists (id)'
  }
  dynamodb.put(params, function(err, data){
    if (err) {
      if (err.code === 'ConditionalCheckFailedException') {
        context.succeed({inserted: false, id: market.id, error: 'Market already exists'})
      } else {
        context.succeed({inserted: false, id: market.id, error: 'Error inserting market in DB: ' + err})
      }
    } else {
      context.succeed({inserted: true, id: market.id})
    }
  })
}
