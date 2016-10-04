//Dependencies
var DOC = require('dynamodb-doc');
var dynamodb = new DOC.DynamoDB();

exports.handler = function(event, context) {
  var params = {
    TableName: 'EasySpread_PROVIDERS'
  }

  dynamodb.scan(params, function (err, data) {
     if(err) {
        return context.fail('Unable to retrieve providers information' + err)
     }
     return context.succeed({data: data})
  })
}
