const getFileExtension = (fileName) => {
    if(typeof fileName !== "string") 
        throw new Error("Parameter to getFileName must be a fileName of type string")
    let extension = "";
    for(let i=fileName.length-1; i>=0; i--){
        if(fileName[i] === ".") break;
        extension += fileName[i];
    }
    return extension.split('').reverse().join('');
}

export default getFileExtension;