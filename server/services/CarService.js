import mongoose from "mongoose"
const Schema = mongoose.Schema

const _model = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    imgUrl: { type: String, required: false },
    price: { type: Number, required: true },
}, { timestamps: true })

export default class CarService {
    get Repository() {
        return mongoose.model('car', _model)
    }
}