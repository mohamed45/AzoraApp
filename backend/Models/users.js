const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 }
});

// Hash password before saving to DB
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Compare hashed password with plain text password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", userSchema);
