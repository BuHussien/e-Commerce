export interface AccountCardItem {
  title: string;
  description: string;
  badge?: string;
  onClick: () => void;
}

interface AccountCardsProps {
  cards: AccountCardItem[];
}

const AccountCards = ({ cards }: AccountCardsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
    {cards.map((card) => (
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
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{card.description}</p>
        </div>
      </button>
    ))}
  </div>
);

export default AccountCards;