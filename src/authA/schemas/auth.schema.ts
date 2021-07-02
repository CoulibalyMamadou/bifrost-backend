import * as mongoose from 'mongoose'
import {Schema} from 'mongoose'
import {UserType} from '../../constant/ObjectSchema'

export const AuthSchema = new mongoose.Schema({
    userId:
        {
            type: Schema.Types.ObjectId,
            refPath: 'userType'
        },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: UserType
        // required: true,
    }
})
