'use strict'

exports.findOne = async function (model, query) {
    return await model.findOne(query.expression, query.projection)
}

exports.findMany = async function (model, query) {
    query = resolveQuery(query)
    return await model.find(query.expression, query.projection, { skip: query.skip, limit: query.limit, sort: query.sort })
}

exports.insertOne = async function (model) {
    return await model.save()
}

function resolveQuery(query){
    query.limit = query.ignoreLimit ? null : query.limit == null || query.limit == 0 ? 1 : query.limit > 20 ? 20 : query.limit
    query.skip = query.ignoreLimit ? null : query.page == null || query.page == 0 ? null : query.limit * (query.page - 1)
    return query
}