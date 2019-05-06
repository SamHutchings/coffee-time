const Alexa = require('ask-sdk-core');
const Recipes = require('./recipe-service');

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
    async handle(handlerInput) {
        let method = handlerInput.requestEnvelope.request.intent.slots.method;

        console.log(`Brew request received for ${method.value}`);

        let recipe = await Recipes.getRecipe(method.value);

        if (!recipe) {
            console.log(`Could not find recipe ${method.value}`);

            return handlerInput.responseBuilder
                .speak(`Sorry, we couldn't find a recipe for ${method.value}. Please try another method.`)
                .getResponse();
        }

        await callDirectiveService(handlerInput, recipe.setup);

        for (let index = 0; index < recipe.method.length; index++) {
            await callDirectiveService(handlerInput, recipe.method[index].details);
            await sleep(recipe.method[index].time);
        }

        return handlerInput.responseBuilder
            .speak(`Enjoy your ${method.value} coffee!`)
            .getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);
        console.log(`Error handled: ${error}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const SessionEndedHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        BrewIntentHandler,
        SessionEndedHandler
    )
    .addErrorHandlers(ErrorHandler)
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();

function callDirectiveService(handlerInput, message) {
    const directiveServiceClient = handlerInput.serviceClientFactory.getDirectiveServiceClient();

    const requestId = handlerInput.requestEnvelope.request.requestId;
    const endpoint = handlerInput.requestEnvelope.context.System.apiEndpoint;
    const token = handlerInput.requestEnvelope.context.System.apiAccessToken;

    const directive = {
        header: {
            requestId,
        },
        directive: {
            type: 'VoicePlayer.Speak',
            speech: message,
        },
    };

    return directiveServiceClient.enqueue(directive, endpoint, token);
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}