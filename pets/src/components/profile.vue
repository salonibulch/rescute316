<template>
<div id="profile">
    <div id="container">
    <div id="profileInfo">
        <!--add profile picture-->
        <div id="addInfo">
            <p><b>Add Dog Picture:</b></p>
            <form id="form" @submit.prevent="storeUserImage">
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
                needs:'',
            }
        },
        methods:{
        submit(){
          if(this.name==''|| this.breed==''|| this.age=='' || this.needs==''){
            alert('one of the fields was left empty. fill all fields before submitting')
          }
          else{
          petsRef.push({
            name: this.name,
            age: this.age,
            breed: this.breed,
            picture: document.getElementById('userPictureInput'),
            specialneeds: this.needs,
            useremail:'temp@gmail.com'
            })
            this.name='';
            this.age='';
            this.breed='';
            this.needs='';
        }
        },
        }

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
