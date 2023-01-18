'use client';
import { Input } from '@/components/common/Input';
import { SpeakerListbox } from '@/components/speakers/SpeakerListbox';
import { useAccessToken, useAuthenticated } from '@nhost/react';
import { FragmentType, getFragmentData } from 'lib/gql';
import {
  AddTalkDocument,
  ConferenceSpeakersListItemFragment,
  ConferenceSpeakersListItemFragmentDoc,
} from 'lib/gql/graphql';
import { getGqlClient } from 'lib/service/client';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export type AddTalkFormValues = {
  title: string;
  speaker: ConferenceSpeakersListItemFragment;
  startDate: string;
  endDate: string;
};

export interface AddNewTalkProps {
  conferenceId: string;
  speakers: FragmentType<typeof ConferenceSpeakersListItemFragmentDoc>[];
}

export function AddNewTalk(props: AddNewTalkProps) {
  const router = useRouter();
  const isAuthenticated = useAuthenticated();
  const token = useAccessToken();
  const [formInitialized, setFormInitialized] = useState(false);
  const [addTalkStatus, setAddTalkStatus] = useState('loaded');
  const speakers = getFragmentData(
    ConferenceSpeakersListItemFragmentDoc,
    props.speakers,
  );
  const form = useForm<AddTalkFormValues>();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = form;

  useEffect(() => {
    if (speakers && !formInitialized) {
      reset({
        title: '',
        speaker: speakers[0] || null,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      });

      setFormInitialized(true);
    }
  }, [speakers, formInitialized, reset]);

  async function onSubmit(values: AddTalkFormValues) {
    setAddTalkStatus('loading');
    try {
      const client = getGqlClient(token);
      await client.request(AddTalkDocument, {
        talk: {
          name: values.title,
          speaker_id: values.speaker.id,
          start_date: values.startDate,
          end_date: values.endDate,
          conference_id: props.conferenceId,
        },
      });
      reset({
        title: '',
        speaker: speakers[0] || null,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      });
      setAddTalkStatus('loaded');
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown error occurred. Please try again later.';
      setAddTalkStatus('loaded');
      throw new Error(message);
    }
  }

  return (
    <>
      {isAuthenticated && (
        <div className="w-full max-w-lg py-10 mx-auto">
          <h1 className="text-dim pb-8 text-3xl font-medium leading-none text-center">
            Add New Talk
          </h1>
          <div className="flex flex-col w-full px-12 pt-10 pb-10 space-y-8 border border-gray-700 rounded-md bg-card">
            <FormProvider {...form}>
              <form
                className="grid grid-flow-row gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  {...register('title', {
                    required: {
                      value: true,
                      message: 'This field is required.',
                    },
                  })}
                  id="talk-title"
                  label="Talk Title"
                  placeholder="Talk Title"
                  error={errors?.title?.message}
                  disabled={addTalkStatus === 'loading'}
                />

                <div className="grid items-center grid-cols-3">
                  <div className="col-span-1">
                    <label
                      htmlFor="speaker"
                      className="self-center text-xs font-medium text-list"
                    >
                      Speaker
                    </label>
                  </div>
                  <div className="col-span-2">
                    <SpeakerListbox speakers={props.speakers} />
                  </div>
                </div>

                <Input
                  {...register('startDate')}
                  id="start-date"
                  label="Starting Time"
                  placeholder="Starting Time"
                  error={errors?.startDate?.message}
                  disabled={addTalkStatus === 'loading'}
                />

                <Input
                  {...register('endDate')}
                  id="end-date"
                  label="Ending Time"
                  placeholder="Ending Time"
                  error={errors?.endDate?.message}
                  disabled={addTalkStatus === 'loading'}
                />

                <div className="grid grid-flow-row gap-2">
                  <button
                    disabled={addTalkStatus === 'loading'}
                    className="py-3 text-xs font-medium text-white border-gray-500 rounded-md bg-header"
                    type="submit"
                  >
                    {addTalkStatus === 'loading'
                      ? 'Loading...'
                      : 'Add New Talk'}
                  </button>

                  {isSubmitSuccessful && (
                    <p className="text-center">Talk was successfully added!</p>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </>
  );
}
