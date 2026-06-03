import { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import PageTransition from "../../compontents/PageTransition";
import "./Conntact.css";
import { useState } from "react";

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);

    const name = formData.get("user_name");
    const email = formData.get("user_email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        toast.success("Message sent successfully ");
        form.current.reset();
      })
      .catch(() => {
        toast.error("Something went wrong ");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <PageTransition>
      <div className="contact">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We usually reply within 24 hours</p>

          <div className="contact_info">
            <div className="info_card">
              <h3>Email</h3>
              <p>eida24914@gmail.com</p>
            </div>

            <div className="info_card">
              <h3>Phone</h3>
              <p> 01014705548</p>
            </div>

            <div className="info_card">
              <h3>Location</h3>
              <p>Egypt, Mansoura</p>
            </div>
          </div>

          <form ref={form} onSubmit={sendEmail} className="contact_form">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
            />

            <input type="text" name="subject" placeholder="Subject" required />

            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              required
            />

            <button className="btn" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
