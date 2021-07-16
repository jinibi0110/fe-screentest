<template>
  <b-container fluid>
    <div class="content">
      <b-row >
        <!-- SEARCH BAR -->
        <b-col cols="12" sm="12" lg="3" md="4">
          <b-form-group>
            <b-input-group size="sm">
              <b-form-input
                id="search_field"
                v-model="search"
                type="search"
                class="text search-field"
                placeholder="Find Customer"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col cols="12" sm="12" lg="6"> </b-col>

        <!-- FILTER BY NAME -->
        <b-col cols="12" align="right" sm="12" lg="3">
          <b-form-select
            id="filter_by_name"
            v-model="filter_name"
            size="sm"
            class="text sort-field"
          >
            <option
              id="select_filter_by_name"
              class="text"
              :value="null"
              disabled
            >
              Filter by Name (A-Z)
            </option>

            <option id="filter_ascending" class="text" value="ascending" v-on:click="sortArray()"
              >Name (A-Z)</option
            >

            <option id="filter_descending" class="text" value="descendng"
              >Name (Z-A)</option
            >
          </b-form-select>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div class="mason_container">
            <div
              v-show="filterCustomerList != []"
              class="box"
              v-for="(data, i) in filterCustomerList"
              :key="i"
            >
              <div>
                <img class="imgs" :src="data.url" />
                <div class="padder">
                  <span class="text name">{{ data.name }}</span>
                  <br />
                  <span class="text username">{{ "@" + data.username }}</span>
                  <br />
                  <span class="text catchphrase">{{
                    '"' + data.company.catchPhrase + '"'
                  }}</span>
                </div>
                <br />
              </div>

              <div class="padder">
                <span class="text email"
                  ><font-awesome-icon class="icon" icon="envelope" />{{ data.email }}</span
                >
                <br />
                <font-awesome-icon class="icon" icon="map-marker-alt" />
                <span class="text address align-left">
                  {{
                    data.address.street +
                      ", " +
                      data.address.suite +
                      ", " +
                      data.address.city +
                      ", " +
                      data.address.zipcode +
                      ", " +
                      data.address.geo.lat +
                      ", " +
                      data.address.geo.lng
                  }}
                </span>
                <br />
                <span class="text phone">
                  <font-awesome-icon class="icon" icon="phone-alt" />
                  {{ data.phone }}</span
                ><br />
                <span class="text website"><font-awesome-icon class="icon" icon="globe" />{{ data.website }}</span
                ><br />
                <span class="text compname"><font-awesome-icon class="icon" icon="briefcase" />{{ data.company.name }}</span
                ><br />
                <span class="text bs"><font-awesome-icon class="icon" icon="industry" />{{ data.company.bs }}</span
                ><br />
              </div>
            </div>

            <!-- FOR MOBILE -->
            <!-- <div v-show="filterCustomerList != []"
              class="box-mobile"
              v-for="(data, i) in filterCustomerList"
              :key="i">
              <div >
                <img class="imgs-mobile" :src="data.url" />
                <div class="padder">
                  <span class="text name">{{ data.name }}</span>
                  <br />
                  <span class="text username">{{ "@" + data.username }}</span>
                  <br />
                  <span class="text catchphrase">{{
                    '"' + data.company.catchPhrase + '"'
                  }}</span>
                </div>
                <br />
              </div>

              <div class="padder">
                <span class="text email"
                  ><font-awesome-icon class="icon" icon="envelope" />{{ data.email }}</span
                >
                <br />
                <font-awesome-icon class="icon" icon="map-marker-alt" />
                <span class="text address align-left">
                  {{
                    data.address.street +
                      ", " +
                      data.address.suite +
                      ", " +
                      data.address.city +
                      ", " +
                      data.address.zipcode +
                      ", " +
                      data.address.geo.lat +
                      ", " +
                      data.address.geo.lng
                  }}
                </span>
                <br />
                <span class="text phone">
                  <font-awesome-icon class="icon" icon="phone-alt" />
                  {{ data.phone }}</span
                ><br />
                <span class="text website"><font-awesome-icon class="icon" icon="globe" />{{ data.website }}</span
                ><br />
                <span class="text compname"><font-awesome-icon class="icon" icon="briefcase" />{{ data.company.name }}</span
                ><br />
                <span class="text bs"><font-awesome-icon class="icon" icon="industry" />{{ data.company.bs }}</span
                ><br />
              </div>
            </div> -->
            <div class="text nodata-text" v-show="nodata">{{ nodata }}</div>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      search: "",
      filter_name: null,
      ascending: true,
    };
  },

  computed: {
    nodata() {
      if (this.filterCustomerList.length == 0) {
        return "No Customer(s) found with the search criteria.";
      } else {
        return "";
      }
    },

    filterCustomerList() {
      for (let x = 0; x < this.photoList.length; x++) {
        for (let y = 0; y < this.customerList.length; y++) {
          if (this.photoList[x].id == this.customerList[y].id) {
            this.customerList[y].url = this.photoList[x].url;
          }
        }
      }

      if (this.search) {
        let result = this.customerList.filter(user => 
          user.name.toLowerCase().match(this.search.toLowerCase())
        );
        return result;
      } else {
        return this.customerList;
      }
    },

    ...mapGetters({
      customerList: "Customers/getCustomerList",
      photoList: "Customers/getPhotoList"
    })
  },

  methods: {
   sortArray() {
      return this.filterCustomerList.sort((a, b) => a.name - b.name)
    },


    filterByName(a, b) {
      var first = a.name.toLowerCase();
      var second = b.name.toLowerCase();
      
      
        if (first > second) return 1;
        if (second > first) return -1;

        return 0;


        if (first > second) return -1;
        if (second > first) return 1;

        return 0;
      
    }
  },

  beforeCreate() {
    this.$store.dispatch("Customers/fetchPhotoList");
    this.$store.dispatch("Customers/fetchCustomerList");
  }
};
</script>

