import type { PrismaClient } from '@prisma/client';
import prisma from '../database/prisma'

export default class CreatePessoaService {
    private db: PrismaClient

    constructor() {
        this.db = prisma
    }

    public execute(data: any) {
        try {
            const pessoaPersisted = this.db.pessoa.create({ data })

            return pessoaPersisted;
        } catch (err) {
            console.log({ err })
            return err
        }
    }
}