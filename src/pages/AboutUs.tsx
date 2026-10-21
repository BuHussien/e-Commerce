export const AboutUs = () => {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-700 via-rose-600 to-pink-500 px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl">
          <span className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wider">
            ABOUT NOOR
          </span>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            More Than Shopping.
            <span className="mt-2 block text-pink-200">It's Your Style.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
            At NOOR, we believe shopping should be simple, inspiring, and
            enjoyable. We bring together products you'll love and an experience
            you can trust.
          </p>

          <a
            href="/"
            className="no-underline! mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-rose-600 transition hover:bg-pink-100"
          >
            Explore Our Store
            <span aria-hidden="true">→</span>
          </a>
          <aside className="absolute bottom-5 right-5">
            <img
              src="/nono.png"
              width={250}
              height={250}
              alt="NOOR Logo"
              className="brightness-110 opacity-90 transition duration-300 hover:opacity-100 hover:brightness-125"
            />
          </aside>
        </div>

        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-1/3 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />
      </section>

      {/* Our Story */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
        <div>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-rose-600">
            Our Story
          </span>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
            A Better Way to
            <span className="text-blue-700"> Shop Online</span>
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            NOOR was created with one simple idea: make finding the right
            products easier. We want every visit to feel effortless, every
            purchase to feel worthwhile, and every customer to feel valued.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            From discovering something new to receiving an order, we're here to
            make your shopping experience better at every step.
          </p>
        </div>

        <div className="relative">
          <div className="rounded-3xl bg-linear-to-br from-blue-100 via-pink-100 to-rose-100 p-8 md:p-12">
            <div className="rounded-2xl bg-white p-8 text-center shadow-lg shadow-rose-900/5">
              <span className="text-5xl font-black tracking-widest text-blue-700">
                NOOR
              </span>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-linear-to-r from-blue-600 via-rose-600 to-pink-500" />
              <p className="mt-5 text-lg font-semibold text-gray-700">
                Your everyday shopping destination.
              </p>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-3 rounded-xl bg-rose-600 px-5 py-3 font-bold text-white shadow-lg">
            Made for You
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-50 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-rose-600">
              What Matters to Us
            </span>

            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
              The NOOR Difference
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Everything we do is guided by the things that matter most to our
              customers.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-2xl border border-blue-100 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                ✦
              </div>
              <h3 className="text-xl font-bold text-blue-700">Quality First</h3>
              <p className="mt-3 leading-7 text-gray-600">
                We aim to offer products that bring value and make everyday life
                a little better.
              </p>
            </article>

            <article className="rounded-2xl border border-rose-100 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-900/5">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-2xl">
                ♡
              </div>
              <h3 className="text-xl font-bold text-rose-600">
                Customers Matter
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Your experience comes first. We want every step of your shopping
                journey to feel easy and reliable.
              </p>
            </article>

            <article className="rounded-2xl border border-pink-100 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-900/5 sm:col-span-2 lg:col-span-1">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-2xl">
                ✨
              </div>
              <h3 className="text-xl font-bold text-pink-600">
                Simple & Modern
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                A clean, convenient shopping experience designed to help you
                find what you need without the hassle.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-linear-to-r from-blue-700 via-rose-600 to-pink-500 px-6 py-12 text-center text-white md:px-12 md:py-16">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Ready to Find Something You Love?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/85">
            Discover products picked with your everyday needs in mind. Your next
            favorite find could be just one click away.
          </p>

          <a
            href="/"
            className="no-underline! mt-7 inline-flex rounded-lg bg-white px-7 py-3 font-bold text-blue-700 transition hover:bg-pink-100"
          >
            Start Shopping
          </a>
        </div>
      </section>
    </main>
  );
};
