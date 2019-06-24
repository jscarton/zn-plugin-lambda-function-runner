'use strict';

const AWS = require('aws-sdk');

const credentials = require("./config.json")

/**
 * Does something awesome.
 *
 * @param {number} formId
 * @param {number} recordId
 * @param {Object} settings
 *
 * @return {Promise<*>}
 */
module.exports.method = async function (workspaceId, auth, record, settings) {
	// you shouldn't hardcode your keys in production! See http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html
	AWS.config.update({accessKeyId: credentials.awsKey, secretAccessKey: credentials.awsSecret, region:credentials.awsRegion});

	var lambda = new AWS.Lambda();

	var Payload ={
		workspace: {id: workspaceId},
	  	authorization: auth, 
	  	params:settings
	};
	//remove unused params from the payload
	delete Payload.params.enabled;
	delete Payload.params.name;
	delete Payload.params.btnIcon;
	delete Payload.params.btnLabel;

	if (record) {
		Payload.params.record = record;
	}
	var params = {
	  FunctionName: settings.lambdaFunctionName, /* required */
	  Payload: JSON.stringify(Payload)
	};
	
	return lambda.invoke(params).promise()
			.then( result => {
				var payload = JSON.parse(result.Payload);
				if (!record) {
					return {status:"OK", payload,"targetFormId":settings.targetFormId};
				} else {
					return {status:"OK", payload,"targetFormId":settings.targetFormId, "targetRecordId":record};
				}
			})
			.catch (err => {
				return {status:"ERROR", err, stack: err.stack}
			});
};
