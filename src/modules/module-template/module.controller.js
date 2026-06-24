import express from 'express'
import ModuleService from './module.service'
import CreateDto from './dto/create.dto'

class ModuleController {
    static async create(req, res, next) {
        try {
            const payload = CreateDto.validate(req.body)
            const result = await ModuleService.create(payload)
            return res.status(201).json({ data: result })
        } catch (err) {
            next(err)
        }
    }

    static async list(req, res, next) {
        try {
            const items = await ModuleService.list(req.query)
            return res.json({ data: items })
        } catch (err) {
            next(err)
        }
    }
}

export default ModuleController