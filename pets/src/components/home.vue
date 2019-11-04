<template>
    <div id="home">
          <h1><b>All pets</b></h1>
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
