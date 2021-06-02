const error=(err,req,res,next)=>{
    console.log(err);
    const status = err.statusCode ? err.statusCode : 500
    res.status(status).json({
        msg : err.message,stack:process.env.NODE_ENV ==='development' ? err.message : null
    })
}

module.exports = error