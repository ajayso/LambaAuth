console.log('Loading function');

// dependencies
var AWS = require('aws-sdk');
var crypto = require('crypto');
var config = require('./config.json');

// Get reference to AWS clients
var dynamodb = new AWS.DynamoDB();


function getStorageSetting(DeploymentName, fn) {
	dynamodb.getItem({
		TableName: config.STORAGE_SETTINGS_TABLE,
		Key: {
			DeploymentName: {
				S: DeploymentName
			}
		}
	}, function(err, data) {
		if (err) return fn(err);
		else {
				fn(null, data);
			}
		}
	});
}

exports.handler = function(event, context) {
	var DeploymentName = event.DeploymentName;
	var Type = event.Type;
	

	getStorageSetting(DeploymentName, function(err, data) {
		if (err) {
			context.fail('Error in getStorageSetting: ' + err);
		}
		else {
			console.log('Storage Setting Found...: ' + data);
			context.succeed(null,data)
			
		}
	});
}
