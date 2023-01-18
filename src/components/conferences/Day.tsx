import { TalkCard } from '@/components/talks/TalkCard';
import { FragmentType, useFragment } from 'lib/gql';
import { ConferenceTalksListItemFragmentDoc } from 'lib/gql/graphql';

interface DayProps {
  /**
   * List of talks for the day
   */
  talks: FragmentType<typeof ConferenceTalksListItemFragmentDoc>[];
  /**
   * Number of the day
   */
  dayNumber: number;
}

export function Day(props: DayProps) {
  const talks = useFragment(ConferenceTalksListItemFragmentDoc, props.talks);
  return (
    <div className="grid content-start grid-flow-row gap-y-4">
      <h2 className="text-xl font-semibold text-white">
        Day {props.dayNumber}
      </h2>

      {talks.length === 0 ? (
        <p>There are no talks yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-2 md:grid-flow-row sm:grid-cols-2 sm:grid-flow-row md:grid-cols-none">
          {talks.map((talk) => (
            <TalkCard key={talk.id} talk={talk} hideDate />
          ))}
        </div>
      )}
    </div>
  );
}
