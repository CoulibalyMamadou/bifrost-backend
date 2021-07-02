import {Inject, Injectable, Logger} from '@nestjs/common'
import {Model} from 'mongoose'
import {ProgramInterface} from './interface/program.interface'
import {
    CreateProgramDto,
    PeriodDto,
    ProgramPatchConstraintDto,
    ProgramPatchDto,
    ProgramPatchLayerDto,
    programPeriodDto, ProgramQuotationDto,
    ProgramQuoteConstraintDto,
    QuoterListSetCrudDto
} from './dto/program.dto'
import {DocumentService} from '../document/document.service'
import {LayerService} from '../layer/layer.service'
import {StatusStructureTypeEnum} from '../constant/ObjectSchema'
import {InsurerService} from '../insurer/insurer.service'
import {OfficeService} from '../office/office.service'
import {addDays} from 'date-fns'
import * as fs from 'fs'
import {ConstraintService} from '../constraint/constraint.service'
import {CreateQuoteConstraintDto} from '../quoteConstraint/dto/create-quote-constraint.dto'
import {QuoteConstraintService} from '../quoteConstraint/quote-constraint.service'
import {QuoteConstraintInterface} from '../quoteConstraint/interface/quote-constraint.interface'
import {CreateQuotationDto} from '../quotation/dto/create-quotation.dto'
import {QuotationInterface} from '../quotation/interface/quotation.interface'
import {QuotationService} from '../quotation/quotation.service'
import {ReinsurerService} from '../reinsurer/reinsurer.service'
import {OfficeInterface} from '../office/interface/office.interface'

@Injectable()
export class ProgramService {
    constructor(
        @Inject('PROGRAM_MODEL')
        private programModel: Model<ProgramInterface>,
        private documentService: DocumentService,
        private layerService: LayerService,
        private constraintService: ConstraintService,
        private insurerService: InsurerService,
        private reinsurerService: ReinsurerService,
        private officeService: OfficeService,
        private quoteConstraintService: QuoteConstraintService,
        private quotationService: QuotationService
    ) {
    }

    async findAll(): Promise<ProgramInterface[]> {
        return this.programModel.find().exec()
    }

    async findAllList(): Promise<ProgramInterface[]> {
        return this.programModel
            .find(
                {},
                'title communication status insurer quotationPeriod lineOfBusiness dateCreation'
            )
            .exec()
    }

    async findAllListFill(): Promise<ProgramInterface[]> {
        return this.programModel
            .find(
                {},
                'title communication status insurer quotationPeriod lineOfBusiness dateCreation'
            )
            .populate({path: 'office', model: 'Office'})
            // .populate({path: 'insurer', model: 'Insurer'})
            .exec()
    }

    async findAllListFillByOffice(officeId: string): Promise<ProgramInterface[]> {
        return this.programModel
            .find(
                {'office': officeId},
                'title communication status insurer quotationPeriod lineOfBusiness dateCreation'
            )
            .populate({path: 'office', model: 'Office'})
            // .populate({path: 'insurer', model: 'Insurer'})
            .exec()
    }

    async findReinsurerAllProgramListFill(officeId: string): Promise<ProgramInterface[]> {
        return this.programModel
            .find(
                {$or:[
                        {'quoterList.quoter': officeId},
                        {'quoterList.follower': officeId}
                    ],
                    // "status": { "$nin": [
                    //         StatusStructureTypeEnum.UN_COMPLETE,
                    //         StatusStructureTypeEnum.REVIEW,
                    //         StatusStructureTypeEnum.COMPLETE,
                    //         StatusStructureTypeEnum.QUOTED ]
                    // }},
                    "status": { "$ne": StatusStructureTypeEnum.UN_COMPLETE } },
                // "status": { "$nin": [StatusStructureTypeEnum.UN_COMPLETE, 'user']
                'title communication status office quotationPeriod lineOfBusiness dateCreation'
            )
            .populate({path: 'office', model: 'Office'})
            .exec()
    }

    async findProgramOfficeById(_id: string): Promise<ProgramInterface> {
        return this.programModel
            .findById(_id, 'office')
            .exec()
    }

    async findProgramQuoterListById(_id: string): Promise<OfficeInterface[]> {
        const programOffice = await this.findProgramOfficeById(_id)

        return await this.officeService.findAllQuoter(programOffice.office)
    }

