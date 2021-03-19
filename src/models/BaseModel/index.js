const { compose, Model } = require("objection");
const { timestampPlugin } = require("objection-timestamps");
const visibilityPlugin = require("objection-visibility").default;

const timestamp = timestampPlugin({
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});
const mixins = compose(timestamp, visibilityPlugin);
class BaseModel extends mixins(Model) {
  static get timestamp() {
    return true;
  }
}
module.exports = BaseModel;
