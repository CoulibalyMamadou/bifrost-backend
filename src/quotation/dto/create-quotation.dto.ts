export class CreateQuotationDto {
  // readonly id: string
  // reinsurer?: string
  office: string
  program: string
  quotations: [{
    layer: string,
    quote: [{
      quantity: number,
      price: number
    }]
  }]
}

export class QuotationSearchDto {
  _id: string
}

export class QuotationUpdateDto {
  // name?: string
  // _id?: string
  // type: string
  quotations: [{
    layer: string,
    quote: Array<{
      quantity: number,
      price: number
    }>
  }]
}
