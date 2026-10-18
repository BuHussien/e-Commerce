import Logo from "@assets/svg/cart.svg?react";
import { getTotalCartQntSelector } from "@store/cart/cartSelectors";
import { useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import "@styles/global.css"
const HeaderBasket = () => {
  const qnt = useAppSelector(getTotalCartQntSelector);
  const [pump, setPump] = useState(false);

  useEffect(() => {
    if(!qnt) return;
    setPump(true);
    const timeout = setTimeout(() => {
      setPump(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [qnt]);
  return (
    <div className="relative cursor-pointer transition-transform duration-200 hover:scale-110 flex items-center">
      <Logo title="basket icon" className="w-7 h-7 fill-current" />
      <div
        key={qnt}
        className={`absolute -top-2 -right-2 bg-rose-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${
          pump ? "animate-cart-badge" : ""
        }`}
      >
        {qnt}
      </div>
    </div>
  );
};

export default HeaderBasket;
