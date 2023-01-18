'use client';
import { Input } from '@/components/common/Input';
import { useAccessToken, useAuthenticated } from '@nhost/nextjs';
import { AddSpeakerDocument } from 'lib/gql/graphql';
import { getGqlClient } from 'lib/service/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type AddNewSpeakerValues = {
  name: string;
  social: string;
  jobTitle: string;
  avatarUrl: string;
};

export interface AddNewSpeakerProps {
  conferenceId: string;
}

export function AddNewSpeaker({ conferenceId }: AddNewSpeakerProps) {
  const router = useRouter();
  const isAuthenticated = useAuthenticated();
  const token = useAccessToken();
  const [addSpeakerStatus, setAddSpeakerStatus] = useState('loaded');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<AddNewSpeakerValues>({
    reValidateMode: 'onBlur',
    defaultValues: {
      name: '',
      social: '',
      jobTitle: '',
      avatarUrl: 'https://via.placeholder.com/350x350',
    },
  });

  async function onSubmit(values: AddNewSpeakerValues) {
    setAddSpeakerStatus('loading');
    try {
      const client = getGqlClient(token);
      await client.request(AddSpeakerDocument, {
        speaker: {
          name: values.name,
          social: values.social,
          job_description: values.jobTitle,
          avatar_url: values.avatarUrl,
          conference_id: conferenceId,
        },
      });

      reset({
        name: '',
        social: '',
        jobTitle: '',
        avatarUrl: 'https://via.placeholder.com/350x350',
      });
      setAddSpeakerStatus('loaded');
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown error occurred. Please try again later.';
      setAddSpeakerStatus('loaded');
      throw new Error(message);
    }
  }

  return (
    <>
      {isAuthenticated && (
        <div className="w-full max-w-lg py-10 mx-auto">
          <h1 className="text-dim pb-8 text-3xl font-medium leading-none text-center">
            Add New Speaker
          </h1>
          <div className="w-full px-12 pt-10 pb-10 border border-gray-700 rounded-md bg-card">
            <form
              className="grid grid-flow-row gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                {...register('avatarUrl', {
                  required: { value: true, message: 'This field is required.' },
                })}
                id="avatarUrl"
                label="Avatar URL"
                placeholder="Avatar URL"
                error={errors?.avatarUrl?.message}
                disabled={addSpeakerStatus === 'loading'}
              />

              <Input
                {...register('name', {
                  required: { value: true, message: 'This field is required.' },
                })}
                id="speakerName"
                label="Name"
                placeholder="Name"
                error={errors?.name?.message}
                disabled={addSpeakerStatus === 'loading'}
              />

              <Input
                {...register('social', {
                  required: { value: true, message: 'This field is required.' },
                })}
                id="social"
                label="Twitter Tag"
                placeholder="Twitter Tag"
                error={errors?.social?.message}
                disabled={addSpeakerStatus === 'loading'}
              />

              <Input
                {...register('jobTitle', {
                  required: { value: true, message: 'This field is required.' },
                })}
                id="jobTitle"
                label="Job Title"
                placeholder="Job Title"
                error={errors?.jobTitle?.message}
                disabled={addSpeakerStatus === 'loading'}
              />

              <div className="grid grid-flow-row gap-2">
                <button
                  type="submit"
                  disabled={addSpeakerStatus === 'loading'}
                  className="py-3 text-xs font-medium text-white border-gray-500 rounded-md bg-header"
                >
                  {addSpeakerStatus === 'loading'
                    ? 'Loading...'
                    : 'Add New Speaker'}
                </button>

                {isSubmitSuccessful && (
                  <p className="text-center">Speaker was successfully added!</p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
