const { Model } = require("objection");
const { timestampPlugin } = require("objection-timestamps");
const visibilityPlugin = require("objection-visibility").default;

class BaseModel extends timestampPlugin()(visibilityPlugin(Model)) {}

module.exports = BaseModel;
