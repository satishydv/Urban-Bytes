import React, { useState } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { toast } from "react-toastify";
import { BACK_END_API } from "../Constants";

export default function ContactPage() {
  const [Loading, setLoading] = useState(false);
  const [IsSubmitted] = useState(
    localStorage.getItem("AlreadyMSG") ??
      JSON.parse(localStorage.getItem("AlreadyMSG")),
  );
  console.log(IsSubmitted);
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FormData.email || !FormData.name || !FormData.message) {
      toast.error("Please provide All Fields");
    }

    if (FormData.email == IsSubmitted) {
      toast.error("This email already Exist");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${BACK_END_API}/api/dm/create`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem("AlreadyMSG", data.data.email);
        toast.success(`${data.data.name}! thanks for Message.Please wait`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-black text-gray-200">
      {/* Hero */}
      <section
        className="h-65 flex flex-col items-center justify-center text-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1552566626-52f8b828add9')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <h1 className="relative text-4xl font-bold text-white">Contact Us</h1>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left Info */}
        <div>
          <h2 className="text-3xl font-semibold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-400 mb-6">
            Have questions or want to reserve a table? Reach out to us and we
            will get back to you quickly.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#ff6467] p-3 rounded-full">
                <MdLocationOn className="text-white text-xl" />
              </div>
              <span> Punjab, Pakistan 🇵🇰</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#ff6467] p-3 rounded-full">
                <MdPhone className="text-white text-xl" />
              </div>
              <span>+92343 456 7890</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#ff6467] p-3 rounded-full">
                <MdEmail className="text-white text-xl" />
              </div>
              <span>contact@urbanbites.com</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8 rounded-lg">
          <h3 className="text-xl text-white mb-4">Send Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full rounded-3xl px-4 py-2 bg-black border border-gray-700 outline-none focus:border-[#ff6467]"
            />

            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-3xl bg-black border border-gray-700 outline-none focus:border-[#ff6467]"
            />

            <textarea
              rows="4"
              onChange={handleChange}
              name="message"
              placeholder="Your Message"
              className="w-full px-4 py-2 rounded-3xl bg-black border border-gray-700 outline-none focus:border-[#ff6467]"
            ></textarea>

            <div className="w-full flexCenter">
              <button
                disabled={Loading}
                type="submit"
                className="bg-[#ff6467] w-fit px-6 py-2 text-white rounded-full hover:opacity-90 transition"
              >
                {Loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Map */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <div className="rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d32250.473131757262!2d72.76477032656831!3d31.827351131468014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x39222b6aa65966cf%3A0x608a786760cb55ff!2sPunjab%20Pizza%20Club%2C%20RRF2%2BGHF%2C%20Lalian%2C%20Pakistan!3m2!1d31.823806899999997!2d72.8014869!4m5!1s0x39222b6aa65966cf%3A0x608a786760cb55ff!2sPunjab%20Pizza%20Club%2C%20RRF2%2BGHF%2C%20Lalian%2C%20Pakistan!3m2!1d31.823806899999997!2d72.8014869!5e0!3m2!1sen!2s!4v1776926369317!5m2!1sen!2s"
            className="w-full h-75 border-0"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
