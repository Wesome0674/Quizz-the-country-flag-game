let panels = {
    question: null,
    right: null,
    wrong: null,
    button: null,
    range: null,
    end: null,
};


let countries = [];
let Question = {};
let questionNumber = 1;
let questionTotal = 10;
let goodAnswer = 0;

const init = async () => {
    panels.question = document.querySelector('#question-panel')
    panels.right = document.querySelector('#right-panel');
    panels.wrong = document.querySelector('#wrong-panel');
    panels.button = document.querySelector('.button-panel');
    panels.range = document.querySelector('.range-panel');
    panels.end = document.querySelector('.end-panel');

    const reponse = await fetch('https://restcountries.com/v2/all')
    countries = await reponse.json();

    panels.question.querySelector('ul').addEventListener('click', ({ target }) => {
       if (target.matches('li')) {
        const userAnswer = target.innerHTML;
        checkAnswer(userAnswer);
       }
    });


    panels.button.querySelector('button').addEventListener('click', () => {
        if (questionNumber <= questionTotal){
            pickQuestion();
        switchPanel('question');
        } else {
            panels.end.querySelector('p').innerHTML = ` Your score is : ${goodAnswer} / ${questionTotal}`
            switchPanel('end')
        }
        
    });

   
   
    
    
    

    const pickQuestion = () => {
        Question = generateQuestion(countries);
    panels.question.querySelector('img').setAttribute('src', Question.flag);
    panels.range.querySelector('span').innerHTML = `Question: ${questionNumber} / ${questionTotal}`;
    const possibilitiesHtml = Question.possibilities.map((possibility) => {
        return `<li>${possibility}</li>`;
        });
    panels.question.querySelector('ul').innerHTML = possibilitiesHtml.join('');
    };
    
    pickQuestion();
   
    

    const switchPanel = (panel) => {
        switch (panel) {
            case 'rAnswer':
                panels.right.style.display = 'flex';
                panels.question.style.display = 'none';
                panels.wrong.style.display = 'none';
                panels.button.style.display = 'flex';
                break;
            case 'wAnswer':
                panels.wrong.style.display = 'flex';
                panels.right.style.display = 'none';
                panels.question.style.display = 'none';
                panels.button.style.display = 'flex';
                break;
            case 'question':
                    panels.question.style.display = 'flex';
                    panels.wrong.style.display = 'none';
                    panels.right.style.display = 'none';
                    panels.button.style.display = 'none';
                    break;
            case 'end':
                panels.question.style.display = 'none';
                panels.wrong.style.display = 'none';
                panels.right.style.display = 'none';
                panels.button.style.display = 'none';
                panels.end.style.display = 'flex';
                break;
            default:
                    panels.end.style.display = 'block';
                    panels.answer.style.display = 'none';
                    panels.question.style.display = 'none';
                    break;
        }
    };


    const checkAnswer = (userAnswer) => {
        console.log('userAnswer', userAnswer);
        if (userAnswer === Question.answer){
            panels.right.querySelector('span').innerHTML = `Correct answer, you're doing well, Let’s up to the next question !  `;
            switchPanel('rAnswer');
            goodAnswer++;
        } else{
            panels.wrong.querySelector('span').innerHTML = `Wrong, The correct Answer was ${Question.answer}`;
            switchPanel('wAnswer');
        };
        questionNumber++
    }
    
};

window.onload = init;