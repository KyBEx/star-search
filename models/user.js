const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
      type: String,
      lowercase: true
  },
  lastName: {
      type: String,
      lowercase: true
  },
  email: String,
  url: String,
  bio: String
});

userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return res.status(500).send(err);
    user.password = hash;
    next();
  })
})

userSchema.methods.checkPassword = function(passwordAttempt, callback) {
  const user = this;
  bcrypt.compare(passwordAttempt, user.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  })
}

userSchema.methods.withoutPassword = function() {
  const user = this.toObject();
  delete user.password;
  return user;
}

module.exports = mongoose.model("User", userSchema);
