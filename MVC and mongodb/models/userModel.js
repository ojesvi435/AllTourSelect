const mongoose=require("mongoose");
const validator=require("validator")
const bcrypt=require("bcryptjs");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please tell us your name']
        },
        email:{
            type:String,
            required:[true,'Email ID cannot be empty'],
            unique:true,
            match:/.+\@.+\..+/,
            lowercase:true
        },
        photo:String,
        password:{
            type:String,
            required:[true,'Please provide a password'],
            minlength:8,
            select:false
        },
        passwordconfirm:{
            type:String,
            required:[true,'Please confirm your password'],
            validate:{
                //This only works on create and save
                validator:function(el){
                    return el===this.password
                }
            },
            message:"The passwords are not the same"
        },
        PasswordChangedAt:Date
});
userSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();
    this.password=await bcrypt.hash(this.password,12);
    this.passwordconfirm=undefined;
    next();
})

userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}
userSchema.methods.changedPasswordAfter=function(JWTTimestamp){
    if(!this.PasswordChangedAt)
    {
        const changeTimestamp=parseInt(this.PasswordChangedAt.getTime()/1000,10);
        console.log(this.PasswordChangedAt,JWTTimestamp)
        return JWTTimestamp < changeTimestamp;
    }
    //false means not changed
    return false;
}
const User=mongoose.model('User',userSchema);

module.exports=User;