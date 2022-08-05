function getRandomCollection(){
  const collectionArray = ['joyo', 'jouyou', 'jinmeiyo', 'jinmeiyou', 'grade-1', 'grade-2', 'grade-3', 'grade-4', 'grade-5', 'grade-6', 'grade-8'];
  const randomInt = randomizer(collectionArray.length);
  return collectionArray[randomInt]
}

function randomizer(max: number) {
  return Math.floor(Math.random() * max)
};

const kanjisCollection = {
  getRandomCollection
};

export default kanjisCollection;