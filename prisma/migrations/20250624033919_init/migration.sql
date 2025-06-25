-- CreateTable
CREATE TABLE "Pokemon" (
    "_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "pokemonPhotoUrl" TEXT,
    "type" TEXT[],
    "description" TEXT,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "maleGenderRatio" DOUBLE PRECISION,
    "femaleGenderRatio" DOUBLE PRECISION,
    "abilities" TEXT[],
    "eggGroups" TEXT[],
    "evolutionDescription" TEXT,
    "evolutionPhotoUrl" TEXT,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_number_key" ON "Pokemon"("number");

-- CreateIndex
CREATE INDEX "Pokemon_name_idx" ON "Pokemon"("name");
