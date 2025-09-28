"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false, // ⬅️ prevents server rendering
});

interface BlogData {
  _id?: string;
  date: string;
  slug: string;
  title: string;
  image?: string;
  serial?: number;
  type: string;
  metaDescription?: string;
  showHome?: string;
}

const AddBlog: React.FC = () => {
  const [formData, setFormData] = useState<BlogData>({
    date: "",
    slug: "",
    title: "",
    type: "",
    metaDescription: "",
    showHome: "true",
    image: "",
    serial: 0,
  });

  const [fileUploading, setFileUploading] = useState(false);
  const [discription, setDiscription] = useState<string | any>("");
  const editor = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<boolean>(false);
  const router = useRouter();

  // Handle form input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    try {
      setFileUploading(true);
      const res = await axios.post(
        "https://theclinicall.com/bkapi/admin/file/upload",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setFormData({ ...formData, image: res.data.data });
    } catch (error) {
      console.error("File upload error:", error);
      alert("Failed to upload file");
    } finally {
      setFileUploading(false);
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setLoading(true);
      e.preventDefault();
      let finaldata = {
        ...formData,
        description: discription,
      };
      const { data } = await axios.post("/api/blog", finaldata);
      if (data.success) {
        setStatus(true);
        setFormData({
          date: "",
          slug: "",
          title: "",
          type: "",
          metaDescription: "",
          showHome: "true",
          image: "",
          serial: 0,
        });
        setDiscription("");
        router.push("/allblog")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="xl:container xl:mx-auto  mt-9">
      <div className=" p-6  bg-white mx-auto shadow-[0px_5px_11px_8px_rgba(0,_0,_0,_0.1)] rounded">
        <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
        <div className="flex flex-col items-center justify-center p-4">
          {formData.image && (
            <img
              src={formData.image}
              alt="Uploaded"
              className="w-32 h-32 object-cover mt-2 rounded"
            />
          )}
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full"
            accept="image/*"
          />
          {fileUploading && (
            <p className="text-sm text-gray-500">Uploading file...</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <div className="w-full flex flex-col">
              <label htmlFor="Title">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
                required
              />
            </div>
            <div className="flex w-full  space-x-3">
              <div className="w-full flex flex-col">
                <label htmlFor="type">Type (A or B)</label>
                <input
                  type="text"
                  name="type"
                  placeholder="Type (A or B)"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="serial">Enter Serial</label>
                <input
                  type="number"
                  name="serial"
                  placeholder="Type (A or B)"
                  value={formData.serial}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-2 pt-3">
            <div className="w-full flex flex-col">
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                name="slug"
                placeholder="Slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </div>

          <div className="flex flex-col w-full pt-3">
            <label htmlFor="metaDescription">Meta Description</label>
            <input
              type="text"
              name="metaDescription"
              placeholder="Meta Description"
              value={formData.metaDescription}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex flex-col w-full pt-3">
            <label htmlFor="description">Description</label>
            <JoditEditor
              ref={editor}
              value={discription}
              onChange={(newContent) => setDiscription(newContent)}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? "Loading.." : "Save Blog"}
          </button>
        </form>
        {status && (
          <p className="mt-2 text-green-600 font-medium">Blog Update Success</p>
        )}
      </div>
    </section>
  );
};

export default AddBlog;
