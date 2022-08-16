import joi from "joi";

const kanjiSchema = joi.object({
  kanji: joi.string().required(),
  grade: joi.any().required()
});

export default kanjiSchema