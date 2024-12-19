import { CharacterService } from "../../application/services/CharacterService";
import { DynamoDBCharacterRepository } from "../../infrastructure/database/DynamoDBCharacterRepository"; // Ajusta la ruta según sea necesario

const characterRepository = new DynamoDBCharacterRepository();
const characterService = new CharacterService(characterRepository);

export class CharacterController {
  constructor(private characterService: CharacterService) {}

  async getCharacterById(event: any) {
    try {
      const id = event.pathParameters?.id; // Tomamos el ID de la ruta
      const character = await this.characterService.getCharacter(id);
      return {
        statusCode: 200,
        body: JSON.stringify(character),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No se encontro daros del personaje" }),
      };
    }
  }

  async getAllCharacters() {
    try {
      const character = await this.characterService.getAllCharacters();
      return {
        statusCode: 200,
        body: JSON.stringify(character),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No se encontro daros del personaje" }),
      };
    }
  }

  async createCharacter(event: any) {
    try {
      const characterData = JSON.parse(event.body);
      await this.characterService.saveCharacter(characterData);
      return {
        statusCode: 201,
        body: JSON.stringify({ message: "Personaje creado" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No se pudo crear o modificar el personaje." }),
      };
    }
  }
}

export const characterController = new CharacterController(characterService);
export const getCharacterById = characterController.getCharacterById.bind(characterController);
export const createCharacter = characterController.createCharacter.bind(characterController);
export const getAllCharacters = characterController.getAllCharacters.bind(characterController);

