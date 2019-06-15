import questions from './questions'

class QuestionService {

    constructor(num){
        this._number = num
        this._score = 0
        this._test = []
        this._graded = false
        this._pageNum = 0
        //this._pages = []
    }

    get score() {        
        return [this._graded, this._score]
    }

    get graded(){
        return this._graded
    }

    get questions () {

        return this._test
    }

    randomizeQuestions(){
        for(let index = 0; index < this._number; index++){

            const qIndex = Math.floor(Math.random() * 724);
            //console.log( qIndex );
           // debugger
            if(!this._test.includes(questions[qIndex])){
                this._test.push(questions[qIndex])
            }
        }      

        if(this._test.length < this._number){           
            
            this.randomizeQuestions()
        } else {

            this._test = this._test.slice(0 ,70)
        }
    }    

    gradeTest(userAnswers, testAnswers){
       
        for (let index = 0; index < this._number; index++){            
            
            if(userAnswers[index]===testAnswers[index]["answer"]){
                this._score++
            }
        }

        this._graded = true
        
    }
}

export default QuestionService