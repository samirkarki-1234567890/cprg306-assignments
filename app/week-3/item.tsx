interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="flex justify-between items-center bg-slate-800 text-slate-100 p-4 rounded-lg shadow">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-slate-400 capitalize">{category}</p>
      </div>
      <span className="text-lg font-bold">{quantity}</span>
    </li>
  );
}
