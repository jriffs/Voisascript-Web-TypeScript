export function convertURIToBinary(dataURI: string) {
    let base64 = dataURI.split(';base64,')[1]
    let raw = window.atob(base64);
    let rawLength = raw.length;
    let arr = new Uint8Array(new ArrayBuffer(rawLength));
  
    for (let i = 0; i < rawLength; i++) {
      arr[i] = raw.charCodeAt(i);
    }
    return arr;
}
