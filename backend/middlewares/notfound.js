const notfound=(req,res,next)=>{
    res.status(404)
    next(new Error(`Error: ${req.originalUrl} not found`));
}

module.exports=notfound