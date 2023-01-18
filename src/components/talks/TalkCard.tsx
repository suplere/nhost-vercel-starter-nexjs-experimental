'use client';
import { useAccessToken, useAuthenticated } from '@nhost/nextjs';
import { FragmentType, useFragment } from 'lib/gql';
import {
  ConferenceTalkSpeakerFragmentDoc,
  ConferenceTalksListItemFragment,
  DeleteTalkDocument,
} from 'lib/gql/graphql';
import { getGqlClient } from 'lib/service/client';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';

export interface TalkCardProps {
  talk: ConferenceTalksListItemFragment;
  /**
   * Determines whether or not the date should be displayed
   */
  hideDate?: boolean;
}

export function TalkCard({ talk, hideDate }: TalkCardProps) {
  const isAuthenticated = useAuthenticated();
  const token = useAccessToken();
  const router = useRouter();
  const speaker = useFragment(ConferenceTalkSpeakerFragmentDoc, talk.speaker);

  const onClickDelete: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const client = getGqlClient(token || undefined);
      await client.request(DeleteTalkDocument, {
        id: talk.id,
      });
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown error occurred. Please try again later.';
      throw new Error(message);
    }
  };

  const startDate = new Date(talk.start_date);
  const endDate = new Date(talk.end_date);

  const startHours = startDate.getUTCHours().toString().padStart(2, '0');
  const startMinutes = startDate.getUTCMinutes().toString().padStart(2, '0');

  const endHours = endDate.getUTCHours().toString().padStart(2, '0');
  const endMinutes = endDate.getUTCMinutes().toString().padStart(2, '0');

  return (
    <div className="relative flex flex-col w-full p-4 space-y-1 border border-gray-900 rounded-md bg-card">
      {isAuthenticated ? (
        <button
          title="delete talk"
          className="absolute text-red-500 right-2 top-3 opacity-80"
          onClick={onClickDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      ) : null}

      {!hideDate && (
        <p className="text-xs">
          {startDate.getUTCFullYear()}-
          {(startDate.getUTCMonth() + 1).toString().padStart(2, '0')}-
          {startDate.getUTCDate().toString().padStart(2, '0')}
        </p>
      )}

      <p className="text-xs font-medium text-dim">
        {talk.start_date
          ? `${startHours}:${startMinutes} to ${endHours}:${endMinutes} UTC`
          : '-'}
      </p>

      <h2 className="text-lg font-medium text-white"> {talk.name}</h2>
      <p className="text-xs font-medium text-white"> by {speaker.name}</p>
    </div>
  );
}
