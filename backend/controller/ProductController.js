const products =require('../model/Product.js');

const createproducts =async(req,res) =>{
   try{
    

   }
   catch(err){}
}

const getProduct= async(req,res) =>{
    try{
        await products.find();
        res.status(200).json
    }
    catch(error){
      
    }
}
const updateProduct =async (req,res) =>{
    try{
        const updatedProduct=await products.findByIdAndUpdate(
            req.parms.id,
            req.body,
            {new:true}
        );
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteProduct =async (req,res) =>{
    try{
        await products.findByIdAndDelete(req.parms.id);
        res.status(200).json({message:'product deleted'})
    }
    catch (err){
    console.error(err);
    res.status(500).json({message: 'server error'})

    }
}

modue.exports={
    updateProduct,deleteProduct
}