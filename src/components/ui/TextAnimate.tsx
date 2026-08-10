import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TextAnimateProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextAnimate: React.FC<TextAnimateProps> = ({
  text,
  className,
  delay = 0,
}) => {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn(
        'inline-flex flex-wrap gap-x-[0.25em]',
        className
      )}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={wordVariants}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};