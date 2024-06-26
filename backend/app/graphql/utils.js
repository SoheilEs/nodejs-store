const { Kind } = require("graphql")
const parseValueNode = (valueNode)=>{
    switch(valueNode.kind){
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return +valueNode.value
        case Kind.OBJECT:
            return parseObject(valueNode.value)
        case Kind.LIST:
            return valueNode.values.map(parseValueNode)
        default:
            return null

    }
}

const parseObject = (valueNode)=>{
    const value = Object.create(null)
    valueNode.fields.forEach(field =>{
        value[field.name.value] = parseValueNode(field.value)
    })
    return value
}
const toObject = value =>{
    if (typeof value === "object") return value
    if(typeof value === "sring" && value.charAt(0) === "{") return JSON.parse(value)
    return null
}
const parseLiteral = valueNode =>{
    switch(valueNode.kind){
        case Kind.STRING:
            return valueNode.value.charAt(0) === "{" ? JSON.parse(valueNode.value): valueNode.value
        case Kind.INT:  
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
            return parseObject(valueNode.value)
    }
}

module.exports = {
    parseValueNode,
    parseObject,
    toObject,
    parseLiteral
}