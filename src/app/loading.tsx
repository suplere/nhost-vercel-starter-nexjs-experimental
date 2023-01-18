import { Loader } from '@/components/common/Loader';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <p className="grid justify-start grid-flow-col gap-1">
      <Loader /> Loading conference...
    </p>
  );
}
