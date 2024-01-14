import { PrismaClient } from "@prisma/client"

export default class GetPessoaByIdService {
    private static prisma: PrismaClient

    constructor() {
        if(!this.prisma) {
            this.prisma = new PrismaClient()
        }
    }

    public async execute(id: string) {
        try {
            const pessoaPersisted = await this.prisma.pessoa.findUnique({
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