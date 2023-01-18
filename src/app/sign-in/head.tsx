import DefaultTags from '../DefaultTags';
import { data } from '@/data/info';

export default function Head() {
  return (
    <>
      <DefaultTags />
      <title>{data.pageTitle}</title>
    </>
  );
}
