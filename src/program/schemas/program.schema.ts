import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'
import {
  BaseStructureTypeEnum,
  CasualtyEnum,
  EnumReinsuranceType,
  ExcessOfLossStructureEnum,
  LifeTypeEnum,
  NonProportionalStructureEnum,
  PropertyAndSpecialityEnum,
  ProportionalStructureEnum,
  StatusStructureTypeEnum
} from '../../constant/ObjectSchema'

export const ProgramSchema = new mongoose.Schema({
  title: String,
  type: {
    type: String,
    enum: EnumReinsuranceType,
    required: true,
  },
  // lineOfBusiness: PropertyAndSpecialityEnum ,
  lineOfBusiness: {
    type: String,
    // enum: businessEnum,
    enum: PropertyAndSpecialityEnum || CasualtyEnum || LifeTypeEnum,
    required: true,
  },
  riskStructure: {
    type: String,
    enum: NonProportionalStructureEnum || ProportionalStructureEnum,
    required: true,
  },
  structure: {
    type: String,
    enum: ExcessOfLossStructureEnum
    // required: true,
  },
  base: {
    type: String,
    enum: BaseStructureTypeEnum,
  },
  status: {
    type: String,
    enum: StatusStructureTypeEnum,
    required: true,
  },
  dateCreation: Date,
  premiumIncome: Number, // si excess of loss
  limit: Number, // si excess of loss
  communicationPeriod: {
    communicationStart: Date,
    communicationEnd: Date,
  },
  quotationPeriod: {
    quotationStart: Date,
    quotationEnd: Date,
  },
  layers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refer: 'Layer',
    },
  ],
  // insurer: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Insurer',
  // },
  office: {
    type: Schema.Types.ObjectId,
    ref: 'Office',
  },
  document: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refer: 'Document',
    },
  ],
  quoterList: {
    quoter: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refer: 'Office'
        // refer: 'Reinsurer'
      }
    ],
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refer: 'Office',
        // refer: 'Reinsurer',
      },
    ],
  },
  constraints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refer: 'Constraint'
      }
  ],
  quoteConstraint: [
    {
      office: {
        type: Schema.Types.ObjectId,
        ref: 'Office'
        // ref: 'Reinsurer'
      },
      quoteConstraint: {
        type: Schema.Types.ObjectId,
        ref: 'QuoteConstraint'
      },
      previousQuoteConstraint: {
        type: Schema.Types.ObjectId,
        ref: 'QuoteConstraint'
      }
    }
  ],
  quotation: [
    {
      office: {
        type: Schema.Types.ObjectId,
        ref: 'Office'
      },
      quotation: {
        type: Schema.Types.ObjectId,
        ref: 'Quotation'
      },
      previousQuotation: {
        type: Schema.Types.ObjectId,
        ref: 'Quotation'
      }
    }
  ]
}).method('transform', function() {
  const obj = this.toObject()
  //Rename fields
  obj.id = obj._id
  delete obj._id

  return obj
})
