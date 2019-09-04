import mongoose from "mongoose"
const Schema = mongoose.Schema

const _model = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true })

export default class CarService {
    get repository() {
        return mongoose.model('car', _model)
    }
}