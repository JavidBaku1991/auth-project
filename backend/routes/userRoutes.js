import express from 'express'

const router =express.Router();

router.get('/',(req,res)=>{
    res.json({
        message:'API is ok',
    })
})


export default router;