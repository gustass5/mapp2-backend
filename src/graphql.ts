
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateNoteInput {
    headline: string;
    content: string;
    creationDate: string;
}

export abstract class IQuery {
    abstract notes(id?: string): Note[] | Promise<Note[]>;
}

export abstract class IMutation {
    abstract createNote(input: CreateNoteInput): Note | Promise<Note>;
}

export class Note {
    id: number;
    headline?: string;
    content?: string;
    creationDate?: string;
}
