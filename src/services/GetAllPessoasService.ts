import type { PrismaClient } from '@prisma/client'
import prisma from '../database/prisma'

export default class GetAllPessoasService {
    private db: PrismaClient

    constructor() {
        this.db = prisma
    }

    public async execute(where: any) {
        try {
            const pessoasPersisted = await this.db.pessoa.findMany({ 
                where,
                take: 50
             })

            return pessoasPersisted
        } catch (err) {
            console.log({ err })
            return err
        }
    }
}