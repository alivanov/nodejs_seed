var path = require('path');
process.env = {
    NODE_ENV: 'test',
    rootFolder: path.join(__dirname, '..', '..'),
    PORT: 3001
};
