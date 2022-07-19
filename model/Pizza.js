// import dependencies
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//  schema set up
const PizzaSchema = new Schema({
    // name of pizza
    pizzaName: {
        type: String,
        required: true,
        trim: true
    },
    // name of user who created the pizza
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    //  time stamp when the pizza was created
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    //  the pizzas suggested size
    size: {
        type: String,
        required: true,
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
    },
    // array for toppings
    toppings: [],

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
    {
    toJSON: {
        virtuals: true,
        getters: true
        }, 
        // mongoose returns virtual so we dont need it
    id: false
});

// get total count of comments and replies on the retrieval
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.reduce(
        (total, comment) => total + comment.replies.length + 1,
        0
    );
});

// create the pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the pizza model so you can use it in other files
module.exports = Pizza;
