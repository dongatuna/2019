<template>
    <section class="bg-dark" >
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-12">                    
                    <h3 class="text-dark text-center">Job Posting Checkout</h3>
                    <br>
                    <!--BEGINNING OF THE FORM-->
                    <form ref="form" >
                            <!--FIRST AND LAST NAMES-->
                        <div class="row justify-content-center">
                            <div class="col-sm-4">                                
                                <div class="form-group">
                                    <label for="first">First Name</label>                                   
                                    <input  type="text" class="form-control" name="first" v-model="poster.first">
                                    <span class="text-danger" v-if="(errors['first'])"><small>{{errors['first']}}</small></span> 
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="last">Last Name</label>                                   
                                    <input type="text" class="form-control" name="last" v-model="poster.last">  
                                    <span class="text-danger" v-if="(errors['last'])"><small>{{errors['last']}}</small></span>                                  
                                </div>
                            </div>
                        </div>                               
                                               
                          <!--EMAIL AND TELEPHONE-->
                        <div class="row justify-content-center">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="email">Email</label>                                    
                                    <input type="email" class="form-control" name="email" v-model="poster.email">  
                                    <span class="text-danger" v-if="(errors['email'])"><small>{{errors['email']}}</small></span>                                     
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="tel">Telephone</label>                                 
                                    <input type="tel" class="form-control" name="tel" v-model="poster.tel"> 
                                    <span class="text-danger" v-if="(errors['tel'])"><small>{{errors['tel']}}</small></span>                                    
                                </div>
                            </div>
                        </div>                                    
 
                        <div class="row justify-content-center">
                            <div class="col-sm-8 p-3 bg-light">     
                                
                                <label for="card-element">
                                    Credit or debit card
                                </label>
                                <div id="card-element" ref="card-element" @change="cardErrors(event)">
                                <!-- A Stripe Element will be inserted here. -->
                                </div>

                                <!-- Used to display form errors. -->
                                <div id="card-errors" ref="card-errors" role="alert"></div>
                                <!-- <div ref="card" class="credit-card-inputs mb-2"  ></div> -->
                                <button class="btn btn-primary btn-block p-3 mt-3" type="submit" v-on:click.prevent="post"><strong>Pay $ 25.00 to post</strong> </button> 
                            </div>
                        </div>
                    </form>
                </div>                
            </div>
        </div>
    </section>
</template>


<script src="https://js.stripe.com/v3/"></script>
<script>
import Keys from '../../helpers/courses'    
import { store } from "../../store/store"
import {mapGetters, mapActions} from "vuex"

    let stripe = Stripe(`${Keys.stripeKeys.publishable_key}`),
        elements = stripe.elements()
        //card = undefined 

    let style = {

        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
            color: '#aab7c4'
            }
        },
        
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    }

    // Create an instance of the card Element.
    let card = elements.create('card', {style})

export default {

    computed:{
        ...mapGetters([
            "getUserId"
        ])
    },

    data(){
        return{
            errors: [],
            poster: {
                first: "",
                last: "",
                email: "",
                tel: ""
            }, 
           // registration: 25
        }
    },

    mounted(){        

        card.mount('#card-element')
    },

    
    methods: {

        // getFormData(obj) {
        //     const formData = new FormData()
        //     Object.keys(obj).forEach(key => formData.append(key, obj[key]))
        //     return formData
        // },
        

        async post(){

            //const formData = this.getFormData(this.getPost)                    
            
            if(this.checkForm()){

                const {token, error} = await stripe.createToken(card)                      
                                        
                let self = this

                if (error) {
                    self.hasCardErrors = true
                    self.$forceUpdate() // Forcing the DOM to update so the Stripe Element can update.
                    return
                }              

                const payload =  {stripeToken: token.id, poster: this.poster, post: this.getPost}

                this.getPost._id ? await this.$store.dispatch('editPost', this.getPost) : await this.$store.dispatch('addPost', payload)

                debugger
                //await this.$store.dispatch('addPost', payload)              

                this.$router.push({name: 'receipt'})    
                //alert('This is the token ', token)      

            }              
        },

        cardErrors(e){

            let cardErrors = this.$refs['card-errors']

            if (e.error) {
                cardErrors.textContent = e.error.message
            } else {
                cardErrors.textContent = ''
            }
        },

        checkForm() {
   
            this.errors = []

            if (!this.poster.first) {
                this.errors['first'] = "Please enter your first name."
            }

            if (!this.poster.last) {
                this.errors['last'] = "Please enter your last name."
            }

            if (!this.poster.email) {
                this.errors['email'] = "Please enter your email address."
            }         

            if (!this.poster.tel) {
                this.errors['tel'] = "Please enter your phone number."
            }                    

            if (this.errors.length == 0 &&
                this.poster.last &&
                this.poster.first &&
                this.poster.tel &&
                this.poster.email 
            ){
                return true
            }
        },
    }
    
}
</script>

<style scoped>

   
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  /* border: 1px solid transparent; */
  border: 2px solid green;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

</style>

