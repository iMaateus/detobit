exports.findOne = async function (model, filter, options) {
    let query = resolveQuery(options)
    return await model.findOne(filter, query.projection)
}

exports.findMany = async function (model, filter, options) {
    let query = resolveQuery(options)
    console.log(filter);
    return await model.find(filter, query.projection, { skip: query.skip, limit: query.limit }).sort([[query.sort, query.asc]])
}

function resolveQuery(options){
    let query = {
        projection: options.projection,
        limit: options.limit,
        page: options.page,
        sort: options.sort,
        asc: options.asc
    }

    if (query.limit != null) query.limit = Number(query.limit);
    if (query.page != null) query.page = Number(query.page);

    query.limit = query.ignoreLimit ? null : query.limit == null || query.limit == 0 ? 1 : query.limit > 20 ? 20 : query.limit
    query.skip = query.ignoreLimit ? null : query.page == null || query.page == 0 ? null : query.limit * (query.page - 1)
    return query
}