    async findAllFill(): Promise<ProgramInterface[]> {
        return this.programModel
            .find()
            .populate({path: 'layers', model: 'Layer'})
            .populate({path: 'document', model: 'Document'})
            .populate({path: 'office', model: 'Office'})
            .exec()
    }

    async findFillById(_id: string): Promise<ProgramInterface> {
        return this.programModel
            .findById(_id)
            .populate({path: 'layers', model: 'Layer'})
            .populate({path: 'document', model: 'Document'})
            .populate({path: 'office', model: 'Office'})
            .exec()
    }

    async findLayersFillById(_id: string): Promise<ProgramInterface> {
        return this.programModel
            .findById(_id, 'layers')
            .populate({path: 'layers', model: 'Layer'})
            .exec()
    }

    async findConstraintFillById(_id: string): Promise<ProgramInterface> {
        return this.programModel
            .findById(_id, 'constraints')
            .populate({path: 'constraints', model: 'Constraint'})
            .exec()
    }

    async findQuoterListById(_id: string): Promise<ProgramInterface> {
        return this.programModel
            .findById(_id, 'quoterList')
            .exec()
    }

    async findQuoterListFillById(_id: string): Promise<ProgramInterface> {
        return this.programModel
            .findById(_id, 'quoterList')
            .populate({
                path: 'quoterList.follower',
                model: 'Office'
            })
            .populate({
                path: 'quoterList.quoter',
                model: 'Office'
            })
            .exec()
    }

    async findById(_id: string): Promise<ProgramInterface> {
        return this.programModel.findById(_id).exec()
    }

    async findQuoteConstraintFillById(programId: string, officeId: string): Promise<ProgramInterface> {
        return this.programModel
            .findById({"_id": programId,
                "quoteConstraint.office": officeId
            }, 'quoteConstraint')
            .populate({
                path: 'quoteConstraint.quoteConstraint',
                match:{ office : officeId},
                model: 'QuoteConstraint'
            })
            .exec()
    }

    async findQuotationFillById(programId: string, officeId: string): Promise<ProgramInterface> {
        return this.programModel
            .findById({"_id": programId,
                "quotation.office": officeId
            }, 'quotation')
            .populate({
                path: 'quotation.quotation',
                model: 'Quotation'
            })
            .exec()
    }

    async getProgramStatus(programId: string, officeId: string): Promise<{ status: string, canGo: boolean  }> {
        const status = await  this.programModel
            .findById(
                programId,
                'status'
            )
            .exec()

        const canGo = await this.checkOfficeRightsOnProgram(programId, officeId, status.status)

        return {
            status: status.status,
            canGo
        }
    }

    async OfficeIsProgramQuoter(programId: string, officeId: string): Promise<boolean> {
        return this.programModel
            .exists(
                {
                    '_id': programId,
                    $or:[
                        {'quoterList.quoter': officeId},
                        {'quoterList.follower': officeId}
                    ],
                    "status": { "$nin": [
                        StatusStructureTypeEnum.UN_COMPLETE,
                        StatusStructureTypeEnum.REVIEW,
                            StatusStructureTypeEnum.COMPLETE,
                            StatusStructureTypeEnum.QUOTED ]
                    }
                }
                    // , "status": { "$ne": StatusStructureTypeEnum.UN_COMPLETE } },
            )
    }

    async OfficeIsProgramQuoterRestricted(programId: string, officeId: string): Promise<boolean> {
        return this.programModel
            .exists(
                {
                    '_id': programId,
                    'quoterList.quoter': officeId
                ,"status": { "$nin": [StatusStructureTypeEnum.UN_COMPLETE,
                            StatusStructureTypeEnum.COMPLETE,
                            StatusStructureTypeEnum.QUOTED ] }
                }
                    // , "status": { "$ne": StatusStructureTypeEnum.UN_COMPLETE } },
            )
    }

