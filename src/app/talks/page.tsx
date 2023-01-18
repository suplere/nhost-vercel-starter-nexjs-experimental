import { AddNewTalk } from '@/components/talks/AddNewTalk';
import { TalksGrid } from '@/components/talks/TalksGrid';
import { DEFAULT_CONFERENCE_SLUG } from '@/data/constants';
import { getAccessToken } from '@/utils/headers';
import { getFragmentData } from 'lib/gql';
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

async function TalksPage() {
  const nextCookies = cookies();
  const token = getAccessToken(nextCookies.get('nhostSession')?.value);
  const conferenceData = await getConference(token);
  const conference = getFragmentData(ConferenceFullFragmentDoc, conferenceData);
  return (
    <div className="grid grid-flow-row gap-2 py-4">
      <TalksGrid talks={conference.talks} />

      <AddNewTalk conferenceId={conference.id} speakers={conference.speakers} />
    </div>
  );
}

export default TalksPage;
