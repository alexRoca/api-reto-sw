import { CharacterRepository } from "../../domain/repositories/CharacterRepository";
import { Character } from "../../domain/entities/Character";
import { SwapiService } from "../../infrastructure/external/SwapiService";
import { logError } from "../../infrastructure/logging/Logger";

export class CharacterService {

    constructor(private characterRepository: CharacterRepository) {}

    async getCharacter(id: string): Promise<Character | null> {
        try {
            const character = await this.characterRepository.findById(id);
            if (character) {
                return character;
            }
        
            const swapiCharacter = await SwapiService.fetchCharacter(id);
            if (!swapiCharacter) {
                throw new Error(`Personaje con ID ${id} no encontrado en SWAPI`);
            }
              
            const newCharacter = new Character(
            id,
            swapiCharacter.nombre,
            swapiCharacter.altura,
            swapiCharacter.peso,
            swapiCharacter.genero
            );
    
            await this.characterRepository.save(newCharacter);
            return newCharacter;
        } catch (error) {
            logError("Error al obtener personajes de DynamoDB or SWAPI", error);
            throw error;
        }
    }

    async getAllCharacters(): Promise<Character[]> {
        try {
            return await this.characterRepository.findAll();
        } catch (error) {
            logError("Error al recuperar todos los personajes", error);
            throw error;
        }
    }
    
    async saveCharacter(character: Character): Promise<void> {
        try {
            await this.characterRepository.save(character);
        } catch (error) {
            logError("Error al guardar el personaje", error);
            throw error;
        }
    }
}