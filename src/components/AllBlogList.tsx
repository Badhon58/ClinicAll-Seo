"use client";
import React, { useEffect, useState } from "react";
import { BlogData } from "./interface";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const AllBlogList = () => {
  const [allBlogs, setAllBlogs] = useState<BlogData[]>();
  const [loading, setLoading] = useState(false);
  const init = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/blog");
      setAllBlogs(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    slug: string | any
  ) => {
    try {
      e.preventDefault();
      const { data } = await axios.delete(`/api/blog/${slug}`);
      alert("Delete Succefull");
      if (data.success) {
        init();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return loading ? (
    "Loading..."
  ) : (
    <div className="xl:container xl:mx-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Blog List</h1>
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Serial</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Slug</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allBlogs &&
                allBlogs?.map((blog, index) => {
                  return (
                    <tr className="border-t" key={index}>
                      <td className="px-4 py-2">{blog.serial}</td>
                      <td className="px-4 py-2">
                        <Image
                          src={blog.image || "/default-image.png"}
                          alt={blog.title}
                          className="w-16 h-16 object-cover rounded border"
                          width={200}
                          height={200}
                        />
                      </td>
                      <td className="px-4 py-2 font-medium">
                        <Link
                          href={`/allblog/${blog.slug}`}
                          className="hover:underline"
                        >
                          {blog.title}
                        </Link>{" "}
                      </td>
                      <td className="px-4 py-2 text-blue-600">{blog.slug}</td>
                      <td className="px-4 py-2">{blog.type}</td>
                      <td className="px-4 py-2">{blog.date}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={(e) => {
                            handleDelete(e, blog.slug);
                          }}
                          className="p-2 bg-red-500 border rounded-md text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBlogList;
