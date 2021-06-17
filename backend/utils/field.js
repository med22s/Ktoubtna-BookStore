setUpObjectFields = (payload, fields) => {
    let result = {};
    fields.map((field) => {
    if (payload[field]) result[field] = payload[field];
    });
    return result;
};

module.exports = {
    setUpObjectFields
}