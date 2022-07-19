const router = require("express").Router();

// import functionality
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controllers')

//  set up all get and post at /api/pizzas
router
    .route("/")
    .get(getAllPizza)
    .post(createPizza);

//  set up GET one, PUT and DELETE at /api/pizzas/:id
router
    .route("/:id")
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);

module.exports = router;
