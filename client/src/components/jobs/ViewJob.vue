<template>
    <section class="bg-light">
        <div class="container-fluid">

            <!-- <div id="fb-root"></div> -->

            
            <meta property="og:url"           content="http://localhost:8080/jobs"/>
            <meta property="og:type"          content="website" />
            <meta property="og:title"         content="CNA and Caregiver Jobs @ Excel Health Careers Training" />
            <meta property="og:description"   content="CNA and Caregiver Jobs @ Excel Health Careers Training" /> 
            <!-- <meta property="og:image"         content="https://www.your-domain.com/path/image.jpg" /> -->
            <div class="row justify-content-center p-3">
                <div class="col-md-8 col-sm-8">
                <div class="card lead">
                    <div class="card-body">
                        <h4 class="card-title py-3"><strong>{{getPost.title}}</strong></h4>
                        <h5><strong>Location: </strong><span class="text-muted">{{getPost.location}}</span> </h5>
                        <h5><strong>Contact: </strong><span class="text-muted">{{getPost.contact}}</span> </h5>
                        <hr>

                        <h5>Description</h5>
                            <p class="card-text">{{getPost.description}}</p>
                        <h5>Requirements</h5>    
                            <p class="card-text">{{getPost.requirements}}</p>
                        
                        
                        <!-- <div class="row justify-content-between m-3">
                            <button class="btn btn-secondary col-md-3 col-sm-10" type="submit" v-on:click="editPost">Edit</button>
                            <button class="btn btn-primary col-md-3 col-sm-10" type="submit" v-on:click="addPost">Post</button>
                        </div> -->

                        <hr>

                        <div class="py-2 text-right">                    
                            <p class="px-3"><strong>Share on: </strong></p>

                            <!-- <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" 
                            data-layout="button" data-size="large">
                            <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" 
                            class="fb-xfbml-parse-ignore">Share</a></div> -->

                            <!-- Your share button code -->
                            <div class="fb-share-button" 
                                data-href="http://cnn.com" 
                                data-layout="button">
                            </div>




                            <a href="#"><i class="far fa-envelope fa-2x text-secondary mx-3"></i></a>
                                                      
                        </div>                    
                    </div>
                </div>                
            </div>
        </div>
        </div>
        
    </section>    
</template>

<script>

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

import { mapGetters } from 'vuex'
import { store } from "../../store/store"

export default {
    data(){
        return{
            id: this.$route.params.id
        }
    },
    computed:{
        ...mapGetters([
            "getPost"
        ])
    },
    created(){
        this.$store.dispatch("getPostById", this.id)
    }
    
}
</script>

<style scoped>
.card-text {
    white-space: pre-wrap;
}

</style>