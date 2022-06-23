const create = require('./create').create;
const list = require('./list').list;
const remove = require('./remove').remove;
const update = require('./update').update;
const updateSettings = require('./updateSettings').updateSettings;

module.exports = { create, list, remove, update, updateSettings };
