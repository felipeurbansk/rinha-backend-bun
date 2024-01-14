import type { Pessoa } from "@prisma/client"
import type { Request, Response } from "express"
import CreatePessoaServices from "../services/CreatePessoaService"
import GetPessoaByIdService from "../services/GetPessoaByIdService"
import GetAllPessoasService from "../services/GetAllPessoasService"
import GetCountAllPessoasService from "../services/GetCountAllPessoasService"

export default class PessoaController {

    public async create(req: Request, res: Response) {
        const { apelido, nome, nascimento, stack } : Pessoa = req.body

        if( !apelido || !nome || !nascimento ) {
            return res.status(422).send()
        }

        if(typeof apelido !== 'string' || typeof nome !== 'string' || typeof nascimento !== 'string' || (stack && typeof stack !== 'object')) {
            return res.status(400).send()
        }

        if(stack) {
            stack.map(s => typeof s !== 'string' ? res.status(400).send() : true)
        }

        try {
            const createPessoaService = new CreatePessoaServices()
            const pessoaPersisted = await createPessoaService.execute({ apelido, nome, nascimento, stack }) as Pessoa

            return res.status(201).header('Location', `/pessoas/${pessoaPersisted.id}`).json(pessoaPersisted)
        } catch(err: any) {
            if(err.code === "P2002") return res.status(422).send()

            return res.status(500).json({ err })
        }

    }

    public async getById(req: Request, res: Response) {
        const { id } = req.params

        if(!id) return res.status(400).send()

        try {
            const getPessoaByIdService = new GetPessoaByIdService()
            const pessoaPersisted = await getPessoaByIdService.execute(id)

            if(!pessoaPersisted) return res.status(403).send()

            return res.status(200).json(pessoaPersisted)
        }   catch(err) {
            return res.status(500).json({ err })
        }
    }

    public async getAll(req: Request, res: Response) {
        const { t } = req.query;
        let where = {}

        if(t === '') return res.status(400).send();

        where = {
            OR: [
                {
                    apelido: {
                        contains: t
                    }
                },
                {
                    nome: {
                        contains: t
                    }
                },
                {
                    stack: {
                        has: t
                    }
                }
            ]
        }


        try {
            const getAllPessoasService = new GetAllPessoasService()
            const pessoasPersisted = await getAllPessoasService.execute(where)
    
            return res.status(200).json(pessoasPersisted);
        } catch(err) {
            return res.status(500).json({ err })
        }
    }

    public async getCountAllPessoas(req: Request, res: Response) {
        try {
            const getCountAllPessoasService = new GetCountAllPessoasService();
            const countPessoas = await getCountAllPessoasService.execute()

            return res
                    .header('Content-Type', 'text/plain')
                    .status(200)
                    .send(String(countPessoas));
        } catch(err) {
            return res.status(500).json({ err })
        }
    }
}