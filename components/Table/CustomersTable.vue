<template>
  <b-container fluid>
    <div class="content">
      <b-row>
        <!-- SEARCH BAR -->
        <b-col cols="3" sm="12" lg="3">
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

        <b-col cols="6"> </b-col>

        <!-- FILTER BY NAME -->
        <b-col cols="3" align="right" sm="12" lg="3">
          <b-form-select
            id="filter_by_name"
            v-model="filter_name"
            size="sm"
            @click="filterByName()"
          >
            <option
              id="select_filter_by_name"
              class="text"
              :value="null"
              disabled
            >
              Filter by Name (A-Z)
            </option>

            <option id="filter_ascending" class="text" value="ascending"
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
                <img class="imgs" :src="data.url" width="100%" height="200px" />
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
                  ><fa :icon="['fa', 'envelope']" />{{ data.email }}</span
                >
                <br />
                <!-- <font-awesome-icon class="icon" icon="map-marker-alt" /> -->
                <span class="text address">
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
                  <!-- <font-awesome-icon class="icon" icon="phone-alt" /> -->
                  {{ data.phone }}</span
                ><br />
                <span class="text website">{{ data.website }}</span
                ><br />
                <span class="text compname">{{ data.company.name }}</span
                ><br />
                <span class="text bs">{{ data.company.bs }}</span
                ><br />
              </div>
            </div>
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
      filter_name: null
    };
  },

  computed: {
    nodata() {
      // for (let x = 0; x < this.photoList.length; x++) {
      //   for (let y = 0; y < this.customerList.length; y++) {
      //     if (this.photoList[x].id == this.customerList[y].id) {
      //       this.customerList[y].url = this.photoList[x].url;
      //     }
      //   }
      // }

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

  created() {},

  methods: {
    filterByName(a, b) {
      if (this.filter_name == "ascending") {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;

        return 0;
      } else if (this.filter_name == "descending") {
        if (a.name > b.name) return -1;
        if (b.name > a.name) return 1;

        return 0;
      }
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
}
.box {
  width: 100%;
  height: 725px;
  margin-bottom: 60px;
  /* padding: 10px; */
  background: white;
  overflow: hidden;
  break-inside: avoid;
  border-radius: 8px;

  /* position: static;
  width: 363px;
  height: 725px;
  left: 0px;
  top: 0px;
  background: #ffffff;
  border-radius: 8px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 43.5px; */
}
@media (max-width: 1350px) {
  .mason_container {
    /* width: calc(100% - 20px); */
    columns: 4;
    box-sizing: border-box;
    /* padding: 20px 20px 20px 0; */
  }
}
@media (max-width: 1000px) {
  .mason_container {
    columns: 3;
    box-sizing: border-box;
    /* padding: 20px 20px 20px 0; */
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

.name {
  /* position: absolute;
  width: 182px;
  height: 28px; */
  left: 28px;
  /* top: 314px; */
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #202223;
}

.username {
  /* position: absolute;
width: 45px;
height: 25px; */
  left: 27px;
  /* top: 342px; */
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #919191;
}

.catchphrase {
  /* position: absolute; */
  /* width: 319px;
  height: 25px; */
  left: 27px;
  /* top: 382px; */
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #51c5ff;
}

.email {
  /* position: absolute;
  width: 127px;
  height: 25px; */
  left: 64.5px;
  /* top: 428px; */
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #202223;
}

.address {
  /* position: absolute;
  width: 247px;
  height: 75px; */
  left: 65px;
  /* top: 466px; */
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #202223;
}

.phone {
  /* position: absolute;
  width: 180px;
  height: 25px; */
  left: 64.5px;
  /* top: 554px; */
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #202223;
}

.website {
  /* position: absolute;
  width: 98px;
  height: 25px; */
  left: 64.5px;
  /* top: 592px; */
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #202223;
}

.compname {
  /* position: absolute;
  width: 129px;
  height: 25px; */
  left: 64.5px;
  /* top: 630px; */
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #202223;
}

.bs {
  /* position: absolute;
  width: 288px;
  height: 25px; */
  left: 65px;
  /* top: 668px; */
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #202223;
}

.icon {
  /* position: absolute; */
  left: 0%;
  right: 0%;
  top: 13.89%;
  bottom: 11.11%;
  color: #015989;
  box-sizing: border-box;
  width: 18px;
  height: 13.5px;
}

.nodata-text {
  align: center;
}

.imgs {
  object-fit: cover;
}
.padder {
  padding: 25px;
}
</style>
