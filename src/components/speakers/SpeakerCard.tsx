'use client';
import { useAccessToken, useAuthenticated } from '@nhost/react';
import {
  ConferenceSpeakersListItemFragment,
  DeleteSpeakerDocument,
} from 'lib/gql/graphql';
import { getGqlClient } from 'lib/service/client';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';

type SpeakerCardProps = {
  speaker: ConferenceSpeakersListItemFragment;
};

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  const router = useRouter();
  const isAuthenticated = useAuthenticated();
  const token = useAccessToken();

  const onClickDelete: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const client = getGqlClient(token);
      await client.request(DeleteSpeakerDocument, {
        id: speaker.id,
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

  return (
    <div className="bg-card shadow-gray-900 relative flex flex-col px-4 py-5 transition-all duration-150 ease-in border border-gray-900 rounded-md shadow-sm">
      {isAuthenticated ? (
        <button
          title="delete button"
          className="right-2 bottom-3 opacity-80 absolute text-red-500"
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
      <picture>
        <source
          srcSet={speaker.avatar_url || 'https://via.placeholder.com/350x350'}
          type="image/webp"
          width={350}
          height={350}
          className="aspect-square object-cover rounded-md"
        />
        <img
          alt="Speaker's photo"
          src={speaker.avatar_url || 'https://via.placeholder.com/350x350'}
          width={350}
          height={350}
          className="aspect-square object-cover rounded-md"
        />
      </picture>
      <div className="py-2">
        <h1 className="text-lg font-medium text-white">{speaker.name}</h1>
        <h2 className="text-dim text-xs font-medium">@{speaker.social}</h2>
        <h2 className="text-dim mt-2 text-sm font-medium">
          {speaker.job_description}
        </h2>
      </div>
    </div>
  );
}
