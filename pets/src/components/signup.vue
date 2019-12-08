<template>
        <div class="signup">
            <!-- sign up form-->
            <input class="inputForm" type="text" v-model="name" placeholder="Name"><br>
            <input class="inputForm" type="email" v-model="email" placeholder="Email"><br>
            <input class="inputForm" type="password" v-model="password" placeholder="Password"><br>
            <input class="inputForm" type="tel"  pattern="[0-9]" maxlength="10" v-model="number" placeholder="Number"><br>
            <button class="btn btn-primary" @click="signUp">Sign Up</button><br>
            <span><router-link to="/login">Have an account? </router-link></span>
        </div>
</template>

<script>
import firebase from 'firebase';
import { ownersRef} from '../database.js';

export default {
    name: 'signup',
    data() {
        return {
            email: '',
            password: '',
            name:'',
        }
    },
    methods: {
        //sign a user up
        signUp(){
            //add user to firebase authentication
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                (user)=>{
                    this.user = true;
                    this.$router.replace('owner');
                //add user to firebase database
                    ownersRef.push({
                        email: this.email,
                        number: this.number,
                        name: this.name,
                    });
            //if error occurs and account cannot be created, returns error message
                },
                (err)=>{
                    alert('Failed to create account. '+err.message)
                })
        }
    }
}
</script>

<style scoped>
    /* styling for sign up panel*/
    .signup {
        margin-top: 40px;
        padding-top:20px;
        padding-bottom:20px;
    }
    /* styling for input */
    input {
        margin: 5px 0px;
    }
    /* styling for sign up button */
    button {
        margin-top: 20px;
        width: 10%;
        cursor: pointer;
    }
    /* styling for input form */
    .inputForm{
        border: 1px solid grey;
        border-radius: 5px;
        padding: 5px 5px 5px 5px
    }
    /* styling for login button */
    #loginButton{
        width:100px;
        height:40px;
        margin-left:10px;
        margin-bottom:15px;
    }
</style>
