-- CreateTable
CREATE TABLE "Pessoa" (
    "id" TEXT NOT NULL,
    "apelido" VARCHAR(32) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "nascimento" VARCHAR(10) NOT NULL,
    "stack" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_apelido_key" ON "Pessoa"("apelido");
