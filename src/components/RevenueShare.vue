<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-form>
          <v-container grid-list-md>
            <v-layout column wrap style="display: flex; overflow-x: auto; margin-top:1.2%;">
              <v-btn href="/tranchedetails" color="Green" dark v-on="on">Back</v-btn>
              <v-data-table :items="rows" class="elevation-1">
                <template v-slot:items="props">
                  <tr>
                    <th style="border: 1px solid black;"></th>
                    <th colspan="3" style="border: 1px solid black;">Occupancy Slab</th>
                    <th colspan="5" style="border: 1px solid black;">Collection Sharing</th>
                    <th colspan="2" style="border: 1px solid black;">Discount Sharing</th>
                    <th colspan="2" style="border: 1px solid black;">Write Off</th>
                    <th colspan="2" style="border: 1px solid black;">Pending</th>
                    <th style="border: 1px solid black;"></th>
                    <th style="border: 1px solid black;"></th>
                    <th style="border: 1px solid black;"></th>
                  </tr>
                  <tr>
                    <th style="border: 1px solid black;" >Invoice Component</th>
                    <th style="border: 1px solid black;">Min occupancy</th>
                    <th style="border: 1px solid black;">Max occupancy</th>
                    <th style="border: 1px solid black;">Sharing Methodology</th>
                    <th style="border: 1px solid black;">Owner Share- Collection</th>
                    <th style="border: 1px solid black;">Zolo Share- Collection</th>
                    <th style="border: 1px solid black;">GST</th>
                    <th style="border: 1px solid black;">GST Slab</th>
                    <th style="border: 1px solid black;">TDS Slab</th>
                    <th style="border: 1px solid black;">Owner Share- Discount</th>
                    <th style="border: 1px solid black;">Zolo Share- Discount</th>
                    <th style="border: 1px solid black;">Owner Share- Writeoff</th>
                    <th style="border: 1px solid black;">Zolo Share- Writeoff</th>
                    <th style="border: 1px solid black;">Owner Share- Pending</th>
                    <th style="border: 1px solid black;">Zolo Share- Pending</th>
                    <th style="border: 1px solid black;">PG rates</th>
                    <th style="border: 1px solid black;">Rule start date</th>
                    <th style="border: 1px solid black;">Rule end date</th>
                  </tr>
                  <tr v-for="item1 in rowNum" :key="item1">
                    <td class="text-xs-right" style="padding:0px;">
                      <v-text-field
                        v-model="props.item.invoice[item1-1]"
                        label="Invoice Component"
                        style="width:150px;"
                        outline
                      ></v-text-field>
                    </td>
                    <td class="text-xs-right" style="padding:0px;">
                      <v-text-field
                        v-model="props.item.min[item1-1]"
                        label="Minimum Occupancy"
                        v-on:keypress="isNumber(event)"
                        style="width:150px;"
                        outline
                      ></v-text-field>
                    </td>
                    <td class="text-xs-right" style="padding:0px;">
                      <v-text-field
                        v-model="props.item.max[item1-1]"
                        v-on:keypress="isNumber(event)"
                        label="Maximum Occupancy"
                        style="width:150px;"
                        outline
                      ></v-text-field>
                    </td>
                    <td class="text-xs-right" style="padding:0px;">
                      <v-combobox
                        style="width:150px;"
                        v-model="props.item.sharing[item1-1]"
                        :items="sharings"
                        label="Sharing Methodology"
                        outline
                      ></v-combobox>
                    </td>
                    <td class="text-xs-right" style="padding:0px;">
                      <v-text-field
                        style="width:150px;"
                        v-on:keypress="isNumber(event)"
                        v-model="props.item.ownercollection[item1-1]"
                        label="Owner Share- Collection"
                        outline
                      ></v-text-field>
                    </td>
                    <td class="text-xs-right" style="padding:0px;">
                      <v-text-field
                        style="width:150px;"
                        v-on:keypress="isNumber(event)"
                        v-model="props.item.zolocollection[item1-1]"
                        label="Zolo Share- Collection"
                        outline
                      ></v-text-field>
                    </td>
                    <td class="text-xs-right" style="padding:0px;">
                      <v-combobox
                        style="width:150px;"
                        v-model="props.item.gst[item1-1]"
                        :items="gsts"
                        label="GST"
                        outline
                      ></v-combobox>
                    </td>
                    <td class="text-xs-right" style="padding:0px;">
                      <v-combobox
                        style="width:150px;"
                        v-model="props.item.gstslab[item1-1]"
                        :items="gstslabs"
                        label="GST Slab"
                        outline
                      ></v-combobox>
                    </td>
                    <td class="text-xs-right" style="padding:0px;">
                      <v-text-field v-on:keypress="isNumber(event)"
                        style="width:150px;"
                        v-model="props.item.tds[item1-1]"
                        label="TDS"
                        outline
                      ></v-text-field>
                    </td>
                    <td class="text-xs-right" style="padding:0px;">
                      <v-text-field
                        v-on:keypress="isNumber(event)"
                        style="width:150px;"
                        v-model="props.item.ownerdiscount[item1-1]"
                        label="Owner Discount"
                        outline
                      ></v-text-field>
                    </td>
                    <td class="text-xs-right" style="padding:0px;">
                      <v-text-field
                        style="width:150px;"
                        v-on:keypress="isNumber(event)"
                        v-model="props.item.zolodiscount[item1-1]"
                        label="Zolo Discount"
                        outline
                      ></v-text-field>
                    </td>
                    <td class="text-xs-right" style="padding:0px;">
                      <v-text-field
                        v-on:keypress="isNumber(event)"
                        style="width:150px;"
                        v-model="props.item.ownerwriteoff[item1-1]"
                        label="Owner Writeoff"
                        outline
                      ></v-text-field>
                    </td>
                    <td class="text-xs-right" style="padding:0px;">
                      <v-text-field
                        v-on:keypress="isNumber(event)"
                        style="width:150px;"
                        v-model="props.item.zolowriteoff[item1-1]"
                        label="Zolo Writeoff"
                        outline
                      ></v-text-field>
                    </td>

                    <td class="text-xs-right" style="padding:0px;">
                      <v-text-field
                        v-on:keypress="isNumber(event)"
                        style="width:150px;"
                        v-model="props.item.ownerpending[item1-1]"
                        label="Owner Pending"
                        outline
                      ></v-text-field>
                    </td>
                    <td class="text-xs-right" style="padding:0px;">
                      <v-text-field
                        v-on:keypress="isNumber(event)"
                        style="width:150px;"
                        v-model="props.item.zolopending[item1-1]"
                        label="Zolo Pending"
                        outline
                      ></v-text-field>
                    </td>
                    <td class="text-xs-right" style="padding:0px;">
                      <v-text-field
                        v-on:keypress="isNumber(event)"
                        style="width:150px;"
                        v-model="props.item.pgrates[item1-1]"
                        label="PG Rates"
                        outline
                      ></v-text-field>
                    </td>

                    <td class="text-xs-right" style="padding:0px;">
                      <v-menu
                    v-model="menu3"
                    :close-on-content-click="false"
                    full-width
                    max-width="290"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        outline
                        :rules="['Required']" 
                        :value="computedDateFormattedMomentjs"
                        clearable
                        label="Plan Start Date"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="props.item.date[item1-1]"  @change="fun3"></v-date-picker>
                  </v-menu>
                    </td>

                    <td class="text-xs-right" style="padding:0px;">
                      <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    full-width
                    max-width="290"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        outline
                        :rules="['Required']" 
                        :value="computedDateFormattedMomentjs2"
                        clearable
                        label="Next Recharge Date"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @change="fun2"></v-date-picker>
                  </v-menu>
                    </td>
                  </tr>
                  <v-btn color="primary" @click="incRow">Add</v-btn>
                </template>
              </v-data-table>

              <div class="text-xs-center">
                <v-dialog width="500">
                  <template v-slot:activator="{ on }">
                    <v-btn @click="getData(); con();" color="Green" dark v-on="on">Submit</v-btn>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  Name: "KeyCommericalTerms",
  props: ["items"],
  data: () => ({
    baseURl: "http://localhost:3000/",
    isDis: true,
    tabs: "",
    rowNum: 0,
    event: "",
    sharings: ["On slab Revenue", "On Total Revenue"],
    gsts: ["Inclusive", "Exclusive"],
    gstslabs: ["0%", "5%", "12%", "18%", "28%"],
    props:['etype','city'],
    rows: [
      {
        invoice: [],
        min: [],
        max: [],
        sharing: [],
        ownercollection: [],
        zolocollection: [],
        gst: [],
        gstslab: [],
        tds:[],
        ownerdiscount: [],
        zolodiscount: [],
        ownerwriteoff: [],
        zolowriteoff: [],
        ownerpending: [],
        zolopending: [],
        pgrates: [],
        date: [],
        rdate: []
      }
    ],
    rows1: {
      invoice: "",
      min: "",
      max: "",
      sharing: "",
      ownercollection: "",
      zolocollection: "",
      gst: "",
      gstslab: "",
      tds:"",
      ownerdiscount: "",
      zolodiscount: "",
      ownerwriteoff: "",
      zolowriteoff: "",
      ownerpending: "",
      zolopending: "",
      pgrates: "",
      date: "",
      rdate: ""
    },

    menu2: false,
    menu3: false,
    fetchDate2: "",
    fetchDate3: "",
    date: new Date().toISOString().substr(0, 10),
    rdate: new Date().toISOString().substr(0, 10)
  }),
  methods: {
    addNewRow() {
      this.items.assign({
        invoice: "",
        min: "",
        max: "",
        sharing: "",
        ownercollection: "",
        zolocollection: "",
        gst: "",
        gstslab: "",
        tds:"",
        ownerdiscount: "",
        zolodiscount: "",
        ownerwriteoff: "",
        zolowriteoff: "",
        ownerpending: "",
        zolopending: "",
        pgrates: "",
        date: "",
        rdate: ""
      });
    },
    incRow() {
      this.rowNum++;
    },
    async getData() {
      for (var index = 0; index < this.rowNum; index++) {
        console.log("rowNum", this.rowNum);
        console.log("bye1", this.rows[0]);
        
        if (this.rows[0].invoice[index] === undefined) {
          this.rows[0].invoice[index] = " ";
        }
        if (this.rows[0].min[index] === undefined) {
          this.rows[0].min[index] = " ";
        }
        if (this.rows[0].max[index] === undefined) {
          this.rows[0].max[index] = " ";
        }
        if (this.rows[0].sharing[index] === undefined) {
          this.rows[0].sharing[index] = " ";
        }
        if
         (this.rows[0].ownercollection[index] === undefined) {
          this.rows[0].ownercollection[index] = " ";
        }
        if (this.rows[0].zolocollection[index] === undefined) {
          this.rows[0].zolocollection[index] = " ";
        }
        if (this.rows[0].gst[index] === undefined) {
          this.rows[0].gst[index] = " ";
        }
        if (this.rows[0].gstslab[index] === undefined) {
          this.rows[0].gstslab[index] = " ";
        }
        if (this.rows[0].tds[index] === undefined) {
          this.rows[0].tds[index] = " ";
        }
        if (this.rows[0].ownerdiscount[index] === undefined) {
          this.rows[0].ownerdiscount[index] = " ";
        }
        if (this.rows[0].zolodiscount[index] === undefined) {
          this.rows[0].zolodiscount[index] = " ";
        }
        if (this.rows[0].ownerwriteoff[index] === undefined) {
          this.rows[0].ownerwriteoff[index] = " ";
        }
        if (this.rows[0].zolowriteoff[index] === undefined) {
          this.rows[0].zolowriteoff[index] = " ";
        }
        if (this.rows[0].ownerpending[index] === undefined) {
          this.rows[0].ownerpending[index] = " ";
        }
        if (this.rows[0].zolopending[index] === undefined) {
          this.rows[0].zolopending[index] = " ";
        }
        if (this.rows[0].pgrates[index] === undefined) {
          this.rows[0].pgrates[index] = " ";
        }
        if (this.rows[0].date[index] === undefined) {
          this.rows[0].date[index] = " ";
        }
        if (this.rows[0].rdate[index] === undefined) {
          this.rows[0].rdate[index] = " ";
        }
        this.rows1.invoice = this.rows[0].invoice[index];
        this.rows1.min = this.rows[0].min[index];
        this.rows1.max = this.rows[0].max[index];
        this.rows1.sharing = this.rows[0].sharing[index];
        this.rows1.ownercollection = this.rows[0].ownercollection[index];
        this.rows1.zolocollection = this.rows[0].zolocollection[index];
        this.rows1.gst = this.rows[0].gst[index];
        this.rows1.gstslab = this.rows[0].gstslab[index];
        this.rows1.tds = this.rows[0].tds[index];
        this.rows1.ownerdiscount = this.rows[0].ownerdiscount[index];
        this.rows1.zolodiscount = this.rows[0].zolodiscount[index];
        this.rows1.ownerpending = this.rows[0].ownerpending[index];
        this.rows1.zolopending = this.rows[0].zolopending[index];
        this.rows1.ownerwriteoff = this.rows[0].ownerwriteoff[index];
        this.rows1.zolowriteoff = this.rows[0].zolowriteoff[index];
        this.rows1.pgrates = this.rows[0].pgrates[index];
        this.rows1.date = this.rows[0].date[index];
        this.rows1.rdate = this.rows[0].rdate[index];
        console.log("bye", this.rows1);
        console.log("index", index);
        await axios.post(this.baseURl + 'revenueshare/insert', this.rows1);
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
    fun3() {
      this.menu3 = false;
      this.fetchDate = this.date;
      this.fetchDate = moment(this.date, "YYYY-MM-DD").format("DD/MM/YYYY");
      console.log(this.fetchDate);
      console.log(this.date);
    },
    fun2() {
      this.menu2 = false;
      this.fetchDate2 = this.rdate;
      this.fetchDate2 = moment(this.rdate, "YYYY-MM-DD").format("DD/MM/YYYY");
      console.log(this.fetchDate2);
      console.log(this.rdate);
    },
    con(){
      console.log("hi",this.items)
      axios.post(this.baseURl + 'entitymap/insert', this.items);
    },
    
    
  },
  computed: {
      computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("DD/MM/YYYY") : "";
    },
    computedDateFormattedMomentjs2() {
      return this.rdate ? moment(this.rdate).format("DD/MM/YYYY") : "";
    }
  },
  mounted() {
    
  }
};
</script>

<style>
</style>
