import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants, type PanInfo } from 'framer-motion';

import styles from './HowItWorksCarousel.module.css';

interface ICardData {
  id: number;
  number: string;
  title: string;
  description: string;
}

interface IHowItWorksCarouselProps {
  cards: ICardData[];
}

const EASE_STANDARD = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
  left: {
    x: -120,
    rotate: -8,
    opacity: 0.6,
    scale: 0.85,
    transition: { duration: 0.4, ease: EASE_STANDARD }
  },
  center: {
    x: 0,
    rotate: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_STANDARD }
  },
  right: {
    x: 120,
    rotate: 8,
    opacity: 0.6,
    scale: 0.85,
    transition: { duration: 0.4, ease: EASE_STANDARD }
  },
};

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(8px)',
    transition: { duration: 0.3 }
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.3 }
  },
};

export const HowItWorksCarousel = ({ cards }: IHowItWorksCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevCard();
    } else if (info.offset.x < -swipeThreshold) {
      nextCard();
    }
  };

  const getCardPosition = (index: number): 'left' | 'center' | 'right' | 'hidden' => {
    const diff = (index - currentIndex + cards.length) % cards.length;
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -(cards.length - 1)) return 'right';
    if (diff === cards.length - 1 || diff === -1) return 'left';
    return 'hidden';
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>HOW IT WORKS</h2>

      <div className={styles.carouselContainer}>
        <div className={styles.cardsWrapper}>
          {cards.map((card) => {
            const position = getCardPosition(card.id);
            if (position === 'hidden') return null;

            return (
              <motion.div
                key={card.id}
                className={styles.cardWrapper}
                initial={shouldReduceMotion ? position : false}
                animate={position}
                variants={shouldReduceMotion ? {} : cardVariants}
                drag={position === 'center' && !shouldReduceMotion ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{
                  zIndex: position === 'center' ? 10 : 5,
                  cursor: position === 'center' ? 'grab' : 'default',
                }}
              >
                <div className={styles.card}>
                  <div className={styles.cardNumber}>{card.number}</div>
                </div>

                <motion.div
                  className={styles.textContainer}
                  initial={shouldReduceMotion ? 'visible' : false}
                  animate={position === 'center' ? 'visible' : 'hidden'}
                  variants={shouldReduceMotion ? {} : textVariants}
                >
                  <div className={styles.titleRow}>
                    <div className={styles.badge}>
                      <span>{card.number}</span>
                    </div>
                    <p className={styles.title}>{card.title}</p>
                  </div>
                  <p className={styles.description}>{card.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlsInner}>
          <button
            onClick={prevCard}
            className={styles.arrowButton}
            aria-label="Previous card"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className={styles.pagination}>
            {cards.map((card, idx) => (
              <motion.div
                key={card.id}
                className={styles.dot}
                animate={{
                  backgroundColor: idx === currentIndex ? '#111a29' : '#a4a4a4',
                  opacity: idx === currentIndex ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            className={styles.arrowButton}
            aria-label="Next card"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.ctaContainer}>
        <button className={styles.ctaButton}>
          <span>Try Venga Today</span>
          <div className={styles.ctaIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#78A6FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};
