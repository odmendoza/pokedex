'use client';

import { useLoading } from '@/lib/store/loading';
import { CSSProperties } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function Loader({ override }: { override: CSSProperties }) {
  const { loading } = useLoading();

  return (
    <ScaleLoader
      color='#fff'
      loading={loading}
      cssOverride={override}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  );
}