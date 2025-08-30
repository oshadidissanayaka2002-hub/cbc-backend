import Product from "../models/product.js"; 

export function getProduct(req,res){
    Product.find().then(
        (productList)=>{
            res.json({
                list : productList
            })
        }
    )
}

export function createProduct(req,res){

    console.log(req.user)

    if(req.user == null){
        res.json({
            message: "Youare not logged in"
        })

        return
    }

    if(req.user.type != "admin"){
        res.json({
            message:"you are not an admin"
        })
        return  
    }

    const product = new Product(req.body)

    product.save().then(()=>{
        res.json({
            message: "Product created"
        })
    })
}

export function deleteProduct(req,res){
    Product.deleteProduct({name : req.params.name}).then(
        ()=>{
            res.json(
                {
                    message:"Product deleted successfully"
                }
            )
        }
    )
}

export function getProductByName(req,res){
    const name = req.params.name;

    Product.find({name:name}).then(
        (productList)=>{
            res.json({
                list : productList
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"Error"
            })
        }
    )
}