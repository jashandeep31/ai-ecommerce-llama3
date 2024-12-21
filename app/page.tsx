import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";

const page = async () => {
  const products = await db.product.findMany();

  return (
    <div className="container md:py-12">
      <div className="grid grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={product.id}
      className="border block rounded-md relative shadow-sm  bg-slate-200 p-2 "
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.image}
        alt=""
        className="w-full rounded  mix-blend-multiply"
      />
      <p className="font-medium border  p-1 absolute bottom-2 left-2 bg-white rounded-full px-3 text-sm">
        {product.name}
      </p>
    </Link>
  );
};

export default page;
