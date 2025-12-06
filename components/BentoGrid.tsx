import React from "react";
import { getIcon } from "../constants";
import { ServiceItem } from "../types";

interface BentoGridProps {
  items: ServiceItem[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ items }) => {
  return (
    <div className="grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={<BentoGridHeader imageUrl={item.imageUrl} iconName={item.iconName} />}
          icon={getIcon(item.iconName, "w-5 h-5 text-accent")}
          className={item.className}
        />
      ))}
    </div>
  );
};

interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}

const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  header,
  icon,
}) => {
  return (
    <div
      className={`
        row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-sm
        bg-white border border-slate-100 justify-between flex flex-col space-y-4 p-4
        ${className}
      `}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="mb-2 p-2 w-fit rounded-lg bg-blue-50/50">{icon}</div>
        <div className="font-sans font-bold text-slate-800 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-slate-500 text-xs">
          {description}
        </div>
      </div>
    </div>
  );
};

const BentoGridHeader = ({ imageUrl, iconName }: { imageUrl?: string; iconName: string }) => {
  if (imageUrl) {
    return (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden relative">
        <img
          src={imageUrl}
          alt="Service visualization"
          className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-110 opacity-90 group-hover/bento:opacity-100"
        />
        {/* Gradient Overlay for text readability if needed, or just aesthetic sheen */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-50" />
      </div>
    );
  }

  // Fallback to Skeleton if no image is provided
  return <Skeleton iconName={iconName} />;
};

const Skeleton = ({ iconName }: { iconName: string }) => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-100/50 relative overflow-hidden group-hover/bento:border-accent/10 transition-colors">
      {/* Abstract decorative elements */}
      <div className="absolute inset-0 bg-white/50 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
      
      {/* Large faint icon in background */}
      <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover/bento:opacity-[0.08] group-hover/bento:scale-110 group-hover/bento:-rotate-12 transition-all duration-500">
        {getIcon(iconName, "w-40 h-40 text-accent")}
      </div>
      
      {/* Animated Sheen */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover/bento:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
    </div>
  );
};

export default BentoGrid;