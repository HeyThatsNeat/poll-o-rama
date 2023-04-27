import mongoose from 'mongoose'

const Schema = mongoose.Schema

const responseSchema = new Schema({
    responseAnswer1: [Boolean],
    responseAnswer2: [Boolean],
    responseAnswer3: [Boolean],
    responseAnswer4: [Boolean],
    profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
    timestamps: true
})

const pollSchema = new Schema({
    question: String,
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
    answered: Boolean,
    owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
    responses: [responseSchema],
}, {
    timestamps: true,
})

const Poll = mongoose.model('Poll', pollSchema)

export {
    Poll,
}
