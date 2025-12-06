import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { cn } from "../lib/utils";
import { getIcon } from "../constants";

// --- Minimal UI Components Inline ---

const Badge = ({ className, variant = "default", children }: { className?: string, variant?: string, children?: React.ReactNode }) => {
  const variants: Record<string, string> = {
    default: "border-transparent bg-accent text-white hover:bg-accent/80",
    secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline: "text-slate-900 border border-slate-200",
    completed: "bg-green-100 text-green-700 border border-green-200",
    "in-progress": "bg-blue-100 text-blue-700 border border-blue-200",
    pending: "bg-slate-100 text-slate-500 border border-slate-200",
  };
  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant] || variants.default, className)}>
      {children}
    </div>
  );
};

const Card = ({ className, children, ...props }: any) => (
  <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)} {...props}>{children}</div>
);

// --- Types ---

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  iconName: string;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending" | string;
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [radius, setRadius] = useState<number>(220);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Center is fixed relative to container
  const centerOffset = { x: 0, y: 0 };
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Handle Responsive Radius
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setRadius(mobile ? 140 : 220);
    };
    
    // Initial call
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      // Close others immediately
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        // OPENING
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        // CLOSING
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: any;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.2) % 360; 
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    // Calculate angle to bring this node to the top (270 degrees)
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const currentRadius = radius; 
    const radian = (angle * Math.PI) / 180;

    const x = currentRadius * Math.cos(radian) + centerOffset.x;
    const y = currentRadius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.sin(radian)); 
    const opacity = 0.5 + 0.5 * ((1 + Math.sin(radian))/2); 

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  return (
    <div
      className="w-full h-[500px] md:h-[700px] flex flex-col items-center justify-center bg-white relative overflow-hidden select-none"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Background Gradients - Richer Blue */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-gradient-radial from-blue-100/40 via-transparent to-transparent opacity-70 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-4xl h-full flex items-center justify-center perspective-1000">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Central Core - Spicy Electric Look */}
          <div className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-400 animate-pulse-slow flex items-center justify-center z-10 shadow-[0_0_40px_rgba(26,115,232,0.6)] ring-2 ring-white ring-offset-4 ring-offset-blue-50">
             {/* Inner Core Pulse */}
            <div className="absolute w-full h-full rounded-full border border-white/50 animate-ping opacity-20"></div>
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner">
                 <Zap className="text-white w-4 h-4 md:w-6 md:h-6 drop-shadow-md" fill="currentColor" />
            </div>
          </div>

          {/* Orbit Ring */}
          <div 
            className="absolute rounded-full border border-blue-200/40 shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300"
            style={{ width: radius * 2, height: radius * 2 }}
          ></div>
          {/* Moving Dashed Ring - More Visible */}
          <div 
            className="absolute rounded-full border-2 border-dashed border-accent/60 opacity-80 animate-spin-slow transition-all duration-300" 
            style={{ animationDuration: '40s', width: (radius * 2) + 2, height: (radius * 2) + 2 }}
          ></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px) scale(${isExpanded ? 1.25 : 1})`,
              zIndex: isExpanded ? 50 : position.zIndex,
              opacity: isExpanded ? 1 : Math.max(0.4, position.opacity),
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-300 ease-out cursor-pointer flex items-center justify-center"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Energy Field - Reacts to pulse */}
                <div
                  className={`absolute rounded-full -inset-6 transition-all duration-300 ${
                    isPulsing ? "animate-pulse opacity-100 scale-110" : "opacity-0 scale-90"
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)`,
                  }}
                ></div>

                {/* Node Circle */}
                <div
                  className={`
                  w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center
                  shadow-xl transition-all duration-200 transform
                  ${
                    isExpanded
                      ? "bg-accent text-white shadow-accent/50 ring-4 ring-blue-100"
                      : isRelated
                      ? "bg-white text-accent border-2 border-accent shadow-accent/20"
                      : "bg-white text-slate-400 border border-slate-200 hover:border-accent hover:text-accent hover:scale-110 hover:shadow-lg hover:shadow-blue-200"
                  }
                `}
                >
                  {getIcon(item.iconName, `w-5 h-5 md:w-6 md:h-6 ${isExpanded ? "text-white" : "currentColor"} transition-colors duration-200`)}
                </div>

                {/* Expanded Card - Optimized for Speed */}
                {isExpanded && (
                  <Card 
                    className={`
                      absolute top-16 md:top-24 left-1/2 -translate-x-1/2 
                      w-72 md:w-80 bg-white/95 backdrop-blur-xl border-accent/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] 
                      overflow-hidden text-left z-[100] animate-in fade-in zoom-in-95 duration-200
                    `}
                  >
                    {/* Top decoration */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-accent"></div>
                    
                    <div className="p-5 md:p-6">
                      <div className="flex justify-between items-center mb-3">
                        <Badge variant="default" className="bg-blue-50 text-accent border border-blue-100 px-2.5 py-1 text-[10px] uppercase tracking-wider">
                            {item.category}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-extrabold text-slate-800 mb-1 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm font-bold text-accent mb-3 flex items-center gap-2">
                        <Zap className="w-3 h-3 fill-current" /> {item.date}
                      </p>
                      
                      <p className="text-xs text-slate-600 leading-relaxed mb-5 font-medium">
                        {item.content}
                      </p>

                      <div className="pt-4 border-t border-slate-100">
                        <div className="flex justify-between items-center text-xs mb-2">
                          <span className="flex items-center text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                            Impact Score
                          </span>
                          <span className="font-mono text-accent font-black text-sm">{item.energy}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-accent shadow-[0_0_10px_rgba(26,115,232,0.5)]"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-100">
                          <div className="flex items-center mb-2">
                            <Link size={12} className="text-slate-400 mr-1.5" />
                            <h4 className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                              Connected
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <button
                                  key={relatedId}
                                  className="flex items-center px-2 py-1 text-xs rounded bg-slate-50 hover:bg-accent hover:text-white text-slate-600 transition-all border border-slate-100 hover:border-accent"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={10} className="ml-1 opacity-70" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}