<template>
    <div id="ownersPage">
      <h3> This is {{ownerName}}'s profile!</h3>
      <h6 id="owneremail"> Email Address: {{petOwnerEmail}}</h6>
      <h6>Phone Number: {{ownerNumber}}</h6>
          <div id="listOfPets">
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
                              Special Needs:
                             <p>{{ pet.specialneeds }}</p>
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
              return Math.ceil(l/s);

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
          },
          ownerNumber(){
            var num
            ownersRef.orderByChild('email').equalTo(this.petOwnerEmail).on("child_added",function(snapshot){
               num = snapshot.val().number;

            })
            return num;
          },

          ownerName(){
            var name
            ownersRef.orderByChild('email').equalTo(this.petOwnerEmail).on("child_added",function(snapshot){
               name = snapshot.val().name;
             })
             return name;
           },
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
