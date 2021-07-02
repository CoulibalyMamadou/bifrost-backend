export class CreateConstraintDto {
  // readonly id: string
  readonly type: string
  readonly groupOffice: {
    name: string,
    offices: Array<string>
  }
  readonly constraint: {
    type: string,
    value: number,
    target: string
  }
}

export class ConstraintSearchDto {
  _id: string
}

export class ConstraintUpdateDto {
  // name?: string
  _id?: string
  type: string
  readonly groupOffice: {
    name: string,
    offices: Array<string>
  }
  readonly constraint: {
    type: string,
    value: number,
    target: string
  }
}
