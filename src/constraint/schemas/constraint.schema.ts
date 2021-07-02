import * as mongoose from 'mongoose'

export const ConstraintSchema = new mongoose.Schema({
    // name: String,
    type: {
        type: String
    },
    groupOffice: {
        name: {
            type: String
        },
        offices: [
            {
                type: mongoose.Schema.Types.ObjectId,
                refer: 'Office',
            }]
    },
    constraint: {
        type: {
            type: String
        },
        value: {
            type: Number
        },
        target: {
            type: String
        }
    }
})
