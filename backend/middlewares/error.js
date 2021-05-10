const error=(err,req,res,next)=>{
    const status=res.statusCode===200 ? 500 : res.statusCode
    res.status(status).json({msg:err.message,stack:process.env.NODE_ENV ==='development' ? err.message : null})
}

export default error