    async checkOfficeRightsOnProgram(
        programId: string,
        officeId: string,
        status: string
    ): Promise<boolean> {
        // const programStatus = await this.getProgramStatus(programId)
        // const canGo = await this.checkOfficeRightsOnProgram(programId, officeId)

        switch (status) {
            case StatusStructureTypeEnum.UN_COMPLETE:
                return false

            case StatusStructureTypeEnum.REVIEW:
                return true

            case StatusStructureTypeEnum.QUOTATION_RESTRICTED:
                return this.OfficeIsProgramQuoterRestricted(programId, officeId)

            case StatusStructureTypeEnum.QUOTATION:
                return this.OfficeIsProgramQuoter(programId, officeId)

            case StatusStructureTypeEnum.QUOTED:
                return false

            case StatusStructureTypeEnum.COMPLETE:
                return false

            case StatusStructureTypeEnum.COMMUNICATION:
                return false

            default:
                return false
        }
        // return false
    }

    /**
     * create program
     * take layers list & insurer ID
     * Pre save all layer & add at program initialization
     * Add program to insurer list program & Insurer Office program list
     * @param createProgramDto
     */
    async create(
        createProgramDto: CreateProgramDto
    ): Promise<ProgramInterface | string> {
        if (
            await this.officeService.officeCheck({_id: createProgramDto.office})
        ) {
            const {layers} = createProgramDto
            Logger.log('Logger not iterable : ', JSON.stringify(layers))
            Logger.log('Logger not iterable createProgramDto: ', JSON.stringify(createProgramDto))
            const layerList = []
            for (const layer of layers) {
                await this.layerService.create(layer)
                    .then(item => {
                            return layerList.push(item._id)
                        }
                    )
            }
            createProgramDto = {
                ...createProgramDto,
                layers: [...layerList]
            }
            const createProgramBundle = await this.createP(createProgramDto)

            Logger.log('createProgramBundle program : ', JSON.stringify('createProgramBundle'))

            const createdProgram = new this.programModel(createProgramBundle)
            /**
             * TODO : remove from insurer insert
             */
            // const insurer = await this.insurerService.addProgramToInsurer(
            //     createProgramDto.insurer,
            //     createdProgram.id
            // )
            const office = await this.officeService.addProgramToOffice(
                createProgramDto.office,
                createdProgram.id
            )
            return createdProgram.save()
        }

        Logger.log(
            "Can't created program because  office unkown : ",
            createProgramDto.office
        )
        return 'Can\'t created program because  insurer unknown '
    }


    /**
     * create program
     * take layers list & insurer ID
     * Pre save all layer & add at program initialization
     * Add program to insurer list program & Insurer Office program list
     * @param programId
     * @param programConstraintDto
     */
    async createConstraint(
        programId: string,
        programConstraintDto: ProgramPatchConstraintDto
    ): Promise<ProgramInterface | string> {

        let program
        const {constraints} = programConstraintDto
        const constraintList = []
        const init = this.initializeConstraintProgram(programId)

        for (const constraint of constraints) {
            await this.constraintService.create(constraint)
                .then(item => {
                        return constraintList.push(item._id)
                    }
                )
        }
        Logger.log('init program : ', JSON.stringify(init))
        for (const constraintID of constraintList) {
            program = await this.addConstraintToProgram(programId, constraintID)
        }

        Logger.log('createProgramBundle program : ', JSON.stringify(program))

        // Logger.log(
        //     "Can't created program because  insurer unkown : ",
        //     program.toString()
        // )
        return program
    }

    /**
     * Appropriate structure for new program
     * @param program
     */
    createP(program: CreateProgramDto) {
        program.status = StatusStructureTypeEnum.UN_COMPLETE
        program.dateCreation = new Date()
        program.communicationPeriod = {
            communicationStart: new Date(2021, 6, 5),
            communicationEnd: new Date(2021, 6, 13)
            // communicationStart: new Date(addDays(new Date(), 3)),
            // communicationEnd: new Date(addDays(new Date(), 10))
        }
        program.quotationPeriod = {
            quotationStart: new Date(2021, 6, 23),
            quotationEnd: new Date(2021, 6, 30)
            // quotationStart: new Date(addDays(new Date(), 15)),
            // quotationEnd: new Date(addDays(new Date(), 25))
        }
        return program
    }

    /**
     * Save New program creation data in file
     * @param saveProgramDto
     */
    async save(saveProgramDto: any): Promise<ProgramInterface | string> {
        fs.writeFile('program.py', JSON.stringify(saveProgramDto), function (err) {
            if (err) return console.log(err)
            Logger.log('write successful')
        })
        return 'write successful'
    }

