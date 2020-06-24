"use strict"

// for και parse.json

let index = 0;
let tries = 0;
let score = 0;
let correct;

const app = document.querySelector('#app')




function nextQuestion(questions) {
  app.innerHTML = ''
  const q = document.createElement('h1')
  q.innerHTML = questions[index].question
  app.append(q)


  for (let answer of questions[index].answers) {
    let answer_div = document.createElement('div')
    answer_div.innerHTML = answer.text
    console.log(answer.text)
    answer_div.addEventListener('click', function() {
      correct = answer.correct
      document.querySelectorAll('#app div').forEach(x => x.style.background = "#f7f7f7")
      this.style.background = "#fbd46d"
    })
    app.append(answer_div)
  }


  const btn = document.createElement('button')
  btn.innerHTML = "Επόμενη"
  btn.style.background = 'red';
  btn.style.color = 'white';
  btn.style.width = '100px';
  btn.style.height = '40px';
  btn.style.borderRadius = "10px";
  btn.style.font = "Montserrat, sans-serif;"
  btn.addEventListener('mouseover', function() {
    this.style.background = "black"
  })

  btn.addEventListener('mouseout', function() {
    this.style.background = "red"
  })
  btn.addEventListener('click', function() {
    tries++;
    if (correct) score++
    index++;
    if (index >= questions.length) showScore()
    else nextQuestion(questions)

  })
  app.append(btn)
}

function showScore() {
 app.innerHTML = `<h1> Το σκορ σου είναι : ${score}/${tries}<h1>`
}



fetch('questions.json')
  .then(res => res.json())
  .then(questions => {
    nextQuestion(questions)
  })
  .catch(err => console.log(err))
