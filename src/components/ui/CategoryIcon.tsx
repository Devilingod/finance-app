import * as Icons from 'lucide-react';

interface CategoryIconProps {
  icon: string;
  color: string;
  size?: number;
  bg?: boolean;
}

export default function CategoryIcon({ icon, color, size = 20, bg = true }: CategoryIconProps) {
  import * as Lucide from 'lucide-react';

const LucideIcon = icon in Lucide 
  ? Lucide[icon as keyof typeof Lucide] 
  : Lucide.Circle;
  const pad = Math.round(size * 0.55);
  return (
    <div style={{
      width: size + pad * 2,
      height: size + pad * 2,
      borderRadius: bg ? '50%' : 0,
      background: bg ? `${color}22` : 'transparent',
      border: bg ? `1px solid ${color}44` : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <LucideIcon size={size} color={color} strokeWidth={1.8} />
    </div>
  );
}
