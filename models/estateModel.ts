import mongoose from 'mongoose';

interface IEstate extends mongoose.Document {
  title: string;
  description: string;
  image: string;
}

const estateSchema = new mongoose.Schema<IEstate>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Estate = mongoose.models.Estate || mongoose.model<IEstate>('Estate', estateSchema);

export default Estate;
