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
              <span>Ranchi, JH, India</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#ff6467] p-3 rounded-full">
                <MdPhone className="text-white text-xl" />
              </div>
              <span>+91 6204812279</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#ff6467] p-3 rounded-full">
                <MdEmail className="text-white text-xl" />
              </div>
              <span>thesatishydv@gmail.com</span>
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
            src="https://maps.google.com/maps?q=Ranchi,+Jharkhand,+India&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-75 border-0"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
