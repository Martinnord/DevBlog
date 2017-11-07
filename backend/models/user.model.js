const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const constants = require('../config/constants')

const UserSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ['local', 'google', 'facebook'],
      required: true
    },
    local: {
      name: {
        type: String,
        required: true
      },
      username: {
        type: String,
        trim: true,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
    },
    google: {
      id: {
        type: String
      },
      email: {
        type: String,
        lowercase: true
      }
    },
    facebook: {
      id: {
        type: String
      },
      email: {
        type: String,
        lowercase: true
      }
    }
  }, {password: String},
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function(next) {
  try {
    console.log('entered')
    const user = this

    if (user.method !== 'local') {
      next()
    }

    const salt = await bcrypt.genSalt(10)
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(user.local.password, salt)
    // Re-assign hashed version over original, plain text password
    user.local.password = passwordHash
    console.log(passwordHash)
    next()
    console.log('exited')
  } catch (err) {
    next(err)
  }
})

UserSchema.methods = {
  async isValidPassword(newPassword) {
    try {
      const user = this
      return await bcrypt.compare(newPassword, user.local.password)
    } catch (err) {
      throw new Error(err)
    }
  },

  toJSON() {
    return {
      _id: this._id,
      username: this.local.username,
      email: this.local.email,
      name: this.local.name
    }
  }
}

module.exports = mongoose.model('User', UserSchema)
