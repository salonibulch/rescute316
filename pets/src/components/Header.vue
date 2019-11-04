<template>
<div id="Header">
    <h1>ResCute</h1>
    <!-- navigation bar-->
    <div id="navbar">
        <div id="leftnav">
<!--            navigation to specific links based on roles, currently just text, will be buttons-->
            <a id="home">Home</a>
        </div>
        <div id="rightnav">
<!--            logging in and profile page-->
            <a id="login" >Login </a>
        </div>
    </div>
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
