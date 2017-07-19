/**
 * Created by chenkang1 on 2017/7/18.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect(
  "mongodb://127.0.0.1/node_club_dev",
  { server: { poolSize: 4 } },
  function(err) {
    if (err) {
      logger.error("connect to %s error: ", config.db, err.message);
      process.exit(1);
    }

    console.log("mongooDB connected!");
  }
);

var UserSchema = new Schema({
  name: { type: String },
  loginname: { type: String },
  pass: { type: String },
  email: { type: String },
  url: { type: String },
  profile_image_url: { type: String },
  location: { type: String },
  signature: { type: String },
  profile: { type: String },
  weibo: { type: String },
  avatar: { type: String },
  githubId: { type: String },
  githubUsername: { type: String },
  githubAccessToken: { type: String },
  is_block: { type: Boolean, default: false },

  score: { type: Number, default: 0 },
  topic_count: { type: Number, default: 0 },
  reply_count: { type: Number, default: 0 },
  follower_count: { type: Number, default: 0 },
  following_count: { type: Number, default: 0 },
  collect_tag_count: { type: Number, default: 0 },
  collect_topic_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  is_star: { type: Boolean },
  level: { type: String },
  active: { type: Boolean, default: false },

  receive_reply_mail: { type: Boolean, default: false },
  receive_at_mail: { type: Boolean, default: false },
  from_wp: { type: Boolean },

  retrieve_time: { type: Number },
  retrieve_key: { type: String },

  accessToken: { type: String }
});

let user = mongoose.model("User", UserSchema);

// let user = mongoose.model("User");

user.count({}, (err, result) => {
  console.log(result);
});
