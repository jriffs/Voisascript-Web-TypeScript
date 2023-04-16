import { ElementValues } from "../interfaces/interfaces.js"

// getting elements with the "voisascript.com" keyword in them ...
const elementsArr: Element[] = [], valueArr: ElementValues[] = []

function checkChildren(elements: HTMLCollection): void {
    for (const element of elements) {
        elementsArr.push(element) 
        if (element.children.length > 0) {
            const elems = element.children
            checkChildren(elems)
        }
    }
}

function checkSyntax(elementArr: Element[]): void {
    elementArr.forEach(element => {
        if (element.localName !== 'script') {
            let nodes = element.childNodes
            nodes.forEach(node => {
                if (node.nodeValue !== null && node.nodeValue.includes('https://voisascript-file-storage.herokuapp.com/files/')) {
                    let text = `${node?.textContent?.split(' ').find((val) => val.includes('http'))}`                                         
                    valueArr.push({element: element, ID: `${element.id}`, text: `${text}`})                    
                }
            })
        }                    
    })
}

export function getElementsWithKeywords(elements: HTMLCollection): ElementValues[] {
    if (valueArr.length == 0) {
        checkChildren(elements)
        checkSyntax(elementsArr)
    }
    return valueArr
}
