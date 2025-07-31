import app from "./app.js";
import connectDB from "./config/db.js"

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
