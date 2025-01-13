const logger = require('./logger');

class ErrorHandler {
  static handle(error, context = '') {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    };

    logger.error('Application error', errorInfo);

    // Check error type
    if (error.code === 'ECONNREFUSED') {
      logger.warn('Connection refused - service may be down', { context });
      return { retry: true, delay: 5000 };
    }

    if (error.response?.status === 429) {
      logger.warn('Rate limit hit', { context });
      return { retry: true, delay: 60000 };
    }

    return { retry: false };
  }

  static async withRetry(fn, maxRetries = 3, context = '') {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        const result = this.handle(error, context);
        
        if (!result.retry || i === maxRetries - 1) {
          throw error;
        }
        
        logger.info(`Retrying after ${result.delay}ms`, { attempt: i + 1, context });
        await new Promise(resolve => setTimeout(resolve, result.delay));
      }
    }
    
    throw lastError;
  }
}

module.exports = ErrorHandler;