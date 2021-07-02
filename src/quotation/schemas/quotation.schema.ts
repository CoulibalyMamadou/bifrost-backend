import * as mongoose from 'mongoose'
import {Schema} from 'mongoose'

export const QuotationSchema = new mongoose.Schema({
    // name: String,
    // insurer: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Insurer',
    //     required: true
    // },
    office: {
        type: Schema.Types.ObjectId,
        ref: 'Office',
        required: true
    },
    program: {
        type: Schema.Types.ObjectId,
        ref: 'Program',
        required: true
    },
    quotations: [
        {
            layer: {
                type: Schema.Types.ObjectId,
                ref: 'Layer'
            },
            quote: [{
                quantity: {
                    type: Number
                },
                price: {
                    type: Number
                }
            }]
        }
    ]

})
