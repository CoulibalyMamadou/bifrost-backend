
export enum UserType{
  INSURER = 'Insurer',
  REINSURER = 'Reinsurer'
}

export enum QuoterType {
  QUOTER = 'QUOTER',
  FOLLOWER = 'FOLLOWER',
}

// Reinsurance type Structure
export const ReinsuranceStructureType = ['Treaty reinsurance']
export enum EnumReinsuranceType {
  TREATY
}

export enum EnumReinsuranceTypeValue {
  TREATY = 'Treaty reinsurance',
}
// End Reinsurance type Structure

// Line of business Structure

export const PropertyAndSpecialityType = [
  'Property',
  'Credit and Surety',
  'Engineering',
  'Aviation',
  'Marine',
  'Agriculture',
  'Retakaful',
  'North America Facultative',
]
export const LifeType = ['Life']
export const CasualtyType = [
  'Liability',
  'MOTOR',
  "Worker's compensation",
  'Personal accident',
  'Management and Professional Liability',
  'Cyber',
  'North America Facultative',
]
// Enum Type

export enum PropertyAndSpecialityEnumValue {
  PROPERTY = 'Property',
  CREDIT_SURETY = 'Credit and Surety',
  ENGINEERING = 'Engineering',
  AVIATION = 'Aviation',
  MARINE = 'Marine',
  AGRICULTURE = 'Agriculture',
  RETAKAFUL = 'Retakaful',
  NORTH_AMERICA_FACULTATIVE = 'North America Facultative',
}

export enum LifeTypeEnumValue {
  LIFE = 'Life',
}

export enum CasualtyEnumValue {
  LIABILITY = 'Liability',
  MOTOR = 'MOTOR',
  WORKER_COMPENSATION = "Worker's compensation",
  PERSONAL_ACCIDENT = 'Personal accident',
  MANAGEMENT_PROFESSIONAL_LIABILITY = 'Management and Professional Liability',
  CYBER = 'Cyber',
  NORTH_AMERICA_FACULTATIVE = 'North America Facultative',
}

export enum PropertyAndSpecialityEnum {
  PROPERTY,
  CREDIT_SURETY,
  ENGINEERING,
  AVIATION,
  MARINE,
  AGRICULTURE,
  NORTH_AMERICA_FACULTATIVE
}

export enum LifeTypeEnum {
  LIFE
}

export enum CasualtyEnum {
  LIABILITY,
  MOTOR,
  WORKER_COMPENSATION,
  PERSONAL_ACCIDENT,
  MANAGEMENT_PROFESSIONAL_LIABILITY,
  CYBER,
  NORTH_AMERICA_FACULTATIVE
}

// for database schema
export enum businessEnum {
  PROPERTY = 'Property',
  CREDIT_SURETY = 'Credit and Surety',
  ENGINEERING = 'Engineering',
  AVIATION = 'Aviation',
  MARINE = 'Marine',
  AGRICULTURE = 'Agriculture',
  NORTH_AMERICA_FACULTATIVE = 'North America Facultative',
  LIFE = 'Life',
  LIABILITY = 'Liability',
  MOTOR = 'MOTOR',
  WORKER_COMPENSATION = "Worker's compensation",
  PERSONAL_ACCIDENT = 'Personal accident',
  MANAGEMENT_PROFESSIONAL_LIABILITY = 'Management and Professional Liability',
  CYBER = 'Cyber',
}
// End Line of business Structure

// Risk Structure
export const RiskStructureType = ['PROPORTIONAL', 'NON_PROPORTIONAL']
export const ProportionalStructure = [
  'Quota Share',
  'Surplus',
  'Model of a fire portfolio',
  'Liability in the retention and limit of liability of the surplus',
  'Cession',
  'Summary of product features',
]
export const NonProportionalStructure = [
  'Excess of loss',
  'Stop loss',
  'Survey loss',
]
export const ExcessOfLossStructure = [
  'Loss terms',
  'Loss per risk',
  'Loss per event',
  'Accumulation loss',
]

// Enum
export enum RiskStructureTypeEnum {
  PROPORTIONAL = 'Proportional',
  NON_PROPORTIONAL = 'Non proportional',
}

export enum ProportionalStructureEnum {
  QUOTA_SHARE,
  SURPLUS
}

export enum NonProportionalStructureEnum {
  EXCESS_OF_LOSS,
  STOP_LOSS
}

export enum NonProportionalStructureValue {
  EXCESS_OF_LOSS = 'Excess of loss',
  STOP_LOSS = 'Stop loss',
}

export enum ProportionalStructureEnumValue {
  QUOTA_SHARE = 'Quota Share',
  SURPLUS = 'Surplus',
}


// for databaseSchema
// export enum StructureEnum {
//   QUOTA_SHARE = 'Quota Share',
//   SURPLUS = 'Surplus',
//   EXCESS_OF_LOSS = 'Excess of loss',
//   STOP_LOSS = 'Stop loss',
// }

export enum ExcessOfLossStructureEnum {
  LOSS_TERMS = 'Loss terms',
  LOSS_RISK = 'Loss per risk',
  LOSS_EVENT = 'Loss per event',
  LOSS_ACCUMULATION = 'Accumulation loss',
}
// End Risk Structure

// Base type Structure
export const BaseStructureType = ['Event']

export enum BaseStructureTypeEnum {
  LOSS_EVENT = 'Loss per event',
  LOSS_RISK = 'Loss per risk',
  LOSS_ACCUMULATION = 'Loss per risk',
}
// End Base type Structure

// Base type Structure
export const StatusStructureType = [
  'COMPLETE',
  'COMMUNICATION',
  'UNCOMPLETE',
  'QUOTATION',
  'QUOTED',
]

export enum StatusStructureTypeEnum {
  COMPLETE = 'COMPLETE',
  REVIEW = 'REVIEW',
  COMMUNICATION = 'COMMUNICATION',
  UN_COMPLETE = 'UNCOMPLETE',
  QUOTATION_RESTRICTED = 'QUOTATION (Quoter)',
  QUOTATION = 'QUOTATION',
  QUOTED = 'QUOTED',
}
// End Base type Structure

// Document structure
export enum DocumentTypeEnum {
  PDF = 'pdf',
  WORD = 'doc',
  EXCEL = 'xlsx',
  POWERPOINT = 'pwt',
}

export const DocumentType = ['pdf', 'doc', 'xlsx', 'pwt']

export enum DocumentExtensionEnum {
  PDF = 'pdf',
  WORD = 'doc',
  EXCEL = 'xlsx',
  POWERPOINT = 'pwt',
}

export const ProgramModifyStatus = [
  StatusStructureTypeEnum.UN_COMPLETE,
  StatusStructureTypeEnum.REVIEW,
  StatusStructureTypeEnum.COMPLETE,
  StatusStructureTypeEnum.QUOTED]

export const DocumentExtension = ['pdf', 'doc', 'xlsx', 'pwt']

export const DocumentTypeDto = {
  type: DocumentType,
  extension: DocumentExtension,
  path: String,
}
// End of document Structure

export const AddressDto = {
  address: String,
  city: String,
  country: String,
}

export const QuoterTypeDto = {
  type: QuoterType,
  description: String,
}
