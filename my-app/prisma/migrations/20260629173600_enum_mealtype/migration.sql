/*
  Warnings:

  - You are about to drop the column `meal_type` on the `meals` table. All the data in the column will be lost.
  - Added the required column `mealType` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK');

-- AlterTable
ALTER TABLE "meals" DROP COLUMN "meal_type",
ADD COLUMN     "mealType" "MealType" NOT NULL;
