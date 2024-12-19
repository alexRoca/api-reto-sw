import axios from 'axios';
import { Character } from '../../domain/entities/Character';

export class SwapiService {
  static async fetchCharacter(id: string): Promise<Character | null> {
    const response = await axios.get(`https://swapi.py4e.com//api/people/${id}/`);
    const data = response.data;
    return new Character(id, data.name, data.height, data.mass, data.gender);
  }
}
