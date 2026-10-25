"use client";

import { useAppDispatch } from "@store/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSection,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../tailgrids/core/dropdown";

import { ChevronDown, CreditCard, Exit, UserCircle1 } from "@tailgrids/icons";

import { logout } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { clearWishlist } from "@store/wishlist/wishlistSlice";

interface IProps {
  name: string;
}

const ProfileMenu = ({ name }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(clearWishlist());

    navigate("/login", { replace: true });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex items-center gap-2 rounded-full! border border-base-200 bg-background-50 px-4 py-2 text-sm font-medium text-title-50 shadow-sm transition-all hover:bg-background-soft-50 focus-visible:bg-background-soft-50">
        {name}
        <ChevronDown className="size-4 text-text-200 transition-transform group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-56 min-h-30 p-1.5 bg-pink-100">
        <DropdownMenuSection>
          {/* Profile */}
          <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 hover:border-l-4 border-pink-200" onClick={() => handleNavigation("/me")}>
            <UserCircle1 className="size-5" />
            <span className="text-gray-600">Profile</span>
          </DropdownMenuItem>

          {/* Orders */}
          <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 hover:border-l-4 border-pink-200" onClick={() => handleNavigation("/me/orders")}>
            <CreditCard className="size-5" />
            <span className="text-gray-600">Orders</span>
          </DropdownMenuItem>
        </DropdownMenuSection>

        <DropdownMenuSeparator className="-mx-1.5 my-1" />

        {/* Logout */}
        <DropdownMenuItem
          className="cursor-pointer gap-2.5 py-2 text-alert-danger-button-text focus:text-alert-danger-title focus:bg-alert-danger-background hover:border-l-4 border-pink-200"
          onClick={handleLogout}
        >
          <Exit className="size-5" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
