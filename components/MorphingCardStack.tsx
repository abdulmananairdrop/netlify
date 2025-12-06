import React, { useState, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"
import { ArrowRight } from "lucide-react"

export interface CardData {
  id: string
  title: string
  description: string
  icon?: ReactNode
  color?: string
}

export interface MorphingCardStackProps {
  cards?: CardData[]
  className?: string
  onCardClick?: (card: CardData) => void
}

const SWIPE_THRESHOLD = 50

export function MorphingCardStack({
  cards = [],
  className = "",
  onCardClick,
}: MorphingCardStackProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  if (!cards || cards.length === 0) {
    return null
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      // Swiped left - go to next card
      setActiveIndex((prev) => (prev + 1) % cards.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      // Swiped right - go to previous card
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    const reordered = []
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i })
    }
    return reordered.reverse() // Reverse so top card renders last (on top)
  }

  const getLayoutStyles = (stackPosition: number) => {
    return {
      top: stackPosition * 12, // Spacing between cards in stack
      left: stackPosition * 8,
      zIndex: cards.length - stackPosition,
      rotate: (stackPosition - 1) * 3, // Rotation effect
    }
  }

  const displayCards = getStackOrder()
  
  // Get current active card details for side display
  const activeCard = cards[activeIndex];

  return (
    <div className={`space-y-12 ${className}`}>
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 min-h-[400px]">
        {/* Left Side: The Card Stack */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
            <LayoutGroup>
                <motion.div className="relative h-80 w-full max-w-[340px] mx-auto">
                <AnimatePresence mode="popLayout">
                    {displayCards.map((card) => {
                    const styles = getLayoutStyles(card.stackPosition)
                    const isExpanded = expandedCard === card.id
                    const isTopCard = card.stackPosition === 0

                    return (
                        <motion.div
                        key={card.id}
                        layoutId={card.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: isExpanded ? 1.02 : 1,
                            x: 0,
                            ...styles,
                        }}
                        exit={{ opacity: 0, scale: 0.8, x: -100 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                        drag={isTopCard ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.7}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={handleDragEnd}
                        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                        onClick={() => {
                            if (isDragging) return
                            onCardClick?.(card)
                        }}
                        className={`
                            cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 
                            shadow-xl shadow-black/20
                            hover:border-accent/30 transition-all duration-300
                            absolute w-full h-72 flex flex-col justify-between
                            ${isTopCard ? "cursor-grab active:cursor-grabbing ring-1 ring-white/50" : ""}
                            ${isExpanded ? "ring-2 ring-accent shadow-2xl" : ""}
                        `}
                        style={{
                            backgroundColor: card.color || undefined,
                        }}
                        >
                        <div className="flex flex-col gap-4 h-full">
                            <div className="flex items-start justify-between">
                                {card.icon && (
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-accent">
                                    {card.icon}
                                </div>
                                )}
                                <div className="text-xs font-bold text-slate-300">0{Number(card.id.split('-')[1]) + 1}</div>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-xl text-slate-800 mb-2">{card.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                                    Hover or swipe to see full details →
                                </p>
                            </div>
                        </div>
                        </motion.div>
                    )
                    })}
                </AnimatePresence>
                </motion.div>
            </LayoutGroup>
        </div>

        {/* Right Side: Description Panel */}
         <div className="flex-1 w-full lg:max-w-md hidden md:block">
             <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-left"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                        {activeCard.title}
                    </h2>
                    <div className="w-20 h-1 bg-white/30 rounded-full mb-8"></div>
                    <p className="text-lg text-blue-100 leading-relaxed mb-8">
                        {activeCard.description}
                    </p>
                    
                    <button className="group flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all">
                        Learn more about {activeCard.title} 
                        <ArrowRight className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                    </button>
                </motion.div>
             </AnimatePresence>
         </div>
      </div>
      
      {/* Mobile Description fallback */}
      <div className="md:hidden mt-6 text-center px-4">
          <h3 className="text-2xl font-bold text-white mb-3">{activeCard.title}</h3>
          <p className="text-blue-100 leading-relaxed">{activeCard.description}</p>
      </div>
    </div>
  )
}