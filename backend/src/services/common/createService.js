
exports.createService = async (CreateObj, Model)=>{
    return await Model.create(CreateObj);
}