    /**
     * Update Program field
     * @param programId
     * @param updateData
     */
    async updateProgram(
        programId: string,
        updateData: ProgramPatchDto
    ): Promise<ProgramInterface> {
        const program = this.programModel.findByIdAndUpdate(
            programId,
            {
                $set: updateData
            },
            {new: true, useFindAndModify: false}
        )

        Logger.log('Program created')
        return program
    }


    /**
     * Update Program field
     * @param programId
     * @param updateData
     */
    async updateProgramLayers(
        updateData: ProgramPatchLayerDto
    ): Promise<ProgramInterface | string | object> {
        updateData.layers.map(layer => {
            const {_id, ...layerPatch} = layer
            this.layerService.updateLayer(_id, layerPatch)
        })

        Logger.log('Program created')
        return {
            layerList: updateData.layers,
            status: 'Share placed successful '
        }
    }

    /**
     * Update Program field
     * @param programId
     * @param updateData
     */
    async updateProgramConstraint(
        updateData: ProgramPatchConstraintDto
    ): Promise<ProgramInterface | string | object> {
        updateData.constraints.map(constraint => {
            const {_id, ...constraintPatch} = constraint
            this.constraintService.updateConstraint(_id, constraintPatch)
        })

        Logger.log('Program created')
        return {
            constraint: updateData.constraints,
            status: 'Share placed successful '
        }
    }


    /**
     * Update program Period date or range
     * @param programId
     * @param field
     * @param updateData
     */
    async updatePeriodProgram(
        programId: string,
        field: programPeriodDto,
        updateData: PeriodDto
    ): Promise<ProgramInterface> {
        const program = this.programModel.findByIdAndUpdate(
            programId,
            {
                $set: {
                    field: updateData
                }
            },
            {new: true, useFindAndModify: false}
        )

        Logger.log('Program created')
        return program
    }


    // Quote constraint

    async quoteConstraintCheck(
        programId: string,
        officeId: string
    ): Promise<boolean> {
        Logger.log('id : ', programId)
        Logger.log('officeId : ', officeId)
        return this.programModel.exists({"_id": programId,
            "quoteConstraint.office": officeId
        })
    }

    async createProgramQuoteConstraint(
        officeId: string,
        programId: string,
        quoteConstraintDto: CreateQuoteConstraintDto
    ): Promise<ProgramInterface | QuoteConstraintInterface | string > {
        if (
            !(await this.quoteConstraintCheck(programId,quoteConstraintDto.office))
        ) {
            const createdQuoteConstraint = await this.quoteConstraintService.create(quoteConstraintDto)
            Logger.log('User created', JSON.stringify(createdQuoteConstraint.id))

            const officeQuoteConstraint = await this.officeService.addProgramQuoteConstraintToOffice(quoteConstraintDto.office, {
                program: quoteConstraintDto.program,
                quoteConstraint: createdQuoteConstraint.id,
                previousQuoteConstraint: null
            })

            const programQuoteConstraint = await this.addQuoteConstraintToProgram(
                quoteConstraintDto.program,
                {
                    office: quoteConstraintDto.office,
                    quoteConstraint: createdQuoteConstraint.id,
                    previousQuoteConstraint: null
                }
            )

            Logger.log(
                "quoteConstraintDto comming: ",
                JSON.stringify(programQuoteConstraint)
            )

            return programQuoteConstraint
        }
        else {
            // const program = await this.programModel.findOne({
            //     "_id": programId,
            //     'quoteConstraint.office': quoteConstraintDto.office
            // },'quoteConstraint').exec()

            const quoteConstraint = await this.quoteConstraintService.findOneById(programId, officeId)


            const createdQuoteConstraint = await this.quoteConstraintService.updateConstraint(
                quoteConstraint.id,{
                constraints: quoteConstraintDto.constraints
            })

            Logger.log(
                "program coming in game: ",
                JSON.stringify(createdQuoteConstraint)
            )

           return createdQuoteConstraint
        }
    }

