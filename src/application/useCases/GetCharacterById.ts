import { CharacterRepository } from '../../domain/repositories/CharacterRepository';
import { Character } from '../../domain/entities/Character';

export class GetCharacterById {
  constructor(private characterRepository: CharacterRepository) {}

  async execute(id: string): Promise<Character | null> {
    return await this.characterRepository.findById(id);
  }
}
