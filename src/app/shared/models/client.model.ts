import { Note } from './note.model';

export class Client {
  id: number;
  notes: Note[];
  nom: string;
  prenom: string;
  ville: string;
  avatar: string;
}
