const { Schema, model } = require("mongoose");
const shortid = require("shortid");

const colType = (def) => {
  if (def == undefined || def == null)
    return {
      type: String,
      required: true,
    };
  return {
    type: String,
    required: true,
    default: def,
  };
};

const Urls = new Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortenUrl: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  clicks: {
    type: String,
    required: true,
    default: 0,
  },
});

module.exports = model("urls", Urls);
