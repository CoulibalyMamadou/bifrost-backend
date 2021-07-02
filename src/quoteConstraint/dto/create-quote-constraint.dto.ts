export class CreateQuoteConstraintDto {
  // readonly id: string
  // insurer: string
  office: string
  program: string
  constraints: Array<{
    type: string,
    value: number,
    target: string
  }>
}

export class QuoteConstraintSearchDto {
  _id: string
}

export class QuoteConstraintUpdateDto {
  // name?: string
  // _id?: string
  // type: string
  constraints: Array<{
    type: string,
    value: number,
    target: string
  }>
}
