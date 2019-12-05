<template>
    <div id="ownersPage">
      <h4 id="owneremail"> {{petOwnerEmail}}</h4>
          <div id="listOfPets">
          <div id="container" class="container">
              <div class="col">
                  <div id="row" class="row">
  <!--                    single pet entry creation-->
                      <div id="singlePet" class="col-sm-4" v-for="pet in pagedData">
                          
                              <img id="petPicture" :src="pet.picture" alt="Pet Photo">
                              <h4>{{ pet.name | capitalize}}</h4>
                              <h6>{{pet.breed | capitalize}}</h6>
                              <p>{{ pet.age }}</p> 
                              Special Needs:                   
                             <p>{{ pet.specialneeds }}</p>  

                          
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
        name: "ownerpreview",
        props: ['petOwnerEmail'],
        firebase: {
            //firebase references
            pets: petsRef,
            owners: ownersRef
        },
        data(){
          return{
          petOwnerEmail: '',
          pageNumber: 0,
          pageSize: 12, //number of charities on each page
          visiblePages: 5,
          petName: '',
          petAge:'',
          petBreed:'',
          petNeeds:'',
          petPicture:'',
          }
        },
        filters: {
          capitalize: function(value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },
        mounted() {
            if (this.petOwnerEmail){
                this.petOwnerEmail = this.petOwnerEmail;
            }        
          },
        computed:{
          //returns pets from firebase data
          getPets(){
              return this.pets;
          },
          filteredPets(){
          return this.pets.filter((pet) => {
              if (pet.useremail.match(this.petOwnerEmail) ){return true}
              else {return false}
              });
          },
          pageCount(){
              var l = this.filteredPets.length
              var s = this.pageSize;
              return Math.floor(l/s);
          },
          pagedData(){
              const start = this.pageNumber * this.pageSize,
              end = start + this.pageSize;

              return this.filteredPets.slice(start, end);
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
              deletePet(pet){
              if(confirm('are you sure?')){
                  petsRef.child(pet['.key']).remove();
              }
            },
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
    #addButton{
        color: white;
        background-color: #65CCB7;
        margin: 20px;
        padding-left: 40px;
        padding-right: 40px;
        padding-top: 12px;
        padding-bottom: 12px;
    }
    #addButton:hover {
        background-color: #40a893; 
        color: white;
    }
    #owneremail {
        margin: 20px;
    }
    #singlePet{
        border-radius: 10px;
        background-color: white;
        margin-top:20px;
        padding-top: 20px;
        padding-bottom: 20px;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    }
     #petPicture{
        width: 80%;
        border-radius: 8px;
        padding: 5px;
        margin-bottom: 10px;
        height: 180px;
        object-fit:scale-down;

    }
</style>
