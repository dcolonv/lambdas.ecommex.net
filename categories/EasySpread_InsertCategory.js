var AWS = require("aws-sdk")
var dynamodb =  new AWS.DynamoDB.DocumentClient()
exports.handler = function(event, context) {
  var category = event.category || {}
  var params = {
    TableName: 'EasySpread_CATEGORIES',
    Item: category,
    ConditionExpression: 'attribute_not_exists (id)'
  }
  dynamodb.put(params, function(err, data){
    if (err) {
      if (err.code === 'ConditionalCheckFailedException') {
        context.succeed({inserted: false, id: category.id, error: 'Category already exists'})
      } else {
        context.succeed({inserted: false, id: category.id, error: 'Error inserting category in DB: ' + err})
      }
    } else {
      context.succeed({inserted: true, id: category.id})
    }
  })
}
