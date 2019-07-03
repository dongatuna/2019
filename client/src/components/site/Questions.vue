<template>
  <section>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-sm-4">
          <div class="float-right mb-3">          
            <button class="btn btn-outline-primary btn-lg" type='submit' @click="getTest(70)">Take Exam</button>
          </div>
          <div>
            <h5 class="lead"><strong>CNA and HCA written exam</strong></h5>     
         </div>

          <div v-for="(que,index) in questions" :key="index">
            <div v-if="index >= start && index <= finish">
              <table class="table table-striped" >
                <thead>
                  <tr>
                    <th scope="col">{{index+1}} : {{que.question}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(choice, choiceindex) of que.choices" :key="choiceindex">
                    <td>
                      <strong>{{choices[choiceindex]}}: </strong> <input type ="radio" :name ="`${index}`" :value="choiceindex" v-model="answers[index]" required>~ {{choice}}
                    </td>
                  </tr>
                  <div v-if="graded && answers[index]!==que.answer">
                    <i class="fas fa-times text-success"></i> <p class="text-danger">
                     <i>The answer is {{choices[que.answer]}}. </i> {{que.rationale}}</p>
                  </div>  
                </tbody>
                <br>
              </table>
            </div>
          </div>     
         
        <div class="float-right" v-if="questions.length===10">
          <button class="btn btn-primary" @click="grade" type="submit">Grade Quiz</button>
        </div>
        <div class="float-right" v-else>
          <button class="btn btn-primary" @click="grade" type="submit">Grade Test</button>
        </div>

          <div v-if="graded">
            <strong class="text-success"> You scored: {{score}} / {{questions.length}} </strong>
          </div>

          <nav v-if="questions.length > 10" aria-label="Page navigation example">
            <ul class="pagination justify-content-center">                            
              <li v-if="(questions.length - (finish+1) ) > 0" class="page-item"><a class="page-link" @click.prevent="next()">Next</a></li>

              <template v-for="(number) in pageNumbersArr(pageNumbers)">
                <li v-bind:class="{'page-item': true, 'active':(number == activePage)  }">
                  <a class="page-link" @click.prevent="goToPage(number)">{{number}}</a>
                </li>
              </template>

              <li v-if="start > 0" class="page-item"><a class="page-link" @click.prevent="previous()">Back</a></li>
            </ul>
            
          </nav>
        </div>
          <!-- <div class="col-sm-2 py-8" >
            
              <ul class="list-group">
                <li class="list-group-item active"><strong>Features</strong></li>
                <li class="list-group-item">Find Jobs</li>
                <li class="list-group-item">View Courses</li>
                <li class="list-group-item">Skill Videos</li>
                
              </ul>
          </div>            -->
      </div>      
    </div>
  </section>  
</template>

<script>

import QuestionService from "../../helpers/QuestionService"

export default {
  //props: ['quiz'],
  name: 'Questions',

   metaInfo: {
        title: 'Nurse Assistant and Home Care Questions',
        titleTemplate: 'Questions for Caregiver and Nurse Assistant'
        // meta: [
        //     {http-equiv: 'Content-Type', content: 'text/html; charset=utf-8'},
        //     {name: 'viewport'. content: 'width=device-width, initial-scale=1'},
        //     {name: 'description', content: 'Test and quiz questions to prepare for Nurse Assistant or Nurse Aide and Home Care Aide state license exams.'}
        // ],

        // links: [
        //     {rel: 'canonical', href: 'https://www.goexcelcna.com/questions'}
        // ]
    },

  data(){
      return{
        choices: ['A', 'B', 'C', 'D'],
        questions: [],
        answers: [],
        graded: false,
        score: 0,
        pageNum: 0,
        index: 0,
        page: [],
        start:0,
        finish:9,
        pageNumbers: 0,
        activePage: 1
      }
  },

  created(){
    const quiz = new QuestionService(10)

    quiz.randomizeQuestions()

    this.questions = quiz.questions;

  },

  methods: {
    
    goToPage(number){
      this.start = (number-1) * 10
      this.finish = number == this.pageNumbers ? this.questions.length - 1 : this.start + 9
      this.activePage = number
    },

    pageNumbersArr(number){
      let arr = []
      for( let i = 1; i <= number; i++ )
        arr.push(i);
        console.info( arr );
      return arr;
    },

    next(){
      if( this.finish != this.questions.length )
      {
        this.start = this.start + 10;
        this.finish = ((this.finish+10) >= this.questions.length) ? this.questions.length :  this.finish + 10;
        this.activePage = this.activePage + 1;
      }
        
    },

    previous(){
      //check whether you are less than 10
      //if( this.start ===0 && this.finish===9){}
      this.start = this.start > 0 ? this.start - 10 : 0;
      this.finish = this.start > 0 ? this.finish - 10 : 9;
      this.activePage = this.activePage - 1;
    },

    getTest(num){    

      const test = new QuestionService(num)

      this.questions = []
      this.graded = false
      this.score = 0
      this.answers = []

      test.randomizeQuestions()

      this.questions = test.questions
      
      this.pageNumbers = Math.ceil( this.questions.length/10 ) //4 

      //debugger
      //this.paginate(this.pageNum)
    },        

    

    addNum(){

      debugger
      this.pageNum++

      debugger
      this.paginate(this.pageNum)
    },

    reduceNum(){
      this.pageNum--

      this.paginate(this.pageNum)
    },

    answerSelected(questionNumber, answerChoice){

      this.answers[questionNumber] = answerChoice
    },

    grade(){

      if(this.answers.length === this.questions.length){

        const test = new QuestionService(this.questions.length)

        test.gradeTest(this.answers, this.questions)

        this.graded = test.score[0]

        this.score = test.score[1]
        
      }else{
          return alert('You must complete all the questions')
      }
    }
    
  }
}
</script>
