import { CharacterRepository } from '../../domain/repositories/CharacterRepository';
import { Character } from '../../domain/entities/Character';
import DynamoDB from 'aws-sdk/clients/dynamodb';

export class DynamoDBCharacterRepository implements CharacterRepository {
  private db = new DynamoDB.DocumentClient();

  async findById(id: string): Promise<Character | null> {
    const result = await this.db.get({
      TableName: 'StarWarsTable',
      Key: { id },
    }).promise();

    if (!result.Item) return null;
    return new Character(result.Item.id, result.Item.name, result.Item.height, result.Item.mass, result.Item.gender);
  }

  async findAll(): Promise<Character[]> {
    const result = await this.db.scan({ TableName: 'StarWarsTable' }).promise();
    return result.Items?.map(item => new Character(item.id, item.nombre, item.altura, item.peso, item.genero)) || [];
  }

  async save(character: Character): Promise<void> {
    await this.db.put({
      TableName: 'StarWarsTable',
      Item: character,
    }).promise();
  }
}
