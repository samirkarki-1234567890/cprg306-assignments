interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="mx-auto max-w-xl bg-slate-700/80 backdrop-blur-sm text-slate-100 px-5 py-3.5 rounded-lg border border-slate-600/50 hover:bg-slate-700 hover:border-slate-500/50 transition-all duration-200 shadow-sm">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-base truncate">{name}</p>
          <p className="text-xs text-slate-400 capitalize mt-0.5">{category}</p>
        </div>
        <div className="flex-shrink-0 bg-slate-600/50 px-3 py-1.5 rounded-md">
          <p className="text-sm font-medium text-slate-200">Qty: {quantity}</p>
        </div>
      </div>
    </li>
  );
}