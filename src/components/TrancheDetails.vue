<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card-text>
          <v-form>
            <v-container grid-list-md>
              <v-layout column wrap style="display: flex; overflow-x: auto; margin-top:1.2%;">
                <v-tabs v-model="tabs" fixed-tabs color="transparent" style="margin-top:2%;">
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab 
                    class="primary--text"
                    style="border-style:solid; border-width: thin; border-radius: 6px;"
                  >
                    <router-link to="/entityonboard" >
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
                  <v-select v-model="sendData.etype" :items="entities" label="Entity Type" outline></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.city"
                    @change="EntityName"
                    :items="cities"
                    label="City"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.ename"
                    @change="Model"
                    :items="enames"
                    label="Entity Name"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-menu v-model="menu" :close-on-content-click="false" full-width max-width="290">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        outline
                        :value="computedDateFormattedMomentjs"
                        clearable
                        label="Select a date"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @change="fun"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-layout row wrap>
                  <v-flex sm12 md6>
                    <v-combobox
                      v-model="sendData.rmodel"
                      :items="rmodels"
                      label="Revenue Models"
                      outline
                    ></v-combobox>
                  </v-flex>
                  <v-flex sm12 md6>
                    <v-dialog v-model="dialog" persistent max-width="290">
                      <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on">Add Revenue Model</v-btn>
                      </template>
                      <v-card>
                        <v-card-title class="headline">Add Revenue Model</v-card-title>
                        <v-card-text>
                          <v-text-field v-model="rdata.rmodel" label="Revenue Model " outline></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="green darken-1" flat @click="dialog = false">Cancel</v-btn>
                          <v-btn color="green darken-1" flat @click="dialog = false; rData();">Add</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-flex>
                </v-layout>
                <v-flex sm12 md6>
                  <v-combobox v-model="sendData.nflat" :items="nflats" label="No of Flats" outline></v-combobox>
                </v-flex>

                <v-flex sm12 md3>
                  <v-text-field v-model="sendData.flat" label="Flat No " outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-combobox
                    v-model="sendData.floor"
                    :items="nfloors"
                    label="No of Floors"
                    outline
                  ></v-combobox>
                </v-flex>
                <v-flex sm12 md6>
                  <v-combobox
                    v-model="sendData.paymentmode"
                    :items="payments"
                    label="OR Payment Mode"
                    outline
                  ></v-combobox>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field
                    v-model="sendData.payment"
                    v-on:keypress="isNumber(event)"
                    label="OR Payment"
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-combobox v-model="sendData.bed" :items="nbeds" label="No of Beds" outline></v-combobox>
                </v-flex>
                <v-flex sm12 md3>
                  <v-text-field
                    v-model="sendData.certificate"
                    label="Commencement Certificate Link "
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md3>
                  <v-text-field v-model="sendData.mou" label="MOU Link " outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-combobox
                    v-model="sendData.agreementid"
                    :items="agreementids"
                    label="Agreement ID"
                    outline
                  ></v-combobox>
                </v-flex>

                <div class="text-xs-center">
                  <v-dialog width="500">
                    <template v-slot:activator="{ on }">
                      <v-btn @click="ShowModel" color="Green" dark v-on="on">Next</v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="headline grey lighten-2" primary-title>Successful!</v-card-title>

                      <v-card-text>Data is successfully submitted!</v-card-text>

                      <v-divider></v-divider>
                    </v-card>
                  </v-dialog>
                </div>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
import axios from "axios";
import KeyCommericalTerms from "@/components/KeyCommericalTerms";
import RevenueShare from "@/components/RevenueShare";
export default {
  Name: "TrancheDetails",
  props: ["items"],
  components: {
    RevenueShare,
    KeyCommericalTerms
  },
  data: () => ({
    baseURl: "http://3.218.108.144:4206/",
    isDis: true,
    tabs: "",
    sendData: {
      etype: "",
      city: "",
      ename: "",
      date: "",
      rmodel: "",
      nflat: "",
      flat: "",
      floor: "",
      paymentmode: "",
      payment: "",
      bed: "",
      mou: "",
      agreementid: "",
      certificate: ""
    },
    rdata: {
      rmodel: ""
    },
    str: "",
    agreementids: [],
    dialog: false,
    menu: false,
    payments: ["Postpaid", "Prepaid"],
    date: new Date().toISOString().substr(0, 10),
    nflats: [],
    nfloors: [],
    nbeds: [],
    cities: [],
    entities: ["Office", "Kitchen", "Property"],
    payments: ["Postpaid", "Prepaid"],
    enames: [],
    rmodels: [],
    enames: []
  }),
  methods: {
    async getData() {
      console.log("sendData", this.sendData);
      axios.post(this.baseURl + "entitymap/insert", this.sendData);
    },
    async rData() {
      console.log("rData", this.rdata);
      axios.post(this.baseURl + "revenue/insert", this.rdata).then(response => {
        console.log(response.config.data.split(":")[1].split('"')[1]);

        this.rmodels.push(response.config.data.split(":")[1].split('"')[1]);
      });
    },
    City() {
      axios.get(this.baseURl + "city/getcityname").then(response => {
        console.log(response);
        response.data.forEach(element => {
          this.cities.push(element.CITY);
        });
      });
    },
    Model() {
      axios.get(this.baseURl + "revenue/getmname").then(response => {
        response.data.forEach(element => {
          this.rmodels.push(element.revenue);
        });
      });
    },

    EntityName() {
      console.log("Reached Here");
      if (this.sendData.entity === "") {
        throw console.error("Pehle entity select karo");
      }
      axios.get(this.baseURl + "entityonboard/getename").then(response => {
        console.log("hi", response.data);

        response.data.forEach(element => {
          if (
            this.sendData.city === element.city &&
            this.sendData.etype === element.etype
          ) {
            this.enames.push(element.ename);
          }
        });

        // console.log("Vname", this.);
      });
    },
    noFlats() {
      for (var i = 0; i <= 1000; i++) {
        this.nflats.push(i);
      }
    },
    noFloors() {
      for (var i = 0; i <= 1000; i++) {
        this.nfloors.push(i);
      }
    },
    noBeds() {
      for (var i = 0; i <= 1000; i++) {
        this.nbeds.push(i);
      }
    },
    isNumber(event) {
      event = event ? event : window.event;
      var charCode = event.which ? event.which : event.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        event.preventDefault();
      } else {
        return true;
      }
    },
    fun() {
      this.menu = false;
      this.sendData.date = this.date;
      console.log("date", this.sendData.date);
    },
    ShowModel() {
      if (this.sendData.rmodel === "Minimum Guarantee") {
        this.$router.push({
          name: "KeyCommericalTerms",
          params: { items: this.sendData }
        });
      }
      if (this.sendData.rmodel === "Revenue Share") {
        this.$router.push({
          name: "RevenueShare",
          params: { items: this.sendData }
        });
      }
    }
  },
  mounted() {
    this.City();
    this.noFlats();
    this.noFloors();
    this.noBeds();
    this.Model();
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("DD/MM/YYYY") : "";
    }
  }
};
</script>

<style>
.div.v-tabs_container.v-tabs_container--fixed-tabs:hover {
  background: black;
}
a.router-link-exact-active.router-link-active { color: darkblue }
</style>
