
var grades = {};
var subjects = {};
var questions = {};
var answers = {};



// fetch json into these variable
fetch('/FrontEnd/Json/subjects.json')
.then((response) => response.json())
.then((json) => {
    subjects = json;
});
fetch('/FrontEnd/Json/grade.json')
.then((response) => response.json())
.then((json) => {
    grades = json;
    fillGrades();
});
fetch('/FrontEnd/Json/questions.json')
.then((response) => response.json())
.then((json) => {
    questions = json;
});
fetch('/FrontEnd/Json/answers.json')
.then((response) => response.json())
.then((json) => {
    answers = json;
});



function fillGrades() {
    let select = document.getElementById('grade');
    select.innerHTML = "";
    for (let i = 0; i < grades.length; i++) {
        let option = document.createElement('option');
        option.value = grades[i].identifier;
        option.text = grades[i].name;
        select.appendChild(option);
    }
    fillSubjects();
}

function fillSubjects() {
    let select = document.getElementById('subject');
    let grade = document.getElementById('grade').value;
    select.innerHTML = "";
    for (let i = 0; i < subjects[grade].length; i++) {
        let option = document.createElement('option');
        option.value = subjects[grade][i].identifier;
        option.text = subjects[grade][i].name;
        select.appendChild(option);
    }
}



function start() {
    let grade = document.getElementById('grade').value;
    let subject = document.getElementById('subject').value;
    let mode = document.getElementById('mode').value;

    if (mode == 'all_questions') {
        displayQuestions(grade, subject);
    }
    else if (mode == 'generate_qs_paper') {
        generateQsPaper(grade, subject);
    } else if (mode == 'all_questions_with_answers') {
        displayQuestionsAnswers(subject);
    }
}



function displayQuestionsAnswers(subject) {
    let all_questions = questions[subject];
    let dom_questionAnswers_container = document.getElementById('questionAnswers_container');
    dom_questionAnswers_container.innerHTML = "";

    for (let i = 0; i < all_questions.length; i++) {
        let qs_identifier = all_questions[i].identifier;


        let dom_question_container = document.createElement('div');
        dom_question_container.className = "question_container";
        dom_question_container.innerHTML = `
            <div class = "question">${all_questions[i].question}</div>
        `;
        let dom_answers = document.createElement('div');
        dom_answers.className = "answers";
        
        for (let j = 0; j < answers[qs_identifier].answers.length; j++) {
            let dom_aproach = document.createElement('div');
            dom_aproach.className = "aproach";

            dom_aproach.innerHTML = `
                    <div class="approachHeader">Approach ${j+1}</div>
                    ${answers[qs_identifier].answers[j]}
            `
            dom_answers.appendChild(dom_aproach);
        }
        dom_question_container.appendChild(dom_answers);
        dom_questionAnswers_container.appendChild(dom_question_container);
    }
        console.log(all_questions);
}