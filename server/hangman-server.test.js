import hangmanServer from './hangman-server';
const { guessLetter, getNewWord } = hangmanServer;

const wordId = 2;

describe("getNewWord", () => {
  it("Should return a random number", () => {
    const { knownWord, wordId } = getNewWord();
    expect(wordId + '').toMatch(/^\d+$/);
  });
  it("Should return a word replaced with underscores", () => {
    const { knownWord, wordId } = getNewWord();
    expect(knownWord).toMatch(/^_+$/);
  });
});

describe("guessLetter", () => {
  it("Should throw error if non-letter is passed", () => {
    const usedLetters = '2';
    expect(() => {
      guessLetter({ wordId, usedLetters });
    }).toThrow(new Error('usedLetters must be A-Z'));
  });
  it("Should return true if letter is known, and the known word", () => {
    const usedLetters = 'B';
    const { correct, knownWord } = guessLetter({wordId, usedLetters});
    expect(correct).toBe(true);
    expect(knownWord).toBe('b____');
  });
  it("Should return false if is not known, and the known word", () => {
    const usedLetters = 'Z';
    const { correct, knownWord } = guessLetter({wordId, usedLetters});
    expect(correct).toBe(false);
    expect(knownWord).toBe('_____');
  });
  it("Should return true if last letter is known, and the known word", () => {
    const usedLetters = 'ZB';
    const { correct, knownWord } = guessLetter({wordId, usedLetters});
    expect(correct).toBe(true);
    expect(knownWord).toBe('b____');
  });
  it("Should all known letters in the word", () => {
    const usedLetters = 'IBS';
    const { correct, knownWord } = guessLetter({wordId, usedLetters});
    expect(knownWord).toBe('bi__s');
  });
});

