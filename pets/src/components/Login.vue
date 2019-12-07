<template>
        <div class="login">
            <input class="inputForm" type="text" v-model="email" placeholder="Email"><br>
            <input class="inputForm" type="password" v-model="password" placeholder="Password"><br>
            <button class="btn btn-primary" @click="logIn">Log In</button><br>
            <br>
            <!--redirect to sign up-->
            <span><router-link to="/signup">Sign Up</router-link></span>
        </div>
</template>

<script>
import firebase from 'firebase';
import { ownersRef } from '../database.js';
export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    firebase:{
        data: ownersRef
    },
    methods: {
        //log user in
        logIn(){
            //authenticate user
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user)=>{
                    this.user = true;
                    this.$router.replace('owner');
                },
                //returns error message if log in fails
                (err)=>{
                    alert('Failed to sign in. '+err.message);
                })
        }
    }
}
</script>

<style scoped>
/*   styling for login div*/
    .login {
        margin-top: 40px;
        padding-top:20px;
        padding-bottom:20px;
    }
/*    styling for login inputs */
    input {
        margin: 5px 0px;
    }
/*    styling for login button */
    button {
        margin-top: 20px;
        width: 15%;
        cursor: pointer;
    }
/*    styling for redirect to sign up button*/
    #signUpButton{
        width:100px;
        height:40px;
        margin-left:10px;
        margin-bottom:15px;
    }
/*    styling for input form*/
    .inputForm{
        border: 1px solid grey;
        border-radius: 5px;
        padding: 5px 5px 5px 5px
    }
</style>
