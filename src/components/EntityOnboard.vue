<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card-text>
          <v-form>
            <v-container grid-list-md>
              <v-layout column wrap>
                <v-tabs v-model="tabs" fixed-tabs color="transparent" style="margin-top:2%;">
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab
                    class="primary--text"
                    style="border-style:solid; border-width: thin; border-radius: 6px;"
                  >
                    <router-link to="/entityonboard">
                      <label>Entity Onboard</label>
                    </router-link>
                  </v-tab>

                  <v-tab
                    class="primary--text"
                    style="border-style:solid; border-width: thin; border-radius: 6px;"
                  >
                    <router-link to="/tranchedetails">
                      <label>Tranche Details</label>
                    </router-link>
                  </v-tab>
                </v-tabs>
                <v-flex sm12 md6>
                  <v-combobox
                    :rules="['Required']"
                    v-model="sendData.agreementterm"
                    :items="terms"
                    label="Agreement Term"
                    outline
                  ></v-combobox>
                </v-flex>
                <v-flex sm12 md3>
                  <v-select
                    :rules="['Required']"
                    v-model="sendData.etype"
                    :items="entities"
                    label="Entity Type"
                    outline
                  ></v-select>
                </v-flex>
                <v-layout row wrap>
                  <v-flex sm12 md6>
                    <v-combobox
                      :rules="['Required']"
                      v-model="sendData.city"
                      :items="cities"
                      label="City"
                      outline
                    ></v-combobox>
                  </v-flex>
                  <v-flex sm12 md6>
                    <v-dialog v-model="dialog" persistent max-width="290">
                      <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on">Add City</v-btn>
                      </template>
                      <v-card>
                        <v-card-title class="headline">Add City</v-card-title>
                        <v-card-text>
                          <v-text-field v-model="cdata.city" label="City " outline></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="green darken-1" flat @click="dialog = false">Cancel</v-btn>
                          <v-btn color="green darken-1" flat @click="dialog = false; cData();">Add</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-flex>
                </v-layout>
                <v-flex sm12 md3>
                  <v-text-field
                    :rules="['Required']"
                    v-model="sendData.ename"
                    @change="Uuid"
                    label="Entity Name "
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md6>{{sendData.uuid}}</v-flex>
                <v-flex sm12 md3>
                  <v-text-field :rules="['Required']" v-model="sendData.bde" label="BDE " outline></v-text-field>
                </v-flex>

                <v-flex sm12 md6>
                  <v-text-field
                    :rules="['Required']"
                    v-model="sendData.lead"
                    label="Lead ID"
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field
                    :rules="['Required']"
                    v-model="sendData.address"
                    label="Address "
                    outline
                  ></v-text-field>
                </v-flex>

                <v-btn @click="checkForm()" color="Green" dark v-on="on">Submit</v-btn>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>
 
 <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtY3AUE20QPgg6_CRv6h-ULOTLYAzJHVA?placeid=ChIJkbeSa_BfYzARphNChaFPjNc"
        ></script>
<script>
import axios from "axios";
export default {
  Name: "EntityOnboard",
  data: () => ({
    baseURl: "http://localhost:3000/",
    tabs: "",
    sendData: {
      agreementterm: "",
      city: "",
      etype: "",
      ename: "",
      bde: "",
      uuid: "",
      lead: "",
      address: ""
    },
    cid: "",
    et: "",
    en: "",
    cdata: {
      city: ""
    },
    terms: [],
    options: "",
    id: "",
    dialog: false,
    cities: [],
    entities: ["Kitchen", "Office", "Property"]
  }),
  methods: {
    async getData() {
      console.log("sendData", this.sendData);

      await axios.post(this.baseURl + "entityonboard/insert", this.sendData);
    },
    async cData() {
      console.log("cData", this.cdata);
      axios.post(this.baseURl + "city/insert", this.cdata).then(response => {
        console.log(response.config.data.split(":")[1].split('"')[1]);

        this.cities.push(response.config.data.split(":")[1].split('"')[1]);
      });
    },
    async eData() {
      console.log("eData", this.sendData.ename);
      axios.post(this.baseURl + "entity_name/insert", this.sendData.ename);
    },
    EntityId() {
      axios.get(this.baseURl + "entity_name/getid").then(response => {
        console.log("hi", response.data[0]);
        if (response.data[0].id === undefined) {
          this.Lastid = 0;
        } else {
          this.Lastid = response.data[0].id + 1;
        }
      });
      console.log("Lastvid", this.Lastvid);
    },
    City() {
      axios.get(this.baseURl + "city/getcityname").then(response => {
        response.data.forEach(element => {
          this.cities.push(element.CITY);
        });
      });
    },

    Uuid() {
      axios.get(this.baseURl + "city/getcid").then(response => {
        response.data.forEach(element => {
          if (this.sendData.city === element.city) {
            this.cid = element.id;
            console.log("cid", this.cid);
            var uuid = "Z" + "_" + this.cid + "_" + this.et + "_" + this.en;
            this.sendData.uuid = uuid;
            console.log(uuid);
          }
        });
      });
      if (this.sendData.etype === "Property") {
        this.et = "PR";
        console.log("Pr", this.sendData.etype);
      } else if (this.sendData.etype === "Office") {
        this.et = "OF";
        console.log("Of", this.sendData.etype);
      } else {
        this.et = "KI";
        console.log("KI", this.sendData.etype);
      }
      if (this.sendData.ename != null) {
        this.en = this.Lastid;
        console.log(this.en);
      }
    },
    Terms() {
      for (var i = 0; i <= 30; i++) {
        this.terms.push(i + " years");
      }
    },
    checkForm() {
      var result = [];
      for (var i in this.sendData) result.push(this.sendData[i]);
      console.log(result);
      var m = 0;
      for (var j = 0; j < 8; j++) {
        if (this.sendData[j] === null) {
          console.log("empty");
          m++;
        }
      }
      console.log(m);
      if ((m = 0)) {
        alert("Data submitted Successfully");
        this.getData();
        this.eData();
      } else {
        alert("Please fill in all the details");
      }
    }
  },
  mounted() {
    this.City();
    this.EntityId();
    this.Terms();
    var autocompleteInput = document.querySelector("#autocomplete");
    var autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */ (autocompleteInput),
      { types: ["geocode"] }
    );
  }
};
</script>



<style>
.div.v-tabs_container.v-tabs_container--fixed-tabs:hover {
  background: black;
}
a.router-link-exact-active.router-link-active {
  color: darkblue;
}
</style>
