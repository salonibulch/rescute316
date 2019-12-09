<template>
<div id="profile">
    <div id="container">
    <router-link class="routerLink" to='/owner'><a id="profile"><button id="backButton" class="btn">Back to your profile</button></a></router-link>
    <div id="profileInfo">
        <!--add profile picture-->
        <div id="addInfo">
          <p><b>Picture:</b></p>
                      <form id="form">
                                  <input type="file" id="userPictureInput">
                              </form>
                      <br>
            <p><b>Name:</b></p>
            <input v-model="name" type="text" placeholder="Dog Name">
            <br>
            <br>
            <p><b>Breed:</b></p>
            <input v-model="breed" type="text" placeholder="Dog Breed">
            <br>
            <br>
            <p><b>Age:</b></p>
            <input v-model="age" type="text" placeholder="Dog Age">
            <br>
            <br>
            <p><b>Special Needs:</b></p>
            <input v-model="needs" type="text" placeholder="Special Needs">
            <br>
            <br>
            <input type="submit" id="submitDog" class="submitButton" @click.prevent="submit">
        </div>
    </div>
        </div>
</div>
</template>

<script>
    import firebase from 'firebase'
    import { petsRef, storageRef } from "../database.js";
    export default {
        name: "profile",
        firebase:{
            pets: petsRef,
            storage: storageRef
        },
        data() {
            return {
                name:'',
                age:'',
                breed:'',
                needs:'',
                picture:''
            }
        },
        methods:{
        submit: function(event){
          var input = document.getElementById('userPictureInput');
          if(this.name==''|| this.breed==''|| this.age=='' || this.needs==''||input.files.length <= 0){
            alert('one of the fields was left empty. fill all fields before submitting')
          }
          else{
          var user= firebase.auth().currentUser;
          var file = input.files[0];
          // get reference to a storage location and
          storageRef.child('images/'+file.name).put(file).then(snapshot =>
            this.addpet(snapshot.downloadURL)
          );
          input.value = '';
        }
        },
        addpet: function(url){
          var user= firebase.auth().currentUser;
          petsRef.push({
            name: this.name,
            picture: url,
            age: this.age,
            breed: this.breed,
            specialneeds: this.needs,
            useremail: user.email,
            active: true,
          })
        this.name='';
        this.age='';
        this.breed='';
        this.needs='';
        }
        }

    }
</script>

<style scoped>
/* styling for profile information   */
    #profileInfo{
        display:inline;
        margin-top: 40px;
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
/*  styling for submit button*/
    .submitButton{
        height:32px;
        width: 70px;
        background-color:deepskyblue;
        color:white;
        border-radius: 5px;
        border:none;
        cursor:pointer;
    }
    #backButton{
        color: white;
        background-color: #d678a4;
        margin: 30px;
    }
    #backButton:hover {
        background-color: #ad577f;
        color: white;
    }
</style>
