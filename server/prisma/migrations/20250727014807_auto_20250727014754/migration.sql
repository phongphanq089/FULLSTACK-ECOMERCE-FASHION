-- CreateTable
CREATE TABLE "ProductInfoSection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProductInfoSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductInfoSection_productId_idx" ON "ProductInfoSection"("productId");

-- AddForeignKey
ALTER TABLE "ProductInfoSection" ADD CONSTRAINT "ProductInfoSection_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