<style>
.mason_container {
  width: 100%;
  margin-top: 40px;
  -webkit-column-count: 4;
  -webkit-column-gap: 40px;
  left: 169px;
  top: 319px; 
  height: 100%;
}

.box {
  width: 100%;
  height: 700px;
  margin-bottom: 60px;
  background: white;
  overflow: hidden;
  break-inside: avoid;
  border-radius: 8px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

@media (max-width: 1350px) {
  .mason_container {
    columns: 4;
    box-sizing: border-box;
  }
}

@media (max-width: 1000px) {
  .mason_container {
    columns: 3;
    box-sizing: border-box;
  }
}

@media (max-width: 768px) {
  .mason_container {
    columns: 2;
  }
}
@media (max-width: 500px) {
  .mason_container {
    columns: 1;
  }

  .imgs-mobile {
    float: right;
    width: 150px;
    height: 150px;
    border-radius: 10px;
    padding: 10px;
    padding-top: 25px;
  }

  .box-mobile {
    position: static;
    width: 368px;
    height: 344px;
    left: 0px;
    top: 370px;
    background: #FFFFFF;
    border-radius: 8px;
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 26px 0px;
  }
}

.text {
  font-family: font_R;
  font-style: normal;
}

.search-field {
  position: static;
  width: 546px;
  height: 50px;
  left: 1px;
  top: 1px;
  background: #ffffff;
  border-radius: 8px;
  border-color: #ffffff;
}

.sort-field {
  border-radius: 8px;
  border-color: #ffffff;
}

.name {
  width: 182px;
  height: 28px;
  left: 28px;
  top: 314px;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #202223;
}

.username {
  width: 45px;
  height: 25px;
  left: 27px;
  top: 342px;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #919191;
}

.catchphrase {
  width: 319px;
  height: 25px;
  left: 27px;
  top: 382px;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #51c5ff;
}

.email {
  width: 127px;
  height: 25px;
  left: 64.5px;
  top: 428px;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #202223;
}

.address {
  width: 247px;
  height: 75px;
  left: 65px;
  top: 466px;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #202223;
  text-align: justify;
}

.phone {
  width: 180px;
  height: 25px;
  left: 64.5px;
  top: 554px;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #202223;
}

.website {
  width: 98px;
  height: 25px;
  left: 64.5px;
  top: 592px;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #202223;
}

.compname {
  width: 129px;
  height: 25px;
  left: 64.5px;
  top: 630px;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #202223;
}

.bs {
  width: 288px;
  height: 25px;
  left: 65px;
  top: 668px;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #202223;
}

.icon {
  left: 0px;
  right: 0%;
  top: 13.89%;
  bottom: 11.11%;
  color: #015989;
  box-sizing: border-box;
  width: 18px;
  height: 13.5px;
  margin-right: 12px;
  line-height: 25px;
}

.nodata-text {
  text-align: left;
  width: 100%;
  font-size: 14.5px;
}

.imgs {
  object-fit: cover;
  left: 1px;
  top: 0px; 
  background: rgba(0, 0, 0, 0.27);
  border-radius: 8px 8px 0px 0px;
  width: 100%;
  height: 220px
}

.padder {
  padding: 25px;
}
</style>
