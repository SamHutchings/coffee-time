const methodRecipes = {
    v60: [
        { details: "Pour water, wetting all the grounds", time: 10 },
        { details: "Allow coffee to bloom", time: 50 },
        { details: "Pour the rest of the water in a circular pattern", time: 50 },
        { details: "Give the outer edge of the slurry one light stir", time: 30 },
        { details: "Move the V60 in a few circles", time: 15 },
    ],
    frenchpress: [
        { details: "Pour all the water into the press, ensuring all grounds are wet", time: 10 },
        { details: "Place plunger 1 centimetre below the surface of the coffee", time: 230 },
        { details: "Pour the rest of the water into the chamber", time: 10 },
        { details: "Stir", time: 60 },
    ],
    chemex: [
        { details: "Pour water to wet all the grounds evenly", time: 10 },
        { details: "Dig in the coffee bed", time: 25 },
        { details: "Allow coffee to bloom", time: 5 },
        { details: "Pour the rest of the water in a circular pattern", time: 30 },
        { details: "Slowly stir the outer edge of the slurry", time: 10 },
        { details: "Move the Chemex in a few circles", time: 10 },
    ],
    aeropress: [
        { details: "Pour water, wetting all the grounds", time: 10 },
        { details: "Allow coffee to bloom", time: 20 },
        { details: "Pour the rest of the water into the chamber", time: 10 },
        { details: "Stir", time: 10 },
        { details: "Place cup on top and flip aeropress", time: 30 },
        { details: "Plunge until press hisses", time: 15 },
    ]
};

exports.getRecipe = function(methodName) {
    methodName = methodName.replace(" ").toLowerCase();

    if (methodName === "cafetiere") {
        return methodRecipes["frenchpress"];
    }

    return methodRecipes[methodName];
};