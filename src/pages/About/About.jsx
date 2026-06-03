import PageTransition from "../../compontents/PageTransition";
import "./About.css";

export default function About() {
  return (
    <PageTransition>
      <div className="about_page">
        <div className="container">
          <div className="about_hero">
            <h1>About Our Store</h1>
            <p>
              Welcome to Store, your trusted destination for premium products,
              cutting-edge technology, and exceptional shopping experiences.
            </p>
          </div>

          <div className="about_content">
            <div className="box">
              <h2>Who We Are</h2>
              <p>
                We are passionate about delivering quality products at
                competitive prices. Our mission is to make online shopping
                simple, secure, and enjoyable.
              </p>
            </div>

            <div className="box">
              <h2>Our Mission</h2>
              <p>
                To connect customers with the latest products while maintaining
                transparency, trust, and customer satisfaction.
              </p>
            </div>

            <div className="box">
              <h2>Why Choose Us?</h2>
              <ul>
                <li>Fast Delivery</li>
                <li>Secure Payments</li>
                <li>24/7 Support</li>
                <li>High Quality Products</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