    async upDateProgramQuoteConstraint(
        programId: string,
        quoteConstraintDto: CreateQuoteConstraintDto
    ): Promise<ProgramInterface | string> {
        // if (
        //     await this.quoteConstraintCheck(programId, )
        // ) {
        const createdQuoteConstraint = await this.quoteConstraintService.create(quoteConstraintDto)
        Logger.log('QuoteConstraint created', JSON.stringify(createdQuoteConstraint.id))

        const reinsurerQuoteConstraint = await this.officeService.addProgramQuoteConstraintToOffice(quoteConstraintDto.office, {
            program: quoteConstraintDto.program,
            quoteConstraint: createdQuoteConstraint.id,
            previousQuoteConstraint: null
        })
        const programQuoteConstraint = await this.addQuoteConstraintToProgram(
            quoteConstraintDto.program,
            {
                office: quoteConstraintDto.office,
                quoteConstraint: createdQuoteConstraint.id,
                previousQuoteConstraint: null
            }
        )

        Logger.log(
            "Can't created program because  office unknown : ",
            JSON.stringify(programQuoteConstraint)
        )

        return programQuoteConstraint

    }

    // Document Crud
    async addQuoteConstraintToProgram(
        programId: string,
        quoteConstraintDto: ProgramQuoteConstraintDto
    ): Promise<ProgramInterface> {
        const program = this.programModel.findByIdAndUpdate(
            programId,
            {
                $push: {
                    quoteConstraint: quoteConstraintDto
                }
            },
            {new: true, useFindAndModify: false}
        )
        // const data = createdDocument.save();
        Logger.log('Quote constraint updated successfully')
        return program
    }

    // Document Crud
    async updateQuoteConstraintToProgram(
        programId: string,
        quoteConstraintDto: ProgramQuoteConstraintDto
    ): Promise<ProgramInterface> {
        const program = this.programModel.findOneAndUpdate(
            {
                '_id': programId,
                'quoteConstraint.office': quoteConstraintDto.office
            },
            {
                $set: {
                    'quoteConstraint.$.quoteConstraint': quoteConstraintDto.quoteConstraint
                }
            },
            {new: true, useFindAndModify: false}
        )
        // const data = createdDocument.save();
        Logger.log('Quote constraint updated successfully')
        return program
    }

    // Quote constraint Crud
    async addNewQuoteConstraintToProgram(
        programId: string,
        quoteConstraintDto: ProgramQuoteConstraintDto
    ): Promise<ProgramInterface> {
        const program = this.programModel.findOneAndUpdate(
            {
                '_id': programId,
                'quoteConstraint.office': quoteConstraintDto.office
            },
            {
                $set: {
                    'quoteConstraint.$': quoteConstraintDto
                }
            },
            {new: true, useFindAndModify: false}
        )
        // const data = createdDocument.save();
        Logger.log('Quote constraint updated successfully')
        return program
    }

    // End Quote constraint


    // Quote constraint

    async quotationCheck(
        programId: string,
        officeId: string
    ): Promise<boolean> {
        Logger.log('id : ', programId)
        Logger.log('officeId : ', officeId)
        return this.programModel.exists({"_id": programId,
            "quotation.office": officeId
        })
    }

    async createProgramQuotation(
        officeId: string,
        programId: string,
        quotationDto: CreateQuotationDto
    ): Promise<ProgramInterface | QuotationInterface | string > {
        Logger.log('programId', JSON.stringify(programId))
        Logger.log('quotationDto', JSON.stringify(quotationDto))

        if (
            !(await this.quotationCheck(programId,quotationDto.office))
        ) {
            const createdQuotation = await this.quotationService.create(quotationDto)
            Logger.log('User created', JSON.stringify(createdQuotation.id))

            const reinsurerQuotation = await this.officeService.addProgramQuotationToOffice(quotationDto.office, {
                program: quotationDto.program,
                quotation: createdQuotation.id,
                previousQuotation: null
            })

            const programQuotation = await this.addQuotationToProgram(
                quotationDto.program,
                {
                    office: quotationDto.office,
                    quotation: createdQuotation.id,
                    previousQuotation: null
                }
            )

            Logger.log(
                "quotationDto coming: ",
                JSON.stringify(programQuotation)
            )

            return programQuotation
        }
        else {
            // const program = await this.programModel.findOne({"_id": programId
            // },'quotation').exec()

            const quotation = await this.quotationService.findOneById(programId, officeId)

            const createdQuotation = await this.quotationService.updateQuotation(
                quotation.id,{
                    quotations: quotationDto.quotations
                })

            Logger.log(
                "program to come: ",
                JSON.stringify(quotation)
            )
            // const createdQuotation = await this.quotationService.updateQuotation(
            //     program.quotation[0].quotation ,{
            //         quotations: quotationDto.quotations
            //     })

            // Logger.log(
            //     "program coming in game: ",
            //     JSON.stringify(program.quotation[0].office )
            // )
            return createdQuotation
        }
    }

