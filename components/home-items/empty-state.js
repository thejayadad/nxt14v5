'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import HeadingText from '../heading-text';
import { Button } from '@nextui-org/react';

const EmptyState = ({ title = "No matches", subtitle = "Adjust your filters for now. More rides are being hosted by default", showReset = true }) => {
  const router = useRouter();
  return (
    <div className='h-[80vh] flex flex-col justify-center items-center'>
      <HeadingText
        title={title}
        subtitle={subtitle}
        center
      />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button
          className='w-full'
            onClick={() => router.push('/')}
          >
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
