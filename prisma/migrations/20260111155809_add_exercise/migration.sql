-- CreateTable
CREATE TABLE "exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "muscles" "MuscleGroup"[],
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProgramToExercise" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProgramToExercise_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "exercise_userId_idx" ON "exercise"("userId");

-- CreateIndex
CREATE INDEX "_ProgramToExercise_B_index" ON "_ProgramToExercise"("B");

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgramToExercise" ADD CONSTRAINT "_ProgramToExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgramToExercise" ADD CONSTRAINT "_ProgramToExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
