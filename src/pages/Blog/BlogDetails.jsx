import { useParams, Link } from "react-router-dom";
import { blogs } from "../../data/blogs";
import PageTransition from "../../compontents/PageTransition";
import "./BlogDetails.css";

function BlogDetails() {
  const { id } = useParams();

  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="container">
        <h2>Blog Not Found</h2>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="blog_details">
        <div className="container">
          <img src={blog.image} alt={blog.title} />

          <div className="blog_info">
            <span>{blog.category}</span>
            <h1>{blog.title}</h1>

            <div className="meta">
              <p>By {blog.author}</p>
              <p>{blog.date}</p>
            </div>
          </div>

          <div className="content">
            <p>{blog.description}</p>

            <p>
              This is a demo blog content page. You can extend it later with
              full rich text, markdown or CMS data.
            </p>
          </div>

          <Link to="/blog" className="btn">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}

export default BlogDetails;
