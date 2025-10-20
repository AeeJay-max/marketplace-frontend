const picto64 = async(image) =>{
    const reader = new FileReader()
    reader.readAsDataURL(image)

    const data = await new Promise((resolvePath,reject)=>{
        reader.onload = () => resolvePath(reader.result)

        reader.onerror = error => reject(error)
    })

    return data

}


export default picto64