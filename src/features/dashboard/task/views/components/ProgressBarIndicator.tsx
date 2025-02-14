

import React, { memo } from 'react';

interface ProgressBarProps {
  progress: number; // Progress percentage (0 to 100)
  height?: number;  // Height of the progress bar (e.g., 'h-4' for height: 1rem)
  color?: string;   // Tailwind CSS color class (e.g., 'bg-blue-500')
  showLabel?: boolean; // Whether to show the progress label
}

const colorClasses: { [key: string]: string } = {
  purple: 'purple',
  blue: 'blue',
  red: 'red',
  green: 'green',
  yellow: 'yellow',
  gray: 'gray',
};

const ProgressBarIndicator: React.FC<ProgressBarProps> = ({
  progress,
  height = 2,
  color = 'purple',
  showLabel = true,
}) => {
  const tailwindColor = colorClasses[color] || 'purple'; // Fallback to purple

  return (
    <section className="w-full">
      {showLabel && (
        <section className={`text-right mb-2 text-${tailwindColor}-700 text-xs font-bold`}>
          {`${progress}%`}
        </section>
      )}
      <section className={`w-full h-fit bg-${tailwindColor}-200 rounded-2xl`}>
        <section
          style={{ width: `${progress}%` }}
          className={`h-${height} border-2 border-${tailwindColor}-700 bg-${tailwindColor}-700 rounded-2xl`}
        />
      </section>
    </section>
  );
};

export default memo(ProgressBarIndicator);
