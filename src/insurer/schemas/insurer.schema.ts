import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
import {Schema} from 'mongoose'

export const InsurerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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
    office: {
        type: Schema.Types.ObjectId,
        ref: 'HeadQuarter',
        required: true
    },
    program: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Program'
        }
    ]
    // programQuoteConstraints: [
    //     {
    //       program: {
    //           type: Schema.Types.ObjectId,
    //           ref: 'Program'
    //       },
    //       quoteConstraint: {
    //           type: Schema.Types.ObjectId,
    //           ref: 'QuoteConstraint'
    //       },
    //       previousQuoteConstraint: {
    //           type: Schema.Types.ObjectId,
    //           ref: 'QuoteConstraint'
    //       }
    //     }
    // ],
    // programQuotations: [
    //     {
    //       program: {
    //           type: Schema.Types.ObjectId,
    //           ref: 'Program'
    //       },
    //       quotation: {
    //           type: Schema.Types.ObjectId,
    //           ref: 'QuoteConstraint'
    //       },
    //       previousQuotation: {
    //           type: Schema.Types.ObjectId,
    //           ref: 'QuoteConstraint'
    //       }
    //     }
    // ]
})

InsurerSchema.methods.checkPassword = function(attempt, callback){
    // const user = this
    // bcrypt.compare(attempt, user.password, (err, isMatch) => {
    //     if(err) return callback(err);
    //     callback(null, isMatch);
    // })
    callback(null, true)
}