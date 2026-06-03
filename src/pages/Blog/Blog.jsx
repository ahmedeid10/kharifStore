import { blogs } from "../../data/blogs";
import { Link } from "react-router-dom";
import PageTransition from "../../compontents/PageTransition";
import "./Blog.css";

function Blog() {
  return (
    <PageTransition>
      <div className="blog_page">
        <div className="container">
          <h1 className="title">Our Blog</h1>
          <p className="subtitle">Latest news and articles</p>

          <div className="blog_grid">
            {blogs.map((blog) => (
              <div className="blog_card" key={blog.id}>
                <img src={blog.image} alt={blog.title} />

                <div className="blog_content">
                  <span>{blog.category}</span>

                  <h3>{blog.title}</h3>

                  <p>{blog.description}</p>

                  <div className="meta">
                    <small>{blog.author}</small>
                    <small>{blog.date}</small>
                  </div>

                  <Link to={`/blog/${blog.id}`} className="btn">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Blog;
