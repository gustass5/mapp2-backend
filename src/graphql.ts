
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class NoteInput {
    id?: number;
    headline: string;
    content: string;
    creationDate?: string;
    updateDate?: string;
}

export abstract class IQuery {
    abstract repositories(): Repository[] | Promise<Repository[]>;

    abstract notes(id?: number): Note[] | Promise<Note[]>;
}

export class Repository {
    name?: string;
    description?: string;
    owner?: string;
    private?: boolean;
    pullRequests?: PullRequest[];
}

export class PullRequest {
    title?: string;
    author?: string;
    body?: string;
    serialNumber?: number;
    state?: string;
    isDraft?: string;
    createdAt?: string;
    updatedAt?: string;
    mergedAt?: string;
    closedAt?: string;
    comments?: Comment[];
}

export class Comment {
    author?: string;
    body?: string;
    createdAt?: string;
}

export abstract class IMutation {
    abstract createNote(input: NoteInput): Note | Promise<Note>;

    abstract updateNote(input: NoteInput): Note | Promise<Note>;

    abstract deleteNote(id?: number): Note | Promise<Note>;
}

export class Note {
    id: string;
    headline?: string;
    content?: string;
    creationDate?: string;
    updateDate?: string;
}
