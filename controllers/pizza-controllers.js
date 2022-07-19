// ---- FILE FOR PIZZA FUNCTIONALITY --------

const { Pizza } = require('../model');

const pizzaController = {
    //  the functions go in here as methods

    //  get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({
                path: 'comments',
                // - sign to let mongoose know not to return __v field
                select: '-__v'
            })
            // also dont include it in the query
            .select('-__v')
            // sort in descending order by id
            .sort({_id: -1})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //  get one pizza
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create a pizza
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // update a pizza by id
    updatePizza({ params, body }, res) {
        // needs third param of true otherwise will return original
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(404).json(err));
    },

    // delete pizza by id
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }

};

module.exports = pizzaController;