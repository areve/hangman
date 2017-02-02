import express from 'express'
const words = [
  'antidisestablishmentarianism',
  'bikes',
  'cheeseburgers',
  'crackerjack',
  'fusion',
  'mammalian'
];

const app = express();

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
 });

app.get('*', (req, res) => {
  res.send('Hangman server is running');
});

app.post('/getNewWord', (req, res) => {
  console.log('getNewWord');
  let result = getNewWord();
  console.log(' =>', result);
  res.send(result);
});

app.post('/guessLetter', (req, res) => {
  console.log('guessLetter', req.query);
  let result = guessLetter(req.query);
  console.log(' =>', result);
  res.send(result);
});

app.listen(3000, () => {
  console.log('Hangman server islistening on port 3000')
});

function getNewWord() {
  let wordId = ~~(Math.random() * words.length) + 1;
  let word = words[wordId - 1];

  const matchLetter = /[A-Z]/ig;
  let knownWord = word.replace(matchLetter, '_');

  return { knownWord, wordId };
}

function guessLetter({wordId, usedLetters}) {
  const matchNotLetter = /[^A-Z]/ig;
  if (matchNotLetter.test(usedLetters)) throw new Error('usedLetters must be A-Z');

  let word = words[wordId - 1];
  const matchLastLetter = new RegExp('[' + usedLetters.slice(-1) + ']', 'gi');
  let correct = matchLastLetter.test(word);

  const matchUnknown = new RegExp('[^' + usedLetters + ']', 'gi');
  let knownWord = word.replace(matchUnknown, '_');

  return { correct, knownWord };
}

export default { getNewWord, guessLetter }