const {Schema} = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if ( !validator.isEmail(value) )
                throw new Error({error: 'Invalid Error Email address'})
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    phone: {
        type: String,
        required: true,
        minLength: 10,
        validate: value => {
            if ( !validator.isMobilePhone(value, 'es-MX') )
                throw new Error({error: 'Invalid Error MX Phone'})
        }
    },
    age: {
        type: Number,
        required: true,
        minLength: 3,
    },
    genre: {
        type: String,
        required: true
    },
    hobby: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
             required: true
         }
     }]
}, {
    timestamps: true,
    versionKey: false
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if ( user.isModified('password') )
        user.password = await bcrypt.hash(user.password, 8)
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({ _id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredencials = async function(email, password) {
    // Search for a user by email and password.
    const user = await User.findOne({email})
    if (!user)
        throw new Error({ error: 'Invalid login credencials' })
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch)
        throw new Error({ error: 'Invalid login credencials'})
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User;