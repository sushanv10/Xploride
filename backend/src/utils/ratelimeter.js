const rateLimit= require('express-rate-limit');

const limiter= rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 600, // Limit 
    message: 'Too many requests from this IP, please try again later.',
    headers: true, // Include rate limit info in response headers
});

module.exports = limiter;