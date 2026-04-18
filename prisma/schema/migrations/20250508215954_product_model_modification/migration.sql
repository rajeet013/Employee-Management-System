/*
  Warnings:

  - You are about to drop the column `image_source` on the `ProductImage` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "inventory" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "image_source",
ADD COLUMN     "image_url" TEXT NOT NULL;
