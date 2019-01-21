const Alexa = require('ask-sdk-core');
const Methods = require('./methods');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Welcome to Coffee Time. What kind of coffee do you want to brew? For example, say brew Aeropress coffee')
            .reprompt('What would you like to brew? For example V60, French Press, Aeropress')
            .getResponse();
    },
};

const BrewIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'BrewIntent';
    },
    handle(handlerInput) {
        console.log(`Brew request received for ${method.value}`);

        var method = handlerInput.requestEnvelope.request.intent.slots.method;

        // todo: get data based on value and start the thing 

        return handlerInput.responseBuilder
            .speak(`You have selected ${method.value}. Good choice!`)
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

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        BrewIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();