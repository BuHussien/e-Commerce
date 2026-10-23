"use client";

import { useAppDispatch } from "@store/hooks";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSection, DropdownMenuSeparator, DropdownMenuTrigger } from "../tailgrids/core/dropdown";
import { ChevronDown, CreditCard, Exit, UserCircle1 } from "@tailgrids/icons";
import { logout } from "@store/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";



interface IProps{
  name: string;
}

const ProfileMenu = ({name}: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = async () =>{
    await dispatch(logout())
    navigate('/login');
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex items-center gap-2 rounded-full! border border-base-200 bg-background-50 px-4 py-2 text-sm font-medium text-title-50 shadow-sm transition-all hover:bg-background-soft-50 focus-visible:bg-background-soft-50">
        {name}
        <ChevronDown className="size-4 text-text-200 transition-transform group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 min-h-30 p-1.5">
        <DropdownMenuSection>
          <DropdownMenuItem className="cursor-pointer gap-2.5 py-2">
            <UserCircle1 className="size-5" />
            <Link to={"/profile"}>My Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer gap-2.5 py-2">
            <CreditCard className="size-5" />
            <Link to={"/orders"}>Orders</Link>
          </DropdownMenuItem>
        </DropdownMenuSection>
        <DropdownMenuSeparator className="-mx-1.5 my-1" />
        <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 text-alert-danger-button-text focus:text-alert-danger-title focus:bg-alert-danger-background" onClick={handleLogout}>
          <Exit className="size-5" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default ProfileMenu;
