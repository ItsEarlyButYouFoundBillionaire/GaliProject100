// // src/app.js
// const express = require("express");
// const cors = require("cors");
// const errorMiddleware = require("./middleware/error.middleware");
//
// const app = express();
//
// // Middleware
// app.use(cors());
// app.use(express.json());
//
// // Routes
// app.use("/api/admin", require("./routes/admin.routes"));
// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/customers", require("./routes/customer.routes"));
// app.use("/api/delivery", require("./routes/delivery.routes"));
// app.use("/api/location", require("./routes/location.routes"));
// app.use("/api/onboarding", require("./routes/onboarding.routes"));
// app.use("/api/orders", require("./routes/order.routes"));
// app.use("/api/vendors", require("./routes/vendor.routes"));
//
// // Error middleware (must be last)
// app.use(errorMiddleware);
//
// module.exports = app;
const express = require("express");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/customer", require("./routes/customer.routes"));
app.use("/api/delivery", require("./routes/delivery.routes"));
app.use("/api/location", require("./routes/location.routes"));
app.use("/api/onboarding", require("./routes/onboarding.routes"));
app.use("/api/order", require("./routes/order.routes"));
app.use("/api/vendor", require("./routes/vendor.routes"));

// Error Middleware (must be last)
app.use(errorMiddleware);

module.exports = app;
