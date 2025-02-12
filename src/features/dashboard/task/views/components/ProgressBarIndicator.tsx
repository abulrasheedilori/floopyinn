

import React, { memo } from 'react';

interface ProgressBarProps {
  progress: number; // Progress percentage (0 to 100)
  height?: number;  // Height of the progress bar (e.g., 'h-4' for height: 1rem)
  color?: string;   // Tailwind CSS color class (e.g., 'bg-blue-500')
  showLabel?: boolean; // Whether to show the progress label
}

const ProgressBarIndicator: React.FC<ProgressBarProps> = ({
  progress,
  height = 2,
  color = 'purple',
  showLabel = true,
}) => {
  return (
    <section className={`w-full`}>
      {showLabel && (
        <section className={`text-right mb-2 text-${color}-700 text-xs font-bold`}>
          {`${progress}%`}
        </section>
      )}
      <section className={`w-full h-auto bg-${color}-200 rounded-2xl`}>
        <section style={{ width: `${progress}%` }} className={`h-${height} bg-${color}-700 rounded-2xl`} />
      </section>
    </section>
  );
};

export default memo(ProgressBarIndicator);


