import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  polls: [{ type: Schema.Types.ObjectId, ref: 'Poll' }],
}, {
  timestamps: true
})
// console.log(JSON.stringify(profileSchema, null, 2));

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