    async upDateProgramQuotation(
        programId: string,
        quotationDto: CreateQuotationDto
    ): Promise<ProgramInterface | string> {
        // if (
        //     await this.quoteConstraintCheck(programId, )
        // ) {
        const createdQuotation = await this.quotationService.create(quotationDto)
        Logger.log('User created', JSON.stringify(createdQuotation.id))

        const reinsurerQuotation= await this.reinsurerService.addProgramQuotationToReinsurer(quotationDto.office, {
            program: quotationDto.program,
            quotation: createdQuotation.id,
            previousQuotation: null
        })
        const programQuotation = await this.addQuotationToProgram(
            quotationDto.program,
            {
                office: quotationDto.office,
                quotation: createdQuotation.id,
                previousQuotation: null
            }
        )

        Logger.log(
            "Can't created program because  office unknown : ",
            JSON.stringify(programQuotation)
        )

        return programQuotation

    }

    // Document Crud
    async addQuotationToProgram(
        programId: string,
        quotationDto: ProgramQuotationDto
    ): Promise<ProgramInterface> {
        const program = this.programModel.findByIdAndUpdate(
            programId,
            {
                $push: {
                    quotation: quotationDto
                }
            },
            {new: true, useFindAndModify: false}
        )
        // const data = createdDocument.save();
        Logger.log('Quote constraint updated successfully')
        return program
    }

    // Document Crud
    async updateQuotationToProgram(
        programId: string,
        quotationDto: ProgramQuotationDto
    ): Promise<ProgramInterface> {
        const program = this.programModel.findOneAndUpdate(
            {
                '_id': programId,
                'quotation.office': quotationDto.office
            },
            {
                $set: {
                    'quotation.$.quotation': quotationDto.quotation
                }
            },
            {new: true, useFindAndModify: false}
        )
        // const data = createdDocument.save();
        Logger.log('Quote constraint updated successfully')
        return program
    }

    // Quote constraint Crud
    async addNewQuotationToProgram(
        programId: string,
        quotationDto: ProgramQuotationDto
    ): Promise<ProgramInterface> {
        const program = this.programModel.findOneAndUpdate(
            {
                '_id': programId,
                'quotation.office': quotationDto.office
            },
            {
                $set: {
                    'quotation.$': quotationDto
                }
            },
            {new: true, useFindAndModify: false}
        )
        // const data = createdDocument.save();
        Logger.log('Quote constraint updated successfully')
        return program
    }

    // End Quote constraint



    /**
     * delete Program in table
     * @param programId
     * @param insurerId
     */
    async deleteProgram(
        programId: string,
        insurerId: string
    ): Promise<ProgramInterface | string> {
        if (await this.insurerService.insurerCheck({_id: insurerId})) {
            const program = this.programModel.findByIdAndDelete(programId)
            const insurer = await this.insurerService.deleteProgramToInsurer(
                insurerId,
                programId
            )
            const office = await this.officeService.deleteProgramToOffice(
                insurer.office,
                programId
            )
            Logger.log('Program remove ', programId)
            Logger.log('Program remove from insurer : ', insurer.id)
            Logger.log('Program added at office : ', office.name)
            return "'Program remove " + programId
        }

        Logger.log('Program deleted failed')
        return "'Program " + programId + '  unknown ' + programId
    }

    // Document Crud
    async addDocumentToProgram(
        programId: string,
        documentId: string
    ): Promise<ProgramInterface> {
        const program = this.programModel.findByIdAndUpdate(
            programId,
            {
                $push: {
                    document: documentId
                }
            },
            {new: true, useFindAndModify: false}
        )
        // const data = createdDocument.save();
        Logger.log('Program created')
        return program
    }

