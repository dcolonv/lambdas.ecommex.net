var AWS = require("aws-sdk")
var dynamodb =  new AWS.DynamoDB.DocumentClient()
exports.handler = function(event, context) {
  var country = event.country || {}
  var params = {
    TableName: 'EasySpread_COUNTRIES',
    Item: country
  }
  dynamodb.put(params, function(err, data){
    if (err) {
      context.succeed({updated: false, id: country.id, error: 'Error updating country in DB: ' + err})
    } else {
      context.succeed({updated: true, id: country.id})
    }
  })
}
