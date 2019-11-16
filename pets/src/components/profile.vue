<template>
    <div id="profile">
        <div id="container">
            <div id="profileInfo">
              <br>
              <b>Name: </b>
              <p> {{name}} </p>
              <br>
              <b>age: </b>
                <p> {{age}} </p>
              <br>
              <b>Breed: </b>
                <p> {{breed}} </p>
              <br>
              <b>Special care Instructions: </b>
                <p> {{care}} </p>
              <br>
              <b> Owner Name: </b>
                <p> {{owner_name}} </p>
              <br>
              <b>Contact Owner at: </b>
                <p> {{contact}} </p>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import { petsRef } from "../database.js";
    export default {
        name: "profile",
        firebase:{
            pets: petsRef
        },
        data() {
            return {
                name:'',
                age:'',
                breed:'',
                care:'',
                owner_name:'',
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
