import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../config/lib/mongodb/database';

const COLLECTION_NAME = 'questions_2009';

export class QuestionRepository {
  private async getCollection() {
    const db = await connectToDatabase();
    return db.collection(COLLECTION_NAME);
  }

  async findAll(): Promise<any[]> {
    const collection = await this.getCollection();
    return collection.find().toArray();
  }

  async findById(id: string): Promise<any> {
    const collection = await this.getCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async findByCompetencyId(competencyId: number): Promise<any> {
    const collection = await this.getCollection();
    return collection.findOne({ competency_id: competencyId });
  }
}