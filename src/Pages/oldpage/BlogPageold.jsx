import { useState } from "react";
import BlogForm from "../components/BlogForm";
import BlogList from "./BlogListold";

const BlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
  };

  const handleSave = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold p-4">Manage Blogs</h1>
      <BlogForm currentBlog={selectedBlog} onSave={handleSave} reset={() => setSelectedBlog(null)} />
      <BlogList onEdit={handleEdit} />
    </div>
  );
};

export default BlogPage;
