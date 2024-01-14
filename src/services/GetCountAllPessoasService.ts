import { PrismaClient } from "@prisma/client"

export default class GetCountAllPessoasService {
    private static prisma: PrismaClient

    constructor() {
        if(!this.prisma) {
            this.prisma = new PrismaClient()
        }
    }

    public async execute() {
        try {
            const countPessoas = await this.prisma.pessoa.count();

            return countPessoas
        } catch (err) {
            console.log({ err })
            return err
        }
    }
}