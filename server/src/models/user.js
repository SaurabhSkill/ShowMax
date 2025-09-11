const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;
const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('email is invalid');
        }
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password should not contain word: password');
        }
      },
    },
    role: {
      type: String,
      default: 'guest',
      enum: ['guest', 'admin', 'superadmin'],
    },
    facebook: String,
    google: String,
    phone: {
      type: String,
      unique: true,
      trim: true,
      // --- VALIDATION TEMPORARILY REMOVED ---
      // validate(value) {
      //   if (!validator.isMobilePhone(value)) {
      //     throw new Error('Phone is invalid');
      //   }
      // },
    },
    imageurl: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  if (!userObject.role === 'superadmin') {
    delete userObject.updatedAt;
    delete userObject.__v;
  }
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'mySecret');
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('Unable to login');

  if (!user.isVerified) throw new Error('Please verify your email before logging in.');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Unable to login');

  return user;
};

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
