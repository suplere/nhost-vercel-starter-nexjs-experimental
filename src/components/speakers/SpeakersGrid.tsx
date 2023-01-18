import { SpeakerCard } from '@/components/speakers/SpeakerCard';
import { FragmentType, useFragment } from 'lib/gql';
import { ConferenceSpeakersListItemFragmentDoc } from 'lib/gql/graphql';

type SpeakersGridProps = {
  speakers: FragmentType<typeof ConferenceSpeakersListItemFragmentDoc>[];
};

export function SpeakersGrid(props: SpeakersGridProps) {
  const speakers = useFragment(
    ConferenceSpeakersListItemFragmentDoc,
    props.speakers,
  );

  return (
    <div className="text-white">
      {speakers.length === 0 ? (
        'There are no speakers on this conference yet.'
      ) : (
        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {speakers?.map((speaker) => {
            return <SpeakerCard key={speaker.id} speaker={speaker} />;
          })}
        </div>
      )}
    </div>
  );
}
