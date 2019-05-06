const express = require("express");
const recipeService = require("./recipe-service");

const app = express();
const port = 3000;

app.get("/api/v1/recipes", (req, res) => {
  recipeService
    .listRecipes()
    .then(
      function(data) {
          res.send(JSON.stringify(data.Items));
      },
      function(err) {
        throw err;
      }
    )
    .catch(err => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
});

app.get("/api/v1/recipes/:recipeId", (req, res) => {
  recipeService
    .getRecipe(req.params.recipeId)
    .then(
      function(recipe) {
        if (recipe && recipe.Items && recipe.Items.length > 0) {
          res.send(JSON.stringify(recipe.Items[0]));
        } else {
          res.status(404).send(`Could not find recipe ${req.params.recipeId}`);
        }
      }
    )
    .catch(err => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
});

app.listen(port);
