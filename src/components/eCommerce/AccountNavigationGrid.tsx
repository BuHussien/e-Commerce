import { useNavigate } from "react-router-dom";

interface IProps {
  ordersCount: number;
  wishlistTotal: number;
  openSecurityModal: () => void;
  openAddressModal: () => void;
}

const AccountNavigationGrid = ({ openAddressModal, openSecurityModal, ordersCount, wishlistTotal }: IProps) => {
  const navigate = useNavigate();
  const accountCards = [
    {
      title: "Your Orders",
      description: "Track, return, or buy items again",
      badge: `${ordersCount} Orders`,
      onClick: () => navigate("orders"),
    },
    {
      title: "Your Wishlist",
      description: "View, edit, and add saved items to cart",
      badge: `${wishlistTotal} Items`,
      onClick: () => navigate("/wishlist"),
    },
    {
      title: "Login & Security",
      description: "Edit name and password credentials",
      onClick: openSecurityModal,
    },
    {
      title: "Your Addresses",
      description: "Edit addresses and delivery preferences",
      onClick: openAddressModal,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
      {accountCards.map((card) => (
        <button
          type="button"
          key={card.title}
          onClick={card.onClick}
          className="text-left bg-white p-4 rounded-xl border border-slate-200/80 hover:border-rose-400 hover:shadow-sm transition cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-rose-600 transition">
                {card.title}
              </h3>
              {card.badge && (
                <span className="text-[10px] font-medium text-rose-600 bg-rose-50 border border-rose-100/60 px-2 py-0.5 rounded-full shrink-0">
                  {card.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {card.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AccountNavigationGrid;