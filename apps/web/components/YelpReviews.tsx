'use client';

import React from 'react';
import { getLiteProductReviews } from '@/lib/reviews-lite';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';

interface YelpReviewsProps {
  productId: number;
}

export function YelpReviews({ productId }: YelpReviewsProps) {
  const selectedReviews = React.useMemo(() => {
    return getLiteProductReviews(productId, 3);
  }, [productId]);

  return (
    <ReviewsPavilion 
      variant="compact"
      reviews={selectedReviews}
      title="VERIFIED ISLAND REVIEWS"
      subtitle="Model-Matched Customer Feedback • Oahu, Hawaii"
    />
  );
}

export default YelpReviews;
