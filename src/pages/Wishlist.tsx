import Heading from "@components/common/Heading";
import Product from "@components/eCommerce/Product";
import Loading from "@components/feedback/Loading";
import LottieHandler from "@components/feedback/LottieHandler";
import useWishlist from "@hooks/useWishlist";

const Wishlist = () => {
  const { error, loading, wishlistProducts } = useWishlist();
  return (
    <Loading status={loading} error={error ?? null} skeletonFor="wishlist">
      {wishlistProducts.length > 0 ? (
        <main className="min-h-screen bg-gray-50/70">
          <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <Heading
              headTitle="Your Favorites"
              Title="My Wishlist"
              description="All the products you've saved for later."
              recordsLength={`${wishlistProducts.length} products`}
            />
            <div className="zoom-90">
              {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                  {wishlistProducts.map((product) => (
                    <Product key={product.id} {...product} isLiked={true} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="mb-3 text-5xl">♡</p>

                  <h2 className="text-xl font-bold text-gray-800">
                    Your wishlist is empty
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Explore our collection and save products you love.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
      ) : (
        <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
          <LottieHandler
            type="empty"
            message={"Your WishList is EMPTY"}
            className="w-full"
          />
        </main>
      )}
    </Loading>
  );
};

export default Wishlist;
