const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    if (!this.select(letter) || this.incorrectLetters.includes(letter)) {
      return
    } else if (this.word.includes(letter)) {
      this.correctLetters.push(letter)
      const match = []
      for (let i = 0; i < this.word.length; i++) {
        if (letter === this.word[i]) {match.push(i)}
      }
      match.forEach((index) => {this.displayWord = `${this.displayWord.substring(0, index)}${letter}${this.displayWord.substring(index + 1)}`})
    } else {
      this.incorrectLetters.push(letter)
      this.remainingGuesses = this.remainingGuesses -1
    }
  }

  // implement the updateScreen function:
  updateScreen() {
    const h2 = document.getElementById('word-to-guess')
    h2.innerHTML = this.displayWord
    const spanIncorrectLetters = document.getElementById('incorrect-letters')
    spanIncorrectLetters.innerHTML = this.incorrectLetters
    const spanRemainingGuesses = document.getElementById('remaining-guesses')
    spanRemainingGuesses.innerHTML = this.remainingGuesses
  }

  // implement the isGameOver function:
  isGameOver() {
    if (this.displayWord !== this.word && this.remainingGuesses > 0) {
      return false
    }
    return true
  }

  // implement the getWinOrLoss function:
  getWinOrLoss() {
    if (this.displayWord === this.word && this.remainingGuesses > 0) {
      return 'win'
    } else if (this.displayWord !== this.word && this.remainingGuesses <= 0) {
      return 'loss'
    } else if (this.displayWord !== this.word && this.remainingGuesses > 0) {
      return null
    }
  }
  select(keys) {
    return /^[a-z]/.test(keys)
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()