import { useConferencesQueryQuery } from '@/utils/__generated__/graphql';

import { Day } from './Day';

interface AgendaProps {
  amountOfDays: Date[];
}

export function Agenda({ amountOfDays }: AgendaProps) {
  const { data, isLoading, isError } = useConferencesQueryQuery();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex flex-col max-w-4xl mx-auto">
      <div className="flex flex-col py-2 text-center">
        <div className="gap-y-12 place-content-between grid grid-cols-3 gap-8 py-5">
          {amountOfDays.map((day, index) => {
            return (
              <Day
                key={day.getUTCDay()}
                dayNumber={index + 1}
                talks={data.conferences[0].talks.filter(
                  (talk) =>
                    new Date(talk.start_date).getUTCDay() === day.getUTCDay(),
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}