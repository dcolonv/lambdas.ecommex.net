var AWS = require("aws-sdk")
var dynamodb =  new AWS.DynamoDB.DocumentClient()
exports.handler = function(event, context) {
  var market = event.market || {}
  var params = {
    TableName: 'EasySpread_MARKETS',
    Item: market
  }
  dynamodb.put(params, function(err, data){
    if (err) {
      context.succeed({updated: false, id: market.id, error: 'Error updating market in DB: ' + err})
    } else {
      context.succeed({updated: true, id: market.id})
    }
  })
}
