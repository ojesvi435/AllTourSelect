module.exports=fn=>{
    return(req,res,next)=>{
  fn(req,res,next).catch(next)//no way of knowing req,res,next
    };
  };

   // const catchAsync=fn=>{
// //   return(req,res,next)=>{
// // fn(req,res,next).catch(err=>next(err))//no way of knowing req,res,next
// //   };
// // };