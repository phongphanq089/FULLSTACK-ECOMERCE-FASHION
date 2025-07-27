/*
  Warnings:

  - Added the required column `smallStrip` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "smallStrip" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "costPrice" DOUBLE PRECISION,
ADD COLUMN     "discountPercent" DOUBLE PRECISION,
ADD COLUMN     "originalPrice" DOUBLE PRECISION,
ADD COLUMN     "profit" DOUBLE PRECISION,
ADD COLUMN     "profitMargin" DOUBLE PRECISION;
