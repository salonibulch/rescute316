<template>
<div id="Header">
    <h1>ResCute</h1>
    <!-- navigation bar-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav nav-fill w-100">
        <li class="nav-item active">
            <router-link class="routerLink" to='/'><a id="home">Home</a></router-link>
        </li>
        <li class = "nav-item" @click="logout">
            <router-link to="/">Log Out</router-link> 
        </li>
        <li class="nav-item">
           <router-link to="/login" active-class="login">Login</router-link>
        </li>
        </ul>
        </div>
    </nav> 
</div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: "Header",
        data () {
            return {
            }
        },
        methods: {
            logout: function () {
            firebase.auth().signOut().then(
                () => {
                this.$router.replace('home')
                }
            )},
            created: function() { 
                 this.user = firebase.auth().currentUser || false;
            },
        }
    }
</script>

<style scoped>
    h1{
        font-size: 50px;
        margin-bottom: 20px;
    }
    /*styling for each link in header nav */
    #home{
        padding-top:12px;
        padding-bottom:12px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #home:hover{
        background-color: #d3edf8;
        cursor: pointer;
    }
    #login{
        padding-top:12px;
        padding-bottom:12px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #login:hover{
        background-color: #d3edf8;
        cursor: pointer;
    }
    #navbar {
        background-color:skyblue;
        overflow: hidden;
        padding-top:5px;
        padding-bottom:5px;
    }
/*    styling for left nav */
    #leftnav{
        margin-left:20px;
        padding-top:5px;
        padding-bottom:5px;
        display: inline-block;
        float: left;
    }
/*    styling for right nav*/
    #rightnav{
        margin-right:20px;
        padding-top:5px;
        padding-bottom:5px;
        display: inline-block;
        float:right;
    }
</style>
