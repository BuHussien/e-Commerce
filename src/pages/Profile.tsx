import Heading from "@components/common/Heading";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetOrders from "@store/orders/act/actGetOrders";
import actGetWishlists from "@store/wishlist/act/getWishlist";
import actGetAddress from "@store/addresses/act/actGetAddress";
import { useEffect, useState } from "react";

import { ProfileHeader } from "@components/eCommerce/ProfileHeader";
import AccountNavigationGrid from "@components/eCommerce/AccountNavigationGrid";
import SecurityModal from "@components/eCommerce/SecurityModal";
import AddressModal from "@components/eCommerce/AddressModal";

const Profile = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const ordersCount = useAppSelector((state) => state.orders.orderList.length);
  const wishlistCount = useAppSelector((state) => state.wishlist.itemsIds.length);
  const address = useAppSelector((state) => state.address);

  const [activeModal, setActiveModal] = useState<null | "security" | "address">(null);

  useEffect(() => {
    dispatch(actGetOrders());
    dispatch(actGetWishlists());
    dispatch(actGetAddress());
  }, [dispatch]);

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-rose-100">
        <Heading headTitle="Your Account" />
      </div>

      <div className="bg-white rounded-xl border border-rose-100 p-5 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <ProfileHeader
          user={{
            firstname: user?.firstname || "",
            lastname: user?.lastname || "",
            email: user?.email || "",
            phone: "+2010 8072 4045",
          }}
          address={{
            detailedAddress: address.detailedAddress,
            city: address.city,
            government: address.government,
            country: address.country,
          }}
        />
        
        <div className="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
          <div className="px-3.5 py-1.5 bg-rose-50/50 border border-rose-100 rounded-lg text-center min-w-23.75">
            <span className="block text-base font-bold text-rose-700">{ordersCount}</span>
            <span className="text-[11px] font-medium text-rose-600/80">Orders</span>
          </div>
          <div className="px-3.5 py-1.5 bg-pink-50/50 border border-pink-100 rounded-lg text-center min-w-23.75">
            <span className="block text-base font-bold text-pink-700">{wishlistCount}</span>
            <span className="text-[11px] font-medium text-pink-600/80">Wishlist</span>
          </div>
        </div>
      </div>

      <AccountNavigationGrid
        ordersCount={ordersCount}
        wishlistTotal={wishlistCount}
        openSecurityModal={() => setActiveModal("security")}
        openAddressModal={() => setActiveModal("address")}
      />

      {activeModal === "security" && <SecurityModal onClose={() => setActiveModal(null)} />}
      {activeModal === "address" && <AddressModal onClose={() => setActiveModal(null)} />}
    </div>
  );
};

export default Profile;