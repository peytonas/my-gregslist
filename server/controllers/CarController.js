import express from 'express'
import ValueService from '../services/ValueService';

let _valueService = new ValueService().repository

export default class ValueController {
    constructor() {
        this.router = express.Router()
            //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
            .get('', this.getAll)
            .get('/:id', this.getById)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
    }

    async getAll(req, res, next) {
        try {
            let data = await _valueService.find({})
            return res.send(data)
        } catch (error) { next(error) }

    }

    async getById(req, res, next) {
        try {
            let data = await _valueService.findById(req.params.id)
            if (!data) {
                throw new Error("Invalid Id")
            }
            res.send(data)
        } catch (error) { next(error) }
    }

    async create(req, res, next) {
        try {
            let data = await _valueService.create(req.body)
            res.send(data)
        } catch (error) { next(error) }
    }

    async edit(req, res, next) {
        try {
            let data = await _valueService.findOneAndUpdate({ _id: req.params.id, }, req.body, { new: true })
            if (data) {
                return res.send(data)
            }
            throw new Error("invalid id")
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            await _valueService.findOneAndRemove({ _id: req.params.id })
            res.send("deleted value")
        } catch (error) { next(error) }

    }

}