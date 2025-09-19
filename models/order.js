import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderId : {
        type : String,
        required : true,
        unique :ture
    },
    email : {
        type : String,
        required : ture
    },
    orderItem : [
        {
             name : {
                type : String,
                required : ture
             },
             price : {
                type : Number,
                required : ture
             },
             quantity : {
                type : Number,
                required : ture
             },
             image : {
                type : String,
                required : ture
             }
        }
    ],
    date : {
        type : Date,
        default : Date.now
    },
    paymentId : {
        type : String,
         default : "Preparing"
    },
    notes : {
        type : String
    },
    name : {
        type : String,
        required : ture
    },
    address : {
        type : String,
        required : ture 
    },
    phone : {
        type : String,
        required : ture
    }
   
})

const Order = mongoose.model("orders".orderSchema);