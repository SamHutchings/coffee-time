const AWS = require("aws-sdk");

exports.getRecipe = async function(name) {
    AWS.config.update({ region: 'eu-west-1' });

    const db = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: "coffee-recipes",
        IndexName: "recipeName-index",
        KeyConditionExpression: "recipeName=:n",
        ExpressionAttributeValues: {
            ":n": name,
        }
    };

    let recipe = await db.query(params).promise();

    if (recipe && recipe.Items.length > 0){
        return recipe.Items[0];
    }
    return null;
};