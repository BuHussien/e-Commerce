import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      type: "email",
      title: "Email Us",
      value: "support@example.com",
      description:
        "Send us an email anytime. We usually reply within 24 hours.",
      href: "mailto:support@example.com",
    },
    {
      type: "phone",
      title: "Call Us",
      value: "+20 100 000 0000",
      description: "Mon-Thu from 9am to 5pm.",
      href: "tel:+201000000000",
    },
    {
      type: "location",
      title: "Our Location",
      value: "Cairo, Egypt",
      description: "Serving customers near and far.",
    },
    {
      type: "hours",
      title: "Working Hours",
      value: "Sunday – Thursday",
      description: "9:00 AM – 5:00 PM (EEST)",
    },
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case "email":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        );
      case "phone":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        );
      case "location":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );
      case "hours":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased relative selection:bg-pink-500 selection:text-white">
      {/* Dynamic Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/40 blur-[100px]" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-rose-200/30 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <header className="relative z-10 border-b border-slate-200/70 bg-white/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 text-pink-600 border border-pink-500/20 shadow-xs backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              <span className="text-xs font-semibold tracking-wide uppercase">
                We're here for you
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Let's start a{" "}
              <span className="bg-linear-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                conversation.
              </span>
            </h1>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium max-w-xl">
              Have a question about a product or an order? Send us a message and
              our dedicated team will get back to you shortly.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Info Cards (Left Column) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="text-pink-600 text-xs font-extrabold tracking-widest uppercase mb-2 block">
                Contact Information
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Reach out directly
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mt-2">
                Choose your preferred way to contact us. We are always ready to
                assist you.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {contactInfo.map((item) => {
                const CardWrapper = item.href ? "a" : "div";
                return (
                  <CardWrapper
                    key={item.title}
                    href={item.href}
                    className={`group relative flex items-start gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm transition-all duration-300 ${
                      item.href
                        ? "hover:border-pink-300 hover:shadow-xl hover:shadow-pink-500/5 hover:-translate-y-1 cursor-pointer"
                        : ""
                    }`}
                  >
                    <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-pink-50 to-rose-50 text-pink-600 border border-pink-100 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-black transition-all duration-300">
                      {renderIcon(item.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900">
                          {item.title}
                        </h3>
                        {item.href && (
                          <svg
                            className="w-4 h-4 text-slate-300 group-hover:text-pink-600 group-hover:translate-x-0.5 transition-all"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                      </div>
                      <p className="text-pink-600 font-bold text-sm tracking-tight mt-0.5 wrap-break-word">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs text-slate-500 leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          </div>

          {/* Contact Form Container (Right Column) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            {/* Soft decorative glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/50 rounded-bl-full pointer-events-none" />

            {isSubmitted ? (
              <div className="py-16 text-center flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Message Sent!
                </h3>
                <p className="text-slate-600 text-sm max-w-md">
                  Thank you for contacting us. We have received your query and
                  will reply to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6 relative">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Send us a message
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the details below and we'll get back to you
                    promptly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Full Name <span className="text-pink-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="rounded-xl bg-slate-50/80 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 focus:bg-white transition-all shadow-xs"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Email Address <span className="text-pink-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="rounded-xl bg-slate-50/80 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 focus:bg-white transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Subject <span className="text-pink-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                      className="rounded-xl bg-slate-50/80 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 focus:bg-white transition-all shadow-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Message <span className="text-pink-600">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      rows={5}
                      required
                      className="rounded-xl bg-slate-50/80 border border-slate-200 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 focus:bg-white transition-all shadow-xs resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-linear-to-r from-rose-700 to-rose-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transform active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.5.5 0 0 0-.64-.64l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                          <path d="m21.854 2.147-10.94 10.939" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
