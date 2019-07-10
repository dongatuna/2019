<template>
    <section>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-sm-10" >
                    <p class="post-payment-text">
                        Thanks for posting on our site.  Here is your <a href="localhost:8080/view/{{postId}}">posting</a>. 
                                                  
                        Check out the job openings here and inquire from employers hiring if they offer training assistance.  
                    </p>
                </div>
            </div>
        </div>
    </section>    
</template>

<script>
export default {
    computed:{
        ...mapGetters([        
            "getPost",   "getFiles", "getFilesNames"
        ])
    }, 
    
    data(){
        return{
            postId: this.getPost._id
        }
    },

    // mounted : {

    // }
}
</script>

<style scoped>
.post-payment-text {
    white-space: pre-wrap;
}
</style>





