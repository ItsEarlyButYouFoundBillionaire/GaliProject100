// // src/server.js
// const app = require("./app");
// const connectDB = require("./config/db");
// const { PORT } = require("./config/env");
//
// // Connect Database
// connectDB();
//
// // Start Server
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const { PORT } = require("./config/env");

// Connect to DB
connectDB();

// Create server
const server = http.createServer(app);

// Start listening
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
