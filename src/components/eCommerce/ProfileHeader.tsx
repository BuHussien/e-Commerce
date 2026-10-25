interface IProps {
  user: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  };
  address: {
    detailedAddress: string;
    city: string;
    government: string;
    country: string;
  };
}
export const ProfileHeader = ({ user, address }: IProps) => {
  return (
    <div className="flex items-center space-x-3.5">
      <div className="w-14 h-14 rounded-full bg-linear-to-tr from-rose-500 to-pink-500 text-white font-bold text-xl flex items-center justify-center shadow-md shadow-rose-200 shrink-0">
        {user.firstname ? user.firstname.charAt(0).toUpperCase() : "U"}
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-bold text-slate-900">
            {user.firstname} {user.lastname}
          </h2>
          <span className="px-2 py-0.5 text-[11px] font-medium bg-rose-50 text-rose-600 border border-rose-100 rounded-full">
            Member
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Phone: {user.phone}</p>
        {address.detailedAddress && (
          <p className="text-[11px] text-slate-400 mt-0.5 capitalize">
            Address: {address.detailedAddress}, {address.city},{" "}
            {address.government}, {address.country}
          </p>
        )}
      </div>
    </div>
  );
};
