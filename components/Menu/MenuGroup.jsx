import MenuRow from "@/components/Menu/MenuRow";

export default function MenuGroup({ items }) {
  return (
    <div>
      {items.map((item) => (
        <MenuRow key={`${item.name}-${item.price ?? item.note}`} item={item} />
      ))}
    </div>
  );
}
