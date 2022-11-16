exports.isValidQuery = (queryObject, arrayOfValidQueries) => {
    let valid = true
    const queryKeys = Object.keys(queryObject)
    queryKeys.forEach((key) => {
    if(!arrayOfValidQueries.includes(key)) valid = false
   })
   return valid
}