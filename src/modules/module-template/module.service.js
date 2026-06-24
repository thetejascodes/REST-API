// Business logic layer - keep thin controllers and push rules here.

class ModuleService {
    static async create(payload) {
        // persist to DB via model
        // const created = await ModuleModel.create(payload)
        // return created
        return { id: 'example-id', ...payload }
    }

    static async list(query) {
        // apply pagination/filtering
        return []
    }
}

export default ModuleService