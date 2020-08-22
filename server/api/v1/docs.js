// server/api/v1/docs.js

const swaggerJSDoc = require('swagger-jsdoc');
const merge = require('lodash/merge');

const { swaggerDefinition } = require.main.require('./server/config/docs');

// Override default definition
const localDefinition = {
  info: {
    version: '1.0.0',
  },
  basePath: '/api/v1',
};

const options = {
  swaggerDefinition: merge(swaggerDefinition, localDefinition),
  apis: ['./server/api/v1/tasks/routes.js'],
};

module.exports = swaggerJSDoc(options);
