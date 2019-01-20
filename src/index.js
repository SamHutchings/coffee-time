const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Welcome to Coffee Time. What kind of coffee do you want to brew?')
            .reprompt('For example, V60, French Press, Aeropress')
            .getResponse();
    },
};

exports.handler = async (event, context) => {
    skillBuilder
        .addRequestHandlers(
            LaunchRequestHandler,
        )
        .addErrorHandlers(ErrorHandler)
        .lambda();
};