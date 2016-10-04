var AWS = require("aws-sdk")
var dynamodb =  new AWS.DynamoDB.DocumentClient()
exports.handler = function(event, context) {
  var country = event.country || {}
  var params = {
    TableName: 'EasySpread_COUNTRIES',
    Item: country,
    ConditionExpression: 'attribute_not_exists (id)'
  }
  dynamodb.put(params, function(err, data){
    if (err) {
      if (err.code === 'ConditionalCheckFailedException') {
        context.succeed({inserted: false, id: country.id, error: 'Country already exists'})
      } else {
        context.succeed({inserted: false, id: country.id, error: 'Error inserting country in DB: ' + err})
      }
    } else {
      context.succeed({inserted: true, id: country.id})
    }
  })
}
