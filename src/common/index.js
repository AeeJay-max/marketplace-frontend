const backendDomain = "https://marketplace-backend-hfvm.onrender.com"

const apiinput = {
    signup : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signin : {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    details1 : {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout : {
        url : `${backendDomain}/api/log-out`,
        method : "get"
    },
    alluser : {
        url : `${backendDomain}/api/all-users`,
        method : "get"
    },
    userUpdate : {
        url : `${backendDomain}/api/update-user`,
        method : "post"
    },
    uploadingProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : "post"
    },
    allProducts : {
        url : `${backendDomain}/api/get-products`,
        method : "get"
    },
    updatedProduct : {
        url : `${backendDomain}/api/update-productinfo`,
        method : "post"
    },
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`,
        method : "get"
    }, productCategory : {
        url : `${backendDomain}/api/category-product`,
        method : "post"
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`,
        method : "post"
    },
    addToCart : {
        url : `${backendDomain}/api/addtocart`,
        method : "post"
    },
    countCart : {
        url : `${backendDomain}/api/countcart`,
        method : "get"
    },
    cartviewproducts : {
        url : `${backendDomain}/api/cartproductview`,
        method : "get"
    },
    updateProductQuantity : {
        url : `${backendDomain}/api/update-quantity`,
        method : "post"
    },
    deleteProductCart : {
        url : `${backendDomain}/api/deleteproductcart`,
        method  : "post"
    },
    searchitems : {
        url : `${backendDomain}/api/search`,
        method : "get"
    },
    filteritems : {
        url : `${backendDomain}/api/filter-products`,
        method : "post"
    }
}

export default apiinput