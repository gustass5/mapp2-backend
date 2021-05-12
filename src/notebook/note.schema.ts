import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
	@Prop()
	id: string;

	@Prop()
	headline: string;

	@Prop()
	content: string;

	@Prop()
	creationDate: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
