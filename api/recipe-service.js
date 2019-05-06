const AWS = require("aws-sdk");
const uuidv1 = require("uuid/v1");

AWS.config.update({ region: process.env.REGION || "eu-west-1" });

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "coffee-recipes";

exports.listRecipes = function() {
  const params = {
    TableName: TABLE_NAME
  };

  return db.scan(params).promise();
};

exports.getRecipe = function(id) {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "id=:i",
    ExpressionAttributeValues: {
      ":i": id
    }
  };

  return db.query(params).promise();
};

exports.createRecipe = function(recipe) {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: uuidv1(),
      ...recipe
    }
  };

  return db.put(params).promise();
};

exports.updateRecipe = function(id, recipe) {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    Item: {
      id,
      ...recipe
    }
  };

  return db.put(params).promise();
};

exports.deleteRecipe = function(id) {
  const params = {
    TableName: TABLE_NAME,
    Key: { id }
  };

  return db.delete(params).promise();
}
