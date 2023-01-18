import { AddNewSpeaker } from '@/components/speakers/AddNewSpeaker';
import { SpeakersGrid } from '@/components/speakers/SpeakersGrid';
import { DEFAULT_CONFERENCE_SLUG } from '@/data/constants';
import { getAccessToken } from '@/utils/headers';
import { useFragment } from 'lib/gql';
import {
  ConferenceBySlugDocument,
  ConferenceFullFragmentDoc,
} from 'lib/gql/graphql';
import { getGqlClient } from 'lib/service/client';
import { cookies } from 'next/headers';

async function getConference(token: string) {
  const client = getGqlClient(token);
  const { conferences } = await client.request(ConferenceBySlugDocument, {
    slug: DEFAULT_CONFERENCE_SLUG,
  });
  return conferences.length > 0 ? conferences[0] : null;
}

async function SpeakersPage() {
  const nextCookies = cookies();
  const token = getAccessToken(nextCookies.get('nhostSession')?.value);
  const conferenceData = await getConference(token);
  const conference = useFragment(ConferenceFullFragmentDoc, conferenceData);

  return (
    <div className="grid grid-flow-row gap-2 py-4">
      <SpeakersGrid speakers={conference.speakers} />

      <AddNewSpeaker conferenceId={conference.id} />
    </div>
  );
}

export default SpeakersPage;
