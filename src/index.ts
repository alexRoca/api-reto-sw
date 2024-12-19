

import { CharacterController } from "./infrastructure/http/CharacterController";
import { DynamoDBCharacterRepository } from "./infrastructure/database/DynamoDBCharacterRepository";
import { CharacterService } from "./application/services/CharacterService";

const characterRepository = new DynamoDBCharacterRepository();
const characterService = new CharacterService(characterRepository);
const characterController = new CharacterController(characterService);

export { characterController };