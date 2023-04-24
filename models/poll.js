import mongoose from 'mongoose'

const Schema = mongoose.Schema

const responseSchema = new Schema({
    responseText: String,
    profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
    timestamps: true
})

const pollSchema = new Schema({
    name: String,
    answered: Boolean,
    owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
    pollQuestion: String,
    responses: [responseSchema],
}, {
    timestamps: true,
})

const Poll = mongoose.model('Poll', pollSchema)

export {
    Poll
}
