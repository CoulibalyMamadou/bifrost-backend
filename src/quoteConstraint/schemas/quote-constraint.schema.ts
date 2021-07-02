import * as mongoose from 'mongoose'
import {Schema} from 'mongoose'

export const QuoteConstraintSchema = new mongoose.Schema({
    // name: String,
    // insurer: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Insurer',
    //     required: true,
    // },
    office: {
        type: Schema.Types.ObjectId,
        ref: 'Office',
        required: true,
    },
    program: {
        type: Schema.Types.ObjectId,
        ref: 'Program',
        required: true,
    },
    constraints:[{
        type: {
            type: String
        },
        value: {
            type: Number
        },
        target: {
            type: String
        }
    } ]

})