    async deleteDocumentToProgram(
        programId: string,
        documentId: string
    ): Promise<ProgramInterface> {
        const program = this.programModel.findByIdAndUpdate(
            programId,
            {
                $pull: {
                    document: documentId
                }
            },
            {new: true, useFindAndModify: false}
        )
        Logger.log('Document remove correctly from Program')
        const docRes = this.documentService.deleteDocument(documentId)
        Logger.log('Document remove correctly from Program')
        return program
    }

    // layer Crud
    async addLayerToProgram(
        programId: string,
        layerId: string
    ): Promise<ProgramInterface> {
        const program = this.programModel.findByIdAndUpdate(
            programId,
            {
                $push: {
                    layer: layerId
                }
            },
            {new: true, useFindAndModify: false}
        )
        return program
    }

    async deleteLayerToProgram(
        programId: string,
        layerId: string
    ): Promise<ProgramInterface> {
        const program = this.programModel.findByIdAndUpdate(
            programId,
            {
                $pull: {
                    layers: layerId
                }
            },
            {new: true, useFindAndModify: false}
        )
        // const data = createdDocument.save();
        Logger.log('Layer remove correctly from Program')
        const layRes = this.layerService.deleteLayer(layerId)
        Logger.log('Layer remove correctly from database')
        return program
    }

    // constraint Crud
    async addConstraintToProgram(
        programId: string,
        constraintId: string
    ): Promise<ProgramInterface> {
        const program = await this.programModel.findByIdAndUpdate(
            programId,
            {
                $push: {
                    constraints: constraintId
                }
            },
            {new: true, useFindAndModify: false}
        )
        return program
    }


    // constraint Crud
    async initializeConstraintProgram(
        programId: string
    ): Promise<ProgramInterface> {
        // const programConstraints = this.programModel.findById(programId)

        // Logger.log('programConstraints : ', JSON.stringify(programConstraints))


        const program = this.programModel.findByIdAndUpdate(
            programId,
            {
                $set: {
                    constraints: []
                }
            },
            {new: true, useFindAndModify: false}
        )
        return program
    }

    async deleteConstraintToProgram(
        programId: string,
        constraintId: string
    ): Promise<ProgramInterface> {
        const program = this.programModel.findByIdAndUpdate(
            programId,
            {
                $pull: {
                    constraints: constraintId
                }
            },
            {new: true, useFindAndModify: false}
        )
        // const data = createdDocument.save();
        Logger.log('Layer remove correctly from Program')
        const constraintRes = this.constraintService.deleteConstraint(constraintId)
        Logger.log('Layer remove correctly from database')
        return program
    }

    // user Crud
    async removeProgramFromInsurer(
        programId: string,
        insurerId: string
    ): Promise<ProgramInterface | string> {
        if (await this.insurerService.insurerCheck({_id: insurerId})) {
            const insurer = await this.insurerService.deleteProgramToInsurer(
                insurerId,
                programId
            )
            Logger.log('Program remove from insurer : ', insurer.id)
            return "'Program remove From insurer " + insurerId
        }
        Logger.log('Program deleted failed')
        return "'Insurer " + insurerId + '  unknown ' + programId
    }

    // user Crud
    async updateInsurerToProgram(
        programId: string,
        oldInsurerId: string,
        insurerId: string
    ): Promise<ProgramInterface> {
        const insurerOld = this.removeProgramFromInsurer(programId, oldInsurerId)
        const program = this.programModel.findByIdAndUpdate(
            programId,
            {
                $set: {
                    office: insurerId
                }
            },
            {new: true, useFindAndModify: false}
        )
        const insurer = this.insurerService.addProgramToInsurer(
            insurerId,
            programId
        )
        Logger.log('user set & update')
        return program
    }

    // user Crud
    async updateQuoterList(
        programId: string,
        quoterList: QuoterListSetCrudDto
    ): Promise<ProgramInterface> {
        const program = this.programModel.findByIdAndUpdate(
            programId,
            {
                $set: {
                    quoterList: quoterList
                }
            },
            {new: true, useFindAndModify: false}
        )
        Logger.log('quoter list set & update')
        return program
    }

}
