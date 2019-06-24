'use strict';

const $firebase = require('@zenginehq/backend-firebase')();
const service = require('./src/runner');

exports.run = function(eventData) {
    if (eventData.request.method !== 'POST') {
        return eventData.response.status(404).send('Not found');
    }

    const workspaceId = eventData.request.params.workspaceId;
    const authorization = eventData.request.body.token;
    const record = eventData.request.body.record;

    // NOTE: If you are using multiple configurations uncomment tbese.
    const configId = eventData.request.query.config;
    if (!configId){
       return eventData.response.status(403).send('Config id required');
    }
    // Sanity.
    if (!workspaceId || !authorization) {
        return eventData.response.status(400).send('Request context not valid.');
    }

    // Don't let any errors slip through the cracks.
    try {
        // Load settings from firebase.
        // NOTE: If you are using multiple configurations replace with:
        return $firebase.load([workspaceId, 'settings', configId]).then(settings => {
            // Route requests to
            return service.method(workspaceId,authorization,record,settings);
        }).then(res => {
            // @TODO maybe combine multiple items into a single string if res is an array.
            return eventData.response.status(200).send(JSON.stringify(res));
        }).catch(err => {
            return eventData.response.status(400).send(makeErrMsg(err));
        });
    } catch (err) {
        // This is great for dev and harmless in production, better still rememember to comment it out.
        // @TODO check whether we have NODE_ENV set up
        console.error(err);
        return eventData.response.status(400).send(makeErrMsg(err));
    }
};

const makeErrMsg = err => {
    return typeof err === 'string' ? err : err.message || JSON.serialize(err);
};
