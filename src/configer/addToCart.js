import apiinput from "../common"
import { toast } from 'react-toastify'

const addToCart = async (e, id) => {
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(apiinput.addToCart.url, {
        method : apiinput.addToCart.method,
        credentials : "include",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            productid : id
        })
    })

    const responseData = await response.json()

    if (responseData.success) {
        toast.success(responseData.message)
    }

    if (responseData.error) {
        toast.error(responseData.message)
    }

    return responseData

}


export default addToCart