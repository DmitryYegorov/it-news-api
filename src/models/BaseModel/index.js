const { Model } = require("objection");
const { timestampPlugin } = require("objection-timestamps");

class BaseModel extends timestampPlugin()(Model) {}

module.exports = BaseModel;
