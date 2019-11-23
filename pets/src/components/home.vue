<template>
    <div id="home">
          <h1><b>All pets</b></h1>
          <router-link class="routerLink" to='/profile'><a id="profile">Click for example pet</a></router-link>
          <div id="listOfCharities">
          <div id="container" class="container">
              <div class="col">
                  <div id="row" class="row">
  <!--                    single charity entry creation-->
                      <div id="singleCharity" class="col-sm-4" v-for="pet in pagedData">
                              <h5>{{ pet.name }}</h5>
                              <p>{{ pet.age }}</p>
                              <div id="learnMore">
                                  <button class="btn btn-success" @click="moreInfo(pet.name,pet.age,pet.breed,pet.user-email)">Learn More</button>
                              </div>                              <br>
                              <div id="infoModal">

                                <!-- Creating a modal for learning more about the charity-->
                                  <div class="modal-content">
                                      <span class="closeButton" @click="closeInfo">&times;</span>
                                    <div class="infoHeader">
                                      <h2><b>{{petName}}</b></h2>
                                        <hr>
                                    </div>
                                      <div class="infoBody">
      <!--                                  information in the modal-->
                                        <br>
                                      <h4>Age</h4>
                                        {{petAge}}
                                        <br>
                                        <br>
                                      <h4>Breed</h4>
                                        {{petBreed}}
                                        <br>
                                        <br>
                                      <h4>Owner Email <b>{{petOwnerEmail}}</b></h4>
                                        <br>
                                        <br>

                                      </div>
                                    </div>
                                    </div>
                                </div>
                            </div>

                      </div>
                  </div>

            <ul class="pageChangeNav">
                        <li>
    <!--                        button for navigation-->
                            <button class="pageChange" :disabled="pageNumber === 0" @click="prevPage">
                                <a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
                            </button>
                        </li>
                        <li v-for="p in pageRange">
                            <button class="pageChange" @click="pageChange(p)" :id="activePage(p)"><a href="#">{{ p }}</a></button>
                        </li>
                        <li>
                            <button class="pageChange" :disabled="pageNumber >= pageCount -1" @click="nextPage">
                                <a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>
                            </button>
                        </li>
            </ul>

    </div>
    </div>
</template>

<script>
import { petsRef,ownersRef } from "../database.js";
import firebase from "firebase";

    export default {
        name: "home",

        firebase: {
            //firebase references
            pets: petsRef,
            owners: ownersRef
        },
        data(){
          return{
          pageNumber: 0,
          pageSize: 12, //number of charities on each page
          visiblePages: 5,
          petName: '',
          petAge:'',
          petBreed:'',
          petOwnerEmail:'',
          petPicture:'',
          }
        },
        computed:{
          //returns pets from firebase data
          getPets(){
              return this.pets;
          },
          pageCount(){
              var l = this.pets.length
              var s = this.pageSize;
              return Math.floor(l/s);
          },
          pagedData(){
              const start = this.pageNumber * this.pageSize,
              end = start + this.pageSize;

              return this.pets.slice(start, end);
          },
          //number of pages
          pageRange () {
              let start = this.pageNumber - this.visiblePages / 2 <= 0
              ? 1 : this.currentPage + this.visiblePages / 2 > this.lastPage
              ? Util.lowerBound(this.pageCount - this.visiblePages + 1, 1)
              : Math.ceil(this.pageNumber - this.visiblePages / 2)
              let range = []
              for (let i = 0; i < this.visiblePages && i < this.pageCount; i++) {
                  range.push(start + i-1)
              }
              return range
          }
        },
        methods: {
            //go to next page
            nextPage(){
                this.pageNumber++;
            },
            //go to prev page
            prevPage(){
                this.pageNumber--;
            },
            pageChange(p){
                this.pageNumber=p;
            },
            //highlight the active page
            activePage (page) {
                return this.pageNumber === page ? 'active' : '';
            },
            moreInfo(name, age, breed, userEmail){
            var modal = document.getElementById('infoModal');
            modal.style.display = "block";
            this.petName=name;
            this.petAge=age;
            this.petBreed=breed;
            this.petOwnerEmail=userEmail;
            },
            closeInfo(){
                var modal = document.getElementById('infoModal');
                modal.style.display = "none";
              },
          },

    }
</script>

<style scoped>
/*    styling for overall charity div*/
    #charity{
        text-align: center;
    }
    #title{
        margin: 20px;
        text-align: center;
    }
/*    styling the page navigation at the bottom of the page*/
    .pageChangeNav{
        margin-right:35px;
        margin-top:30px;
    }
    .pageChangeNav li {
        display: inline;
    }
    .pageChange{
        margin-right:2px;
        background: none;
    }
    a{
        color: black;
        text-decoration: none;
    }
/*    styling a single charity entry*/
    #singleCharity{
        border:0.5px solid grey;
        border-radius: 10px;
        margin-top:20px;
        padding-bottom:10px;
    }
    #categoryName{
        color: blue;
    }
    #searchArea{
        background-color:#f2f2f2;
        border:1px solid black;
        margin-top:10px;
        padding-top:20px;
        padding-bottom:20px;
    }
    #filter{
        display: inline;
        float:left;
        margin-left:150px;
    }
/*    styling search bar*/
    #search{
        display:inline;
        margin-left:250px;
    }
    #searchBar{
        width:220px;
    }
    #favoritesButton{
        position:absolute;
        top:8px;
        right:8px;
    }
/*    styling for the modal*/
    /* The modal for learning more about the charity */
    #infoModal {
        display: none;
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 1;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,0.35);
        overflow: auto;
    }
    /* The information inside of the modal */
    .modal-content {
        margin: 0 auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid black;
        border-radius:10px;
        width: 70%;
    }
    /*    Close button for the modal*/
    .closeButton {
        float: right;
        font-size: 32px;
        color: #A9A9A9;
        text-align: right;
    }
    .closeButton:hover{
        cursor: pointer;
        color: black;
    }
    .infoHeader{
        float:left;
    }
    .infoBody{
        padding-top:10px;
        padding-bottom:10px;
    }
/*    styling learn more link*/
    #learnMoreLink{
        border: 1px solid black;
        padding: 8px 8px 8px 8px;
        border-radius: 5px;
        float:left;
    }
    #learnMoreLink:hover{
        background-color:lightgrey;
    }
/*    styling donation links*/
    #donateLink{
        float:right;
        border: 1px solid black;
        padding: 8px 8px 8px 8px;
        border-radius: 5px;
        background-color:deepskyblue;
        color:white;
    }
    #donateLink:hover{
        background-color:dodgerblue;
    }
/*    styling for text review*/
    #textReview{
        width:450px;
        height:150px;
    }
</style>