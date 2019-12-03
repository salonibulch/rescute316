<template>
    <div id="ownersPage">
          <div id="listOfPets">
          <router-link class="routerLink" to='/profile'><a id="profile">Click to add pet</a></router-link>
          <div id="container" class="container">
              <div class="col">
                  <div id="row" class="row">
  <!--                    single pet entry creation-->
                      <div id="singlePet" class="col-sm-4" v-for="pet in pagedData">
                              <h5>{{ pet.name }}</h5>
                              <p>{{ pet.age }}</p>
                              <div id="Delete">
                                  <button class="btn btn-success" @click="deletePet(pet)" title="Delete Pet">Delete</button>
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
        name: "ownersPage",

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
          petNeeds:'',
          petPicture:'',
          }
        },
        computed:{
          //returns pets from firebase data
          getPets(){
              return this.pets;
          },
          filteredPets(){
          return this.pets.filter((pet) => {
              if (pet.useremail.match(firebase.auth().currentUser.email) ){return true}
              else {return false}
              });
          },
          pageCount(){
              var l = this.pets.length
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
</style>
