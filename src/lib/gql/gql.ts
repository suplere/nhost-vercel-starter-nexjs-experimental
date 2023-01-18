/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "mutation AddConference($conference: conferences_insert_input!) {\n  insert_conferences_one(object: $conference) {\n    id\n  }\n}\n\nmutation UpdateConference($id: uuid!, $object: conferences_set_input!) {\n  update_conferences_by_pk(pk_columns: {id: $id}, _set: $object) {\n    id\n  }\n}\n\nmutation DeleteConference($id: uuid!) {\n  delete_conferences_by_pk(id: $id) {\n    id\n  }\n}\n\nmutation SetConferenceFeatured($id: uuid!) {\n  update_conferences_many(\n    updates: {where: {id: {_neq: $id}}, _set: {featured: false}}\n  ) {\n    affected_rows\n  }\n  update_conferences_by_pk(pk_columns: {id: $id}, _set: {featured: true}) {\n    id\n  }\n}": types.AddConferenceDocument,
    "fragment ConferenceSpeakersListItem on speakers {\n  name\n  id\n  social\n  job_description\n  avatar_url\n  bio\n}\n\nfragment ConferenceTalkSpeaker on speakers {\n  name\n  id\n  social\n  job_description\n  avatar_url\n  bio\n}\n\nfragment ConferenceTalksListItem on talks {\n  id\n  name\n  start_date\n  end_date\n  speaker {\n    ...ConferenceTalkSpeaker\n  }\n}\n\nfragment ConferenceFull on conferences {\n  id\n  name\n  slug\n  location\n  featured\n  start_date\n  end_date\n  talks(order_by: {start_date: asc}) {\n    ...ConferenceTalksListItem\n  }\n  speakers {\n    ...ConferenceSpeakersListItem\n  }\n}\n\nquery Conferences {\n  conferences(order_by: {name: asc}) {\n    id\n    name\n    slug\n    location\n    featured\n    start_date\n    end_date\n    talks(order_by: {start_date: asc}) {\n      id\n      name\n      start_date\n      end_date\n      speaker {\n        name\n        id\n        social\n        job_description\n        avatar_url\n        bio\n      }\n    }\n    speakers(order_by: {name: asc}) {\n      id\n      avatar_url\n    }\n  }\n}\n\nquery FeaturedConferences {\n  conferences(where: {featured: {_eq: true}}) {\n    id\n    name\n    slug\n    location\n    featured\n    start_date\n    end_date\n    talks(order_by: {start_date: asc}) {\n      id\n      name\n      start_date\n      end_date\n      speaker {\n        name\n        id\n        social\n        job_description\n        avatar_url\n        bio\n      }\n    }\n    speakers {\n      name\n      id\n      social\n      job_description\n      avatar_url\n      bio\n    }\n  }\n}\n\nquery ConferenceBySlug($slug: String!) {\n  conferences(where: {slug: {_eq: $slug}}) {\n    ...ConferenceFull\n  }\n}": types.ConferenceSpeakersListItemFragmentDoc,
    "mutation AddSpeaker($speaker: speakers_insert_input!) {\n  insert_speakers_one(object: $speaker) {\n    id\n  }\n}\n\nmutation DeleteSpeaker($id: uuid!) {\n  delete_speakers_by_pk(id: $id) {\n    id\n  }\n}": types.AddSpeakerDocument,
    "mutation UpdateTalk($id: uuid!, $talk: talks_set_input!) {\n  update_talks_by_pk(pk_columns: {id: $id}, _set: $talk) {\n    id\n  }\n}\n\nmutation AddTalk($talk: talks_insert_input!) {\n  insert_talks_one(object: $talk) {\n    id\n  }\n}\n\nmutation DeleteTalk($id: uuid!) {\n  delete_talks_by_pk(id: $id) {\n    id\n  }\n}": types.UpdateTalkDocument,
    "mutation AddEmail($ticket: [tickets_insert_input!]!) {\n  insert_tickets(objects: $ticket) {\n    affected_rows\n  }\n}": types.AddEmailDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddConference($conference: conferences_insert_input!) {\n  insert_conferences_one(object: $conference) {\n    id\n  }\n}\n\nmutation UpdateConference($id: uuid!, $object: conferences_set_input!) {\n  update_conferences_by_pk(pk_columns: {id: $id}, _set: $object) {\n    id\n  }\n}\n\nmutation DeleteConference($id: uuid!) {\n  delete_conferences_by_pk(id: $id) {\n    id\n  }\n}\n\nmutation SetConferenceFeatured($id: uuid!) {\n  update_conferences_many(\n    updates: {where: {id: {_neq: $id}}, _set: {featured: false}}\n  ) {\n    affected_rows\n  }\n  update_conferences_by_pk(pk_columns: {id: $id}, _set: {featured: true}) {\n    id\n  }\n}"): (typeof documents)["mutation AddConference($conference: conferences_insert_input!) {\n  insert_conferences_one(object: $conference) {\n    id\n  }\n}\n\nmutation UpdateConference($id: uuid!, $object: conferences_set_input!) {\n  update_conferences_by_pk(pk_columns: {id: $id}, _set: $object) {\n    id\n  }\n}\n\nmutation DeleteConference($id: uuid!) {\n  delete_conferences_by_pk(id: $id) {\n    id\n  }\n}\n\nmutation SetConferenceFeatured($id: uuid!) {\n  update_conferences_many(\n    updates: {where: {id: {_neq: $id}}, _set: {featured: false}}\n  ) {\n    affected_rows\n  }\n  update_conferences_by_pk(pk_columns: {id: $id}, _set: {featured: true}) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ConferenceSpeakersListItem on speakers {\n  name\n  id\n  social\n  job_description\n  avatar_url\n  bio\n}\n\nfragment ConferenceTalkSpeaker on speakers {\n  name\n  id\n  social\n  job_description\n  avatar_url\n  bio\n}\n\nfragment ConferenceTalksListItem on talks {\n  id\n  name\n  start_date\n  end_date\n  speaker {\n    ...ConferenceTalkSpeaker\n  }\n}\n\nfragment ConferenceFull on conferences {\n  id\n  name\n  slug\n  location\n  featured\n  start_date\n  end_date\n  talks(order_by: {start_date: asc}) {\n    ...ConferenceTalksListItem\n  }\n  speakers {\n    ...ConferenceSpeakersListItem\n  }\n}\n\nquery Conferences {\n  conferences(order_by: {name: asc}) {\n    id\n    name\n    slug\n    location\n    featured\n    start_date\n    end_date\n    talks(order_by: {start_date: asc}) {\n      id\n      name\n      start_date\n      end_date\n      speaker {\n        name\n        id\n        social\n        job_description\n        avatar_url\n        bio\n      }\n    }\n    speakers(order_by: {name: asc}) {\n      id\n      avatar_url\n    }\n  }\n}\n\nquery FeaturedConferences {\n  conferences(where: {featured: {_eq: true}}) {\n    id\n    name\n    slug\n    location\n    featured\n    start_date\n    end_date\n    talks(order_by: {start_date: asc}) {\n      id\n      name\n      start_date\n      end_date\n      speaker {\n        name\n        id\n        social\n        job_description\n        avatar_url\n        bio\n      }\n    }\n    speakers {\n      name\n      id\n      social\n      job_description\n      avatar_url\n      bio\n    }\n  }\n}\n\nquery ConferenceBySlug($slug: String!) {\n  conferences(where: {slug: {_eq: $slug}}) {\n    ...ConferenceFull\n  }\n}"): (typeof documents)["fragment ConferenceSpeakersListItem on speakers {\n  name\n  id\n  social\n  job_description\n  avatar_url\n  bio\n}\n\nfragment ConferenceTalkSpeaker on speakers {\n  name\n  id\n  social\n  job_description\n  avatar_url\n  bio\n}\n\nfragment ConferenceTalksListItem on talks {\n  id\n  name\n  start_date\n  end_date\n  speaker {\n    ...ConferenceTalkSpeaker\n  }\n}\n\nfragment ConferenceFull on conferences {\n  id\n  name\n  slug\n  location\n  featured\n  start_date\n  end_date\n  talks(order_by: {start_date: asc}) {\n    ...ConferenceTalksListItem\n  }\n  speakers {\n    ...ConferenceSpeakersListItem\n  }\n}\n\nquery Conferences {\n  conferences(order_by: {name: asc}) {\n    id\n    name\n    slug\n    location\n    featured\n    start_date\n    end_date\n    talks(order_by: {start_date: asc}) {\n      id\n      name\n      start_date\n      end_date\n      speaker {\n        name\n        id\n        social\n        job_description\n        avatar_url\n        bio\n      }\n    }\n    speakers(order_by: {name: asc}) {\n      id\n      avatar_url\n    }\n  }\n}\n\nquery FeaturedConferences {\n  conferences(where: {featured: {_eq: true}}) {\n    id\n    name\n    slug\n    location\n    featured\n    start_date\n    end_date\n    talks(order_by: {start_date: asc}) {\n      id\n      name\n      start_date\n      end_date\n      speaker {\n        name\n        id\n        social\n        job_description\n        avatar_url\n        bio\n      }\n    }\n    speakers {\n      name\n      id\n      social\n      job_description\n      avatar_url\n      bio\n    }\n  }\n}\n\nquery ConferenceBySlug($slug: String!) {\n  conferences(where: {slug: {_eq: $slug}}) {\n    ...ConferenceFull\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddSpeaker($speaker: speakers_insert_input!) {\n  insert_speakers_one(object: $speaker) {\n    id\n  }\n}\n\nmutation DeleteSpeaker($id: uuid!) {\n  delete_speakers_by_pk(id: $id) {\n    id\n  }\n}"): (typeof documents)["mutation AddSpeaker($speaker: speakers_insert_input!) {\n  insert_speakers_one(object: $speaker) {\n    id\n  }\n}\n\nmutation DeleteSpeaker($id: uuid!) {\n  delete_speakers_by_pk(id: $id) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateTalk($id: uuid!, $talk: talks_set_input!) {\n  update_talks_by_pk(pk_columns: {id: $id}, _set: $talk) {\n    id\n  }\n}\n\nmutation AddTalk($talk: talks_insert_input!) {\n  insert_talks_one(object: $talk) {\n    id\n  }\n}\n\nmutation DeleteTalk($id: uuid!) {\n  delete_talks_by_pk(id: $id) {\n    id\n  }\n}"): (typeof documents)["mutation UpdateTalk($id: uuid!, $talk: talks_set_input!) {\n  update_talks_by_pk(pk_columns: {id: $id}, _set: $talk) {\n    id\n  }\n}\n\nmutation AddTalk($talk: talks_insert_input!) {\n  insert_talks_one(object: $talk) {\n    id\n  }\n}\n\nmutation DeleteTalk($id: uuid!) {\n  delete_talks_by_pk(id: $id) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddEmail($ticket: [tickets_insert_input!]!) {\n  insert_tickets(objects: $ticket) {\n    affected_rows\n  }\n}"): (typeof documents)["mutation AddEmail($ticket: [tickets_insert_input!]!) {\n  insert_tickets(objects: $ticket) {\n    affected_rows\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;