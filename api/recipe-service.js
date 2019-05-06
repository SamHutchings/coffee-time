const AWS = require("aws-sdk");
const uuidv1 = require("uuid/v1");

AWS.config.update({ region: "eu-west-1" });

const db = new AWS.DynamoDB.DocumentClient();
const tableName = "coffee-recipes";

exports.listRecipes = function() {
  const params = {
    TableName: tableName,
  };

  return db.scan(params).promise();
};

exports.getRecipe = function(id) {
  const params = {
    TableName: tableName,
    KeyConditionExpression: "id=:i",
    ExpressionAttributeValues: {
      ":i": id
    }
  };

  return db.query(params).promise();
};

exports.createRecipe = function(recipe) {
  const params = {
    TableName: tableName,
    Item: {
      id: uuidv1(),
      ...recipe
    }
  };

  return db.put(params).promise();
};

exports.updateRecipe = async function(recipe) {
  const params = {
    TableName: tableName,
    Item: {
      ...recipe
    }
  };

  return db.update(params).promise();
};
