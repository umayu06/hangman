const questions = ['Garden city of India', 'Largest island in the world', 'Gods own country', 'Heaven in earth'];
const answers = ['bangalore', 'greenland', 'kerala', 'kashmir'];
const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K','L','M', 'N', 'O', 'P','Q','R','S','T','U','V','W','X','Y','Z']
const screen = document.getElementById('game');
let num, words;
let lives = 10;
let gameStatus = 1;

function init() {
  screen.addEventListener('click', start);
}
init();

function start() {
  document.getElementById('startMsg').style.display = 'none';
  document.getElementById('main').style.display = 'block';
  document.getElementById('game').style.cursor = 'auto';

  generateRandomQuestion();
  displayAlphabets();
  handleAnswer();
}
function displayAlphabets() {
  let parent = document.getElementById('alphabets');

  for (const [alpha, index] of alphabets){
    const child = document.createElement('li');
    child.classList.add('alphaList');
    child.append(document.createTextNode(alpha));
    child.onclick = function(){
      if(!gameStatus) return;

      let guess = child.innerHTML;
      let startIndex = 0;
      let wordIndex = words.indexOf(guess);
  
      if(wordIndex == -1){
        lives--;
        child.innerHTML = '    ';
        if (lives == 0) {
          document.getElementById('lives').innerHTML = 'GAME OVER';
          gameStatus = 0;
          document.getElementById('playAgain').style.display = 'block';
          return;
        }
        document.getElementById('lives').innerHTML = `${lives} lives left.`
      }

      while(wordIndex != -1){
        child.innerHTML = '    ';
        startIndex = wordIndex + 1; 
        document.getElementById('answers').childNodes[wordIndex].innerHTML = guess;
        words[wordIndex] = 0;

        if(words.every((val) => val === 0)){
          document.getElementById('lives').innerHTML = 'GAME WON';
          gameStatus = 0;
          document.getElementById('playAgain').style.display = 'block';
        }
        wordIndex = words.indexOf(guess, startIndex);
      }

    }
    parent.append(child);
  }
  screen.removeEventListener('click', start);
}
function generateRandomQuestion() {
  num = Math.floor(Math.random() * 4);
  const question = questions[num];
  document.getElementById('question').innerHTML = question;
}

function handleAnswer() {
  let parent = document.getElementById('answers');
  const answer = answers[num];
  words = answers[num].toUpperCase().split('');

  for (let i = 0; i<answer.length; i++ ){
    const child = document.createElement('li');
    child.classList.add('answer');
    child.append(document.createTextNode('_'));
    parent.append(child);
  }
}
function playAgain(){
  window.location.reload();
}
