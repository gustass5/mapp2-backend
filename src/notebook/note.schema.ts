import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
	@Prop()
	id: number;

	@Prop()
	headline: string;

	@Prop()
	content: string;

	@Prop()
	creationDate: string;

	@Prop()
	updateDate: string;

	@Prop()
	deleted: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
