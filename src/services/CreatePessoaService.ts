import { PrismaClient } from "@prisma/client"

export default class CreatePessoaService {
    private static prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    public execute(data: any) {
        try {
            const pessoaPersisted = this.prisma.pessoa.create({ data })

            return pessoaPersisted;
        } catch (err) {
            console.log({ err })
            return err
        }
    }
}