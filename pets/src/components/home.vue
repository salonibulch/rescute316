<template>
    <div id="home">
          <h1><b>All pets</b></h1>
          <router-link class="routerLink" to='/profile'><a id="profile">Click for example pet</a></router-link>
            <router-link class="routerLink" to='/login'><a id="login">Click for login</a></router-link>
    </div>
</template>

<script>
import axios from "axios";
import { donationsRef,dataRef } from "../database.js";
import firebase from "firebase";

    export default {
        name: "home",

        firebase: {
            //firebase references
            donations: donationsRef,
            data: dataRef
        },
    }
</script>
