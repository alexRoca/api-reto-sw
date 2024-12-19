import { Character } from '../entities/Character';

export interface CharacterRepository {
  findById(id: string): Promise<Character | null>;
  findAll(): Promise<Character[]>;
  save(character: Character): Promise<void>;
}
