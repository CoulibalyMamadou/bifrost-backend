import * as mongoose from 'mongoose'

export const UsersSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  organization: String,
  firstName: String,
})

// UsersSchema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
// });
