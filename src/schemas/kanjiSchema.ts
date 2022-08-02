import joi from "joi";

const kanjiSchema = joi.object({
  kanji: joi.string().required(),
  grade: joi.number().required()
});

export default kanjiSchema