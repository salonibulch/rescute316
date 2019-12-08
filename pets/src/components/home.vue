
<template>
    <div id="home">
    <div id="filtering">
      <button id="sortingButton" class="btn" @click="enableSortAge = !enableSortAge; toggleSortButton();">{{sortButton.text}}</button>
       <span class="bold"><button class="btn" id="sortingButton" @click="selectCategories=!selectCategories">Filters</button></span>

        <div v-show="selectCategories" v-for="breed in breeds">
                    <div class="check">
                    <input type="checkbox" @click="addBreed(breed,$event); filterByBreed();" id="checkCat" :value="breed"><label>{{breed | capitalize}}</label>
                    </div>
                </div>

    </div>
          <div id="listOfCharities">
          <div id="container" class="container">
              <div class="col">
                  <div id="row" class="row">
  <!--                    single pet entry creation-->
                      <div class="col-md-4" v-for="pet in pagedData">
                        
                        <div id="singlePet">
                              <img id="petPicture" :src="pet.picture" alt="Pet Photo">
                              <h4>{{ pet.name | capitalize}}</h4>
                              <h6>{{pet.breed | capitalize}}</h6>
                              <p>{{ pet.age }}</p>                    
                              <div id="learnMore">
                                  <button class="btn learnbutton" @click="moreInfo(pet.name,pet.picture,pet.age,pet.breed,pet.useremail,pet.specialneeds)">Learn More</button>
                              </div> 

                              </div> 

                                                           <br>
                              <div id="infoModal">

                                <!-- Creating a modal for learning more about the charity-->
                                  <div class="modal-content">
                                      <span class="closeButton" @click="closeInfo">&times;</span>
                                    <div class="infoHeader">
                                      <h2><b>{{petName | capitalize}}</b></h2>
                                        <hr>
                                    </div>
                                      <div class="infoBody">
      <!--                                  information in the modal-->
                                        <br>
                                        <img id="petPictureModal" :src="petPicture" alt="Pet Photo">
                                      <h4>{{petAge}}</h4>
                                        Age
                                        <br>
                                        <br>
                                      <h4>{{petBreed | capitalize}}</h4>
                                        Breed
                                        <br>
                                        <br>
                                        <h4>{{petNeeds}}</h4>
                                          Special Needs
                                          <br>
                                          <br>
                                      <router-link class="routerLink" :to="{name: 'ownerpreview', params: { petOwnerEmail }}"><h4 id="ownerpreview"> <button id="buttonemail"class="btn">{{petOwnerEmail}}</button></h4></router-link>
                                      Owner Email 
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
          pageSize: 12, //number of pets on each page
          visiblePages: 5,
          petName: '',
          petAge:'',
          petBreed:'',
          petOwnerEmail:'',
          petNeeds:'',
          petPicture:'',
          checkedBreeds:[],
          selectCategories: false,
          enableSortAge: false,
          sortButton: {
           text: 'Sort by Age'
          }, 
          sorting: -1
          }
        },
        computed:{
          //returns pets from firebase data
          sorted() {
            if (this.enableSortAge) {
              return this.filteredBreeds.slice(0).sort((a, b) => a.age < b.age ? this.sorting : -this.sorting )
            }

            else {
              return this.filteredBreeds;
            }
          },
          getPets(){
              return this.pets;
          },
          breeds(){
              const br = [...new Set(this.pets.map(({ breed }) => breed.toLowerCase()))]

              return br.sort((a, b) => {
                return a - b
              })
          },
          pageCount(){
              var l = this.filteredBreeds.length
              var s = this.pageSize;
              return Math.ceil(l/s);
          },
          pagedData(){
              const start = this.pageNumber * this.pageSize,
              end = start + this.pageSize;
              return this.sorted.slice(start, end);
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
          },
          filteredBreeds () {
                return this.pets.filter((pet) => { 
                    if (pet.active) {return true}
                    else {return false}
                });
                
            }
        },
        filters: {
          capitalize: function(value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },
        methods: {
            //go to next page
            toggleSortButton: function() {
                this.sortButton.text = this.enableSortAge ? 'Stop Sorting' : 'Sort by Age';
            },
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
            //get individual dog info
            moreInfo(name, picture,age, breed, userEmail, specialNeeds){
            var modal = document.getElementById('infoModal');
            modal.style.display = "block";
            this.petName=name;
            this.petPicture=picture;
            this.petAge=age;
            this.petBreed=breed;
            this.petOwnerEmail=userEmail;
            this.petNeeds=specialNeeds;
            },
            //closing the popup
            closeInfo(){
                var modal = document.getElementById('infoModal');
                modal.style.display = "none";
            },
            addBreed(breedvar,event){
              if (event.target.checked){
                  this.checkedBreeds.push(breedvar);
                }
              else {
                  var index = this.checkedBreeds.indexOf(breedvar);
                  this.checkedBreeds.splice(index, 1);
                }
              
            },
            //show all pets
            showAll() {
                
            },
            //show the pets that are filtered
            filterByBreed () {
                for (var i in this.pets){
                    this.pets[i].active=false;
                }
                for (var j in this.checkedBreeds){
                    for (var i in this.pets){
                        if (this.pets[i].breed.toLowerCase() == this.checkedBreeds[j].toLowerCase()){
                            this.pets[i].active=true;
                        }
                    }
                }
                if (this.checkedBreeds.length === 0){
                    for (var i in this.pets){
                      this.pets[i].active=true;
                    }
                }
            }
            }
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
    #singlePet{
        border-radius: 10px;
        background-color: white;
        margin-top:20px;
        padding-top: 20px;
        padding-bottom: 20px;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
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
    .learnbutton{
        background-color: #65CCB7;
        color: white;
    }
    .learnbutton:hover {
        background-color: #40a893; 
        color: white;
    }
    #filtering{
        margin: 20px;
    }
    #sortingButton{
        color: black;
        border:1px solid black;
        margin: 5px;
    }
/*    styling for the modal*/
    /* The modal for learning more about the pet */
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
    #petPicture{
        width: 80%;
        border-radius: 8px;
        padding: 5px;
        margin-bottom: 10px;
        height: 180px;
        object-fit:scale-down;

    }
     #petPictureModal{
        width: 80%;
        border-radius: 8px;
        padding: 5px;
        margin-bottom: 10px;
        height: 500px;
        object-fit:scale-down;

    }
    #checkCat {
        margin-right: 5px;
    }
    #buttonemail {
        color:dodgerblue;
    }
</style>
