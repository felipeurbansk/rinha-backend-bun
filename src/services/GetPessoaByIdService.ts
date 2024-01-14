import type { PrismaClient } from '@prisma/client'
import prisma from '../database/prisma'

export default class GetPessoaByIdService {
    private db: PrismaClient

    constructor() {
        this.db = prisma
    }

    public async execute(id: string) {
        try {
            const pessoaPersisted = await this.db.pessoa.findUnique({
                where: {
                    id
                }
            })

            return pessoaPersisted
        } catch (err) {
            console.log({ err })
            return err
        }
    }
}