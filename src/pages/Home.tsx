import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Heading from "@components/common/Heading";
import Product from "@components/eCommerce/Product";
import Loading from "@components/feedback/Loading";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetCategories } from "@store/categories/atc/actGetCategories";
import actGetAllProducts from "@store/products/act/actGetAllProducts";

export const Home = () => {
  const dispatch = useAppDispatch();

  const { records: categories, loading: categoriesLoading } = useAppSelector(
    (state) => state.categories,
  );
  const { records: products, loading: productsLoading } = useAppSelector(
    (state) => state.products,
  );
  const wishlistItemsIds = useAppSelector((state) => state.wishlist.itemsIds);
  const isUserAccess = Boolean(
    useAppSelector((state) => state.auth.accessToken),
  );

  useEffect(() => {
    dispatch(actGetCategories());
    dispatch(actGetAllProducts({ page: 1, limit: 8 }));
  }, [dispatch]);

  // Pick 4 random categories stably per categories change
  const randomCategories = useMemo(() => {
    if (!categories.length) return [];
    return [...categories].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [categories]);

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20 space-y-16 lg:space-y-24">
      {/* ================= HERO SECTION ================= */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-pink-600 via-rose-500 to-purple-700 shadow-2xl">
          {/* Subtle Background Shapes */}
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-pink-400/20 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-8 p-8 sm:p-12 lg:grid-cols-12 lg:p-16">
            <div className="space-y-6 lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Limited Time Offers — Up to 50% Off
              </span>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl leading-[1.15]">
                Upgrade Your Everyday Lifestyle.
              </h1>
              <p className="max-w-xl text-base font-normal text-pink-100 sm:text-lg">
                Discover top-rated products curated specifically for modern
                living. Enjoy premium quality, fast shipping, and unbeatable
                prices.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="rounded-2xl bg-white px-8 py-4 text-sm font-bold text-pink-600 shadow-lg hover:bg-gray-50 hover:shadow-pink-900/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Shop Now
                </Link>
                <Link
                  to="/categories"
                  className="rounded-2xl bg-white/10 border border-white/20 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-all"
                >
                  Explore Categories
                </Link>
              </div>
            </div>

            {/* Featured Product Preview Card / Image */}
            <div className="relative hidden lg:col-span-5 lg:block">
              <div className="relative mx-auto max-w-sm rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
                  alt="Featured Hero Product"
                  className="h-80 w-full rounded-xl object-cover shadow-md"
                />
                <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-xl text-gray-900">
                  <p className="text-xs font-bold text-pink-600 uppercase tracking-wide">
                    Top Trending
                  </p>
                  <p className="text-sm font-black">Minimalist Smartwatch</p>
                  <p className="text-xs text-gray-500">
                    $199.00{" "}
                    <span className="line-through text-gray-400">$299.00</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES / TRUST BADGES ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:grid-cols-4 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold sm:text-sm text-gray-900">
                Quality Guaranteed
              </h4>
              <p className="text-[11px] text-gray-500">Handpicked top items</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold sm:text-sm text-gray-900">
                Free Express Shipping
              </h4>
              <p className="text-[11px] text-gray-500">On orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold sm:text-sm text-gray-900">
                Secure Payments
              </h4>
              <p className="text-[11px] text-gray-500">
                100% Protected Checkouts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold sm:text-sm text-gray-900">
                30 Days Returns
              </h4>
              <p className="text-[11px] text-gray-500">Money back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <Heading
            headTitle="Browse by category"
            Title="Shop Categories"
            description="Explore our wide variety of collections"
          />
          <Link
            to="/categories"
            className="group flex items-center gap-1 text-xs font-bold sm:text-sm text-pink-600 hover:text-pink-700 transition-colors"
          >
            View All
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        <Loading
          status={categoriesLoading}
          skeletonFor="categories"
          error={null}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {randomCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?cat_prefix=${cat.prefix}`}
                className="group relative flex flex-col items-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-pink-200 transition-all text-center"
              >
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50 p-2 group-hover:bg-pink-50 group-hover:scale-110 transition-all">
                  <img
                    src={
                      cat.img ||
                      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80"
                    }
                    alt={cat.title}
                    className="h-14 w-14 object-contain"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                  {cat.title}
                </h3>
              </Link>
            ))}
          </div>
        </Loading>
      </section>

      {/* ================= PROMOTIONAL BANNERS ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Banner 1 */}
          <div className="relative group overflow-hidden rounded-3xl bg-gray-900 p-8 text-white flex flex-col justify-between min-h-70 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80"
              alt="New Arrivals"
              className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="relative z-10 space-y-2">
              <span className="inline-block rounded-md bg-pink-600/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white tracking-widest uppercase">
                New Arrivals
              </span>
              <h2 className="text-3xl font-extrabold">Trending Collection</h2>
              <p className="text-xs text-gray-200 max-w-xs">
                Handpicked fashion and style items for this season.
              </p>
            </div>
            <div className="relative z-10 pt-4">
              <Link
                to="/products"
                className="inline-block rounded-xl bg-white px-6 py-3 text-xs font-bold text-gray-900 hover:bg-pink-600 hover:text-white transition-all shadow-md"
              >
                Explore Trending
              </Link>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative group overflow-hidden rounded-3xl bg-purple-900 p-8 text-white flex flex-col justify-between min-h-70 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
              alt="Best Sellers"
              className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="relative z-10 space-y-2">
              <span className="inline-block rounded-md bg-purple-600/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white tracking-widest uppercase">
                Special Offer
              </span>
              <h2 className="text-3xl font-extrabold">Best Sellers</h2>
              <p className="text-xs text-gray-200 max-w-xs">
                Discover top customer choices and tech accessories.
              </p>
            </div>
            <div className="relative z-10 pt-4">
              <Link
                to="/products"
                className="inline-block rounded-xl bg-white px-6 py-3 text-xs font-bold text-gray-900 hover:bg-purple-600 hover:text-white transition-all shadow-md"
              >
                Shop Best Sellers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS SECTION ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <Heading
            headTitle="Handpicked for you"
            Title="Featured Products"
            description="Our newest and most popular items available now"
          />
          <Link
            to="/products"
            className="group flex items-center gap-1 text-xs font-bold sm:text-sm text-pink-600 hover:text-pink-700 transition-colors"
          >
            Explore All
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        <Loading status={productsLoading} skeletonFor="products" error={null}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.slice(0, 8).map((record) => (
              <Product
                key={record.id}
                {...record}
                isUserAccess={isUserAccess}
                isLiked={wishlistItemsIds.includes(record.id)}
              />
            ))}
          </div>
        </Loading>
      </section>

      {/* ================= NEWSLETTER / CTA SECTION ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-8 sm:p-12 lg:p-16 text-center text-white shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
            alt="Newsletter background"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="relative z-10 mx-auto max-w-2xl space-y-4">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Join Our VIP Shopping Club
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              Subscribe to get special discounts, free giveaway alerts, and
              early access to new seasonal collections!
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-xl bg-white/10 px-4 py-3.5 text-sm text-white placeholder-gray-400 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 rounded-xl bg-pink-600 px-6 py-3.5 text-xs font-bold text-white hover:bg-pink-700 transition-colors shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
