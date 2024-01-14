import type { PrismaClient } from '@prisma/client';
import prisma from '../database/prisma'

export default class GetCountAllPessoasService {
    private db: PrismaClient

    constructor() {
        this.db = prisma
    }

    public async execute() {
        try {
            const countPessoas = await this.db.pessoa.count();

            return countPessoas
        } catch (err) {
            console.log({ err })
            return err
        }
    }
}