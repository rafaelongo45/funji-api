import joi from "joi";

const signupSchema = joi.object({
  username: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().valid(joi.ref('password')).required(),
  profileImage: joi.string().uri().required()
});

export default signupSchema;