export function cropText(text:string, limit:number) {
    const textArr = text.split('')
    if (limit >= textArr.length) {
        return text
    }
    textArr.splice(limit)
    return textArr.join('') + "..."
}