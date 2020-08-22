// server/config/docs.js

const swaggerDefinition = {
  info: {
    title: 'Checklist API',
    version: '1.0.0',
    description: 'Checklist API Documentation',
  },
  basePath: '/api/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

module.exports = {
  swaggerDefinition,
};
