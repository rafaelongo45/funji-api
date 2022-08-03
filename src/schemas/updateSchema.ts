import joi from "joi";

const updateProfile = joi.object({
  profileImage: joi.string().uri().required()
});

export default updateProfile;