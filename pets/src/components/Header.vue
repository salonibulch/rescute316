<template>
<div id="Header">
    <h1>ResCute</h1>
    <!-- navigation bar-->
    <img class="imagedog" src="https://firebasestorage.googleapis.com/v0/b/rescute-95042.appspot.com/o/images%2Fdog.jpg?alt=media&token=9d8120d3-c1dc-4809-805f-b1125bfd85d4">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav nav-fill w-100">
        <li class="nav-item active">
            <router-link class="routerLink" to='/'><a id="home">Home</a></router-link>
        </li>
        <li class="nav-item" v-if='!currentUser.loggedIn'>
           <router-link to="/login">Login</router-link>
        </li>
        <li class="nav-item" v-if="currentUser.loggedIn">
           <router-link to="/owner">Your Profile</router-link>
        </li>
        <li class = "nav-item" v-if="currentUser.loggedIn" @click="logout">
            <router-link to="/">Log Out</router-link>
        </li>
        </ul>
        </div>
    </nav>
</div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        computed: {
           currentUser(){
               return this.$store.state.currentUser;
           },
        },
        name: "Header",
        data () {
            return {
            }
        },
        methods: {
            logout: function () {
            firebase.auth().signOut().then(
                () => {
                this.$router.replace('/')
                }
            )},
            created: function() {
                 this.user = firebase.auth().currentUser || false;
            },
        }
    }
</script>

<style scoped>
    h1 {
    @import url('https://fonts.googleapis.com/css?family=Lilita+One&display=swap');
    font-family: 'Lilita One', cursive;
    font-size: 70px;
    margin-left:10px;
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
    .imagedog {
        width: 20%;
    }
</style>
