import { db } from "@/lib/db";
import React from "react";

const page = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name");
    const price = formData.get("price");
    const image = formData.get("image");
    const description = formData.get("description");
    const aiDetails = formData.get("aiDetails");
    await db.product.create({
      data: {
        name: name as string,
        price: parseInt(price as string),
        image: image as string,
        description: description as string,
        aiDetails: aiDetails as string,
      },
    });
  };

  return (
    <div className="container md:mt-12">
      <h1 className="text-2xl font-bold">Create Product</h1>
      <form action={handleSubmit} className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-1">
          <label htmlFor="name" className="font-medium">
            Name:
          </label>
          <input
            name="name"
            type="text"
            className="border p-2 rounded-md  block  w-full shadow-sm outline-none focus:border-slate-500  "
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="name" className="font-medium">
            Price:
          </label>
          <input
            name="price"
            type="number"
            className="border p-2 rounded-md  block  w-full shadow-sm outline-none focus:border-slate-500  "
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="name" className="font-medium">
            Image:
          </label>
          <input
            name="image"
            type="text"
            className="border p-2 rounded-md  block  w-full shadow-sm outline-none focus:border-slate-500  "
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="name" className="font-medium">
            Description:
          </label>
          <textarea
            name="description"
            className="border p-2 rounded-md  block  w-full shadow-sm outline-none focus:border-slate-500  "
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="name" className="font-medium">
            Ai Details:
          </label>
          <textarea
            name="aiDetails"
            className="border p-2 rounded-md  block  w-full shadow-sm outline-none focus:border-slate-500  "
          />
        </div>
        <div>
          <button className="bg-black text-white rounded-md py-2 px-3 text-sm font-bold">
            List Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
