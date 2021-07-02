import * as mongoose from 'mongoose'
import { AddressDto } from '../../constant/ObjectSchema'

export const HeadQuarterSchema = new mongoose.Schema({
  name: String,
  description: String,
  address: AddressDto,
  creditRating: String,
  office: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refer: 'Office',
    },
  ],
})
