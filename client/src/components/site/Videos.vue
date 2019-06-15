<template>
    <section>
        <div class="container-fluid">
            <div >
                <div class="row justify-content-around">
                    <h5>Select</h5>
                </div>
                <div class="row justify-content-center">
                    
                    <div  class="table col-md-7">
                        <table>  
                            <tbody v-for="(video, index) of videos" v-bind:key="index">
                                <tr v-if="(index+1) % 3 === 0">
                                    <td ><iframe :src="videos[index].url"> </iframe> <br><span class="lead-sm"> {{videos[index].title}}</span>  </td>
                                    <td ><iframe :src="videos[index-1].url"> </iframe> <br><span class="lead-sm"> {{videos[index-1].title}}</span>  </td>
                                    <td ><iframe :src="videos[index-2].url"> </iframe> <br><span class="lead-sm"> {{videos[index-2].title}}</span> </td>
                                </tr>    
                                <tr v-if="index>=videos.length -1">
                                    <td ><iframe :src="video.url"> </iframe> <br><span class="lead-sm"> {{video.title}}</span>  </td>                               
                                </tr>                             
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-2 " >
                
                        <ul class="list-group">
                            <li class="list-group-item active"><strong>Features</strong></li>
                            <li class="list-group-item">Find Jobs</li>
                            <li class="list-group-item">View Courses</li>
                            <li class="list-group-item">Written Exams</li>
                            
                        </ul>
                    </div>
                
                </div> 
               
                       
        </div>
        </div>
            
    </section>
</template>
<script>
import skills from '../../helpers/skills'
import SkillService from '../../helpers/SkillService'

export default {

    created(){
        const skill_videos = new SkillService()

        skill_videos.randomizeSkills()

        this.videos = skill_videos.allVideos
    },
    
    data(){
        return{
            videos: [],
            perRow: 3,
            rows: 3,
            remainder:  []
        }
    }
}
</script>

