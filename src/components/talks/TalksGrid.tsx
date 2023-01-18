import { FragmentType, useFragment } from 'lib/gql';
import { ConferenceTalksListItemFragmentDoc } from 'lib/gql/graphql';
import { TalkCard } from './TalkCard';

export interface TalksGridProps {
  talks: FragmentType<typeof ConferenceTalksListItemFragmentDoc>[];
}

export function TalksGrid({ talks }: TalksGridProps) {
  return (
    <div className="text-white">
      {talks.length === 0 ? (
        'There are no talks on this conference yet.'
      ) : (
        <div className="grid grid-cols-2 gap-6 text-center text-white sm:grid-cols-3 md:grid-cols-4 place-content-between">
          {talks.map((t) => {
            const talk = useFragment(ConferenceTalksListItemFragmentDoc, t);
            return <TalkCard key={talk.id} talk={talk} />;
          })}
        </div>
      )}
    </div>
  );
}
