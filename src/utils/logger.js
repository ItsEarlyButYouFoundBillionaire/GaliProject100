const log = (message, type = "info") => {
    const timestamp = new Date().toISOString();

    if (type === "error") {
        console.error(`[${timestamp}]  ERROR: ${message}`);
    } else if (type === "warn") {
        console.warn(`[${timestamp}]  WARNING: ${message}`);
    } else {
        console.log(`[${timestamp}]  INFO: ${message}`);
    }
};

module.exports = log;
