const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const recipeService = require("./recipe-service");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/v1/recipes", (req, res) => {
  recipeService
    .listRecipes()
    .then(
      function(data) {
        res.send(JSON.stringify(data.Items));
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
    .then(function(recipe) {
      if (recipe && recipe.Items && recipe.Items.length > 0) {
        res.send(JSON.stringify(recipe.Items[0]));
      } else {
        res.status(404).send(`Could not find recipe ${req.params.recipeId}`);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
});

app.put("/api/v1/recipes/:recipeId", (req, res) => {
  recipeService
    .updateRecipe(req.params.recipeId, req.body)
    .then(function() {
      console.log(`Succcessfully updated recipe ${req.params.recipeId}`);
      res.status(204).end();
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
});

app.post("/api/v1/recipes/", (req, res) => {
  recipeService
    .createRecipe(req.body)
    .then(res.status(200).end())
    .catch(err => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
});

app.delete("/api/v1/recipes/:recipeId", (req, res) => {
  recipeService
    .deleteRecipe(req.params.recipeId)
    .then(function() {
      console.log(`Succcessfully deleted recipe ${req.params.recipeId}`);
      res.status(200).end();
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
});

app.listen(port);
