import mongoose from 'mongoose';

const ItemScheme = new mongoose.Schema({
    title: { type: String }
})

export default mongoose.models.Item || mongoose.model('Item', ItemScheme)