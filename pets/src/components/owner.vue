<template>
    <div id="owner">
        <div id="container">
            <div id="ownerInfo">
              <br>
              <router-link class="routerLink" to='/profile'><a id="profile">Click to add pet</a></router-link>

              <b>Name: </b>
              <p> {{name}} </p>
              <br>
              <b>Email: </b>
                <p> {{email}} </p>
              <br>
              <b>Number: </b>
                <p> {{number}} </p>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import { ownersRef } from "../database.js";
    export default {
        name: "profile",
        props:{
          name:{
            type: String,
            required: true
            },
        },
        firebase:{
            owners: ownersRef
        },
        mounted(){
        this.name = this.$router.params.name
        },
        data() {
            return {
                email:'',
                name:'',
                number:'',

            }
        },

    }
</script>

<style scoped>
/* styling for profile information   */
    #profileInfo{
        display:inline;
        margin-left: 55px;
        margin-top: 10px;
    }
/*  styling for profile div */
    #container{
        margin-top:50px;
        border-left: 1px solid black;
        border-right: 1px solid black;
        width:600px;
        margin: 0 auto;
        height: 650px;
    }
</style>
