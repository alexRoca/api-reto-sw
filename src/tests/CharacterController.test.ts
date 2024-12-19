import { CharacterController } from "../infrastructure/http/CharacterController";
import { CharacterService } from "../application/services/CharacterService";

const mockCharacterService = {
  getCharacter: jest.fn(),
  getAllCharacters: jest.fn(),
  saveCharacter: jest.fn(),
};

const characterController = new CharacterController(mockCharacterService as unknown as CharacterService);

describe("CharacterController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCharacterById", () => {
    it("debería devolver un personaje con el ID proporcionado", async () => {
      const mockEvent = { pathParameters: { id: "321" } };
      const mockCharacter = { id: "321", name: "Owen Lars" };
      mockCharacterService.getCharacter.mockResolvedValue(mockCharacter);

      const response = await characterController.getCharacterById(mockEvent);

      expect(mockCharacterService.getCharacter).toHaveBeenCalledWith("321");
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toEqual(mockCharacter);
    });

    it("debería manejar errores al obtener un personaje", async () => {
      const mockEvent = { pathParameters: { id: "321" } };
      mockCharacterService.getCharacter.mockRejectedValue(new Error("Error"));

      const response = await characterController.getCharacterById(mockEvent);

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.body)).toEqual({ error: "No se encontro daros del personaje" });
    });
  });

  describe("getAllCharacters", () => {
    it("debería devolver todos los personajes", async () => {
      const mockCharacters = [
        { id: "321", name: "Owen Lars" },
        { id: "789", name: "Darth Vader" },
      ];
      mockCharacterService.getAllCharacters.mockResolvedValue(mockCharacters);

      const response = await characterController.getAllCharacters();

      expect(mockCharacterService.getAllCharacters).toHaveBeenCalled();
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toEqual(mockCharacters);
    });

    it("debería manejar errores al obtener todos los personajes", async () => {
      mockCharacterService.getAllCharacters.mockRejectedValue(new Error("Error"));

      const response = await characterController.getAllCharacters();

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.body)).toEqual({ error: "No se encontro daros del personaje" });
    });
  });

  describe("createCharacter", () => {
    it("debería crear un nuevo personaje", async () => {
      const mockEvent = { body: JSON.stringify({ id: "321", name: "Owen Lars" }) };
      mockCharacterService.saveCharacter.mockResolvedValue(undefined);

      const response = await characterController.createCharacter(mockEvent);

      expect(mockCharacterService.saveCharacter).toHaveBeenCalledWith({ id: "321", name: "Owen Lars" });
      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.body)).toEqual({ message: "Personaje creado" });
    });

    it("debería manejar errores al crear un personaje", async () => {
      const mockEvent = { body: JSON.stringify({ id: "321", name: "Owen Lars" }) };
      mockCharacterService.saveCharacter.mockRejectedValue(new Error("Error"));

      const response = await characterController.createCharacter(mockEvent);

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.body)).toEqual({ error: "No se pudo crear o modificar el personaje." });
    });
  });
});
