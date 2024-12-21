import ChatArea from "@/components/chat-area";
import { db } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const product = await db.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    return (
      <div className="container py-6">
        <p className="text-2xl font-bold">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container py-6 grid grid-cols-2 gap-12">
      <div>
        <Link
          href={"/"}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-black duration-300"
        >
          <ArrowLeft size={14} /> Back
        </Link>
        <div className="mt-6">
          <div className="bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt=""
              className="rounded-md max-w-[500px] mx-auto mix-blend-multiply"
            />
          </div>
          <div className="mt-4">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-lg font-medium text-slate-700 text-leading-6">
              {product.description}
            </p>

            <h3 className="mt-6 text-2xl font-bold">${product.price}</h3>
          </div>
        </div>
      </div>
      <ChatArea id={id} />
    </div>
  );
};

export default page;
