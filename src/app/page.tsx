import { Day } from '@/components/conferences/Day';
import { cookies } from 'next/headers';
import { SubscribeToConference } from '@/components/conferences/SubscribeToConference';
import { DEFAULT_CONFERENCE_SLUG } from '@/data/constants';
import { getDatesInRange } from '@/utils/getDatesInRange';
import { getAccessToken, getUserId } from '@/utils/headers';
import { getGqlClient } from 'lib/service/client';
import {
  ConferenceBySlugDocument,
  ConferenceFullFragmentDoc,
  ConferenceTalksListItemFragmentDoc,
} from 'lib/gql/graphql';
import { useFragment } from 'lib/gql';

async function getConference(token: string) {
  const client = getGqlClient(token);
  const { conferences } = await client.request(ConferenceBySlugDocument, {
    slug: DEFAULT_CONFERENCE_SLUG,
  });
  return conferences.length > 0 ? conferences[0] : null;
}

export default async function IndexPage() {
  const nextCookies = cookies();
  const token = getAccessToken(nextCookies.get('nhostSession')?.value);
  // const userId = getUserId(nextCookies.get('nhostSession')?.value);

  const conferenceData = await getConference(token);

  const conference = useFragment(ConferenceFullFragmentDoc, conferenceData);

  if (!conference) {
    return null;
  }

  return (
    <>
      <div className="grid grid-flow-row gap-2 py-4 text-center sm:py-8">
        <h1 className="text-dim text-[44px] sm:text-[68px] font-semibold leading-tight drop-shadow-sm">
          <span className="stroke">
            {conference.name.substring(0, conference.name.lastIndexOf(' '))}
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-pink-700">
            {conference.name.split(' ').splice(-1)}
          </span>
        </h1>

        <div className="max-w-sm mx-auto space-y-1 text-center">
          <p> {conference.location}</p>
          <p className="text-center text-list">
            {`${new Date(conference.start_date).toDateString()} to 
              ${new Date(conference.end_date).toDateString()}`}
          </p>
        </div>

        <SubscribeToConference conferenceId={conference.id} />
      </div>

      <div className="flex flex-col max-w-4xl mx-auto">
        <div className="flex flex-col py-2 text-center">
          <div className="grid grid-cols-1 gap-4 py-5 md:grid-cols-3 gap-y-12 place-content-between">
            {getDatesInRange(conference.start_date, conference.end_date).map(
              (day, index) => {
                return (
                  <Day
                    key={day.getUTCDay()}
                    dayNumber={index + 1}
                    talks={
                      conference.talks.filter((t) => {
                        const talk = useFragment(
                          ConferenceTalksListItemFragmentDoc,
                          t,
                        );
                        return (
                          new Date(talk.start_date).getUTCDay() ===
                          day.getUTCDay()
                        );
                      }) || []
                    }
                  />
                );
              },
            )}
          </div>
        </div>
      </div>
    </>
  );
}
