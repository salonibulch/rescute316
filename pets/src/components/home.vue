<template>
    <div id="home">
          <h1><b>All pets</b></h1>
          <router-link class="routerLink" to='/profile'><a id="profile">Click for example pet</a></router-link>
    </div>
</template>

<script>
import axios from "axios";
import { petsRef,ownersRef } from "../database.js";
import firebase from "firebase";

    export default {
        name: "home",

        firebase: {
            //firebase references
            pets: petsRef,
            owners: ownersRef
        },
    }
</script>
