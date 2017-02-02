import 'angular-resource';

export default function hangmanService($resource) {

  return $resource('http://localhost:3000/', {}, {
    guessLetter: {
      method:'POST',
      url: 'http://localhost:3000/guessLetter'
    },
    getNewWord: {
      method:'POST',
      url: 'http://localhost:3000/getNewWord'
    }
  });
}

hangmanService.$inject = ['$resource'];