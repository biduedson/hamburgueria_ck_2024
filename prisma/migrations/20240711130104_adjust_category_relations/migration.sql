/*
  Warnings:

  - You are about to drop the `_CategoryToRestaurant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToRestaurant" DROP CONSTRAINT "_CategoryToRestaurant_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToRestaurant" DROP CONSTRAINT "_CategoryToRestaurant_B_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "restaurantId" TEXT;

-- DropTable
DROP TABLE "_CategoryToRestaurant";

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
