import Alexa from 'ask-sdk-core';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Welcome to Coffee Time. What kind of coffee do you want to brew?')
            .reprompt('For example V60, French Press, Aeropress')
            .getResponse();
    },
};

const BrewIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
            && request.intent.name === 'CouchPotatoIntent';
    },
    handle(handlerInput) {
        var method = handlerInput.requestEnvelope.request.intent.slots.method;

        return handlerInput.responseBuilder
            .speak(`You have selected ${method}. Good choice!`)
            .getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },

}

exports.handler = async (event, context) => {
    skillBuilder
        .addRequestHandlers(
            LaunchRequestHandler,
            BrewIntentHandler
        )
        .addErrorHandlers(ErrorHandler)
        .lambda();
};