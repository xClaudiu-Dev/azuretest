const mongoose = require('mongoose');
const News = require('./models/news'); // Ensure this path matches the location of your News model file

// Environment variable for your MongoDB connection string (set in local.settings.json for local development)
const mongoConnectionString = process.env.MONGO_URI;

// A reusable mongoose connection function
const connectToDatabase = async () => {
    // Check if mongoose is not already connected
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
};

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request to get all news items.');

    // Ensure the database connection is established
    await connectToDatabase();

    try {
        // Fetch all news items from the database
        const newsItems = await News.find({});

        // Send the fetched news items as the response
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: newsItems
        };
    } catch (error) {
        // Handle any errors that occur during the fetch operation
        context.res = {
            status: 500, // Internal Server Error
            body: "Failed to fetch news items. Error: " + error.message
        };
    }
};
