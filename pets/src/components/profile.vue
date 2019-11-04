<template>
    <div id="profile">
        <div id="container">
            <div id="profileInfo">
              <br>
              <b>Name: </b>
              <br>
              <b>age: </b>
              <br>
              <b>Breed: </b>
              <br>
              <b>Special care Instructions: </b>
              <br>
              <b>Contact Owner at: </b>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import { dataRef, storageRef } from "../database.js";
    export default {
        name: "profile",
        firebase:{
            data: dataRef
        },
        data() {
            return {
                name:'',
                age:'',
                breed:'',
                care:'',
                contact:'',
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
