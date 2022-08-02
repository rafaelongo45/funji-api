/*
  Warnings:

  - A unique constraint covering the columns `[kanji]` on the table `Kanjis` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Kanjis_kanji_key" ON "Kanjis"("kanji");
