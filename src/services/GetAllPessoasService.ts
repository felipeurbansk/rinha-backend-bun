import { PrismaClient } from "@prisma/client"

export default class GetAllPessoasService {
    private static prisma: PrismaClient

    constructor() {
        if(!this.prisma) {
            this.prisma = new PrismaClient()
        }
    }

    public async execute(where: any) {
        try {
            const pessoasPersisted = await this.prisma.pessoa.findMany({ 
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