var AWS = require("aws-sdk")
var dynamodb =  new AWS.DynamoDB.DocumentClient()
exports.handler = function(event, context) {
  var category = event.category || {}
  var params = {
    TableName: 'EasySpread_CATEGORIES',
    Item: category
  }
  dynamodb.put(params, function(err, data){
    if (err) {
      context.succeed({updated: false, id: category.id, error: 'Error updating category in DB: ' + err})
    } else {
      context.succeed({updated: true, id: category.id})
    }
  })
}
