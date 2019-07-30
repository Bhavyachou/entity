<template>
  <v-container>
    <v-layout text-xs-center wrap style="display: flex; overflow-x: auto; margin-top:1.2%;">
      <v-flex xs12>
        <v-card-text>
          <v-form>
            <v-container grid-list-md>
              <v-layout column wrap>
                <v-data-table
                  :items="rows"
                  hide-default-footer
                  class="elevation-1"
                  style="display: flex; overflow-x: auto; "
                >
                  <template v-slot:items="props" style="display: flex; overflow-x: auto;">
                    <tr v-for="item1 in rowNum" :key="item1" style="border-style: solid;">
                      <td>
                        <tr class="text-xs-center" style="padding:0px; " width="300">
                          <v-combobox
                            :items="types"
                            v-model="props.item.typeunit[item1-1]"
                            label="Type of Unit"
                            outline
                          ></v-combobox>
                        </tr>
                        <tr class="tex-xs-center" style="padding:0px; margin-left:30%">
                          <v-text-field
                            v-model="props.item.unit[item1-1]"
                            label="No of Unit"
                            v-on:keypress="isNumber(event)"
                            outline
                          ></v-text-field>
                        </tr>
                        <tr class="tex-xs-center" style="padding:0px;">
                          <v-text-field
                            v-model="props.item.grosslf[item1-1]"
                            label="Gross LF per unit"
                            v-on:keypress="isNumber(event)"
                            outline
                          ></v-text-field>
                        </tr>
                        <tr class="tex-xs-center" style="padding:0px;">
                          <v-text-field
                            v-model="props.item.spf[item1-1]"
                            label="SPF"
                            v-on:keypress="isNumber(event)"
                            outline
                          ></v-text-field>
                        </tr>
                        <tr class="tex-xs-center" style="padding:0px;">
                          <v-text-field
                            v-model="props.item.oe[item1-1]"
                            label="OE"
                            @change="netOR"
                            v-on:keypress="isNumber(event)"
                            outline
                          ></v-text-field>
                        </tr>
                        <tr class="tex-xs-center" style="padding:0px;">
                          <v-text-field
                            v-on:keypress="isNumber(event)"
                            v-model="props.item.or[item1-1]"
                            label="Net OR per unit"
                            outline
                          ></v-text-field>
                        </tr>
                        <tr class="tex-xs-center" style="padding:0px;">
                          <v-text-field
                            v-on:keypress="isNumber(event)"
                            v-model="props.item.escp[item1-1]"
                            label="Escalation Percent"
                            outline
                          ></v-text-field>
                        </tr>
                        <tr class="tex-xs-center" style="padding:0px;">
                          <v-text-field
                            v-on:keypress="isNumber(event)"
                            v-model="props.item.escf[item1-1]"
                            label="Escalation Frequency"
                            outline
                          ></v-text-field>
                        </tr>

                        <tr class="tex-xs-center" style="padding:0px;">
                          <v-menu
                            v-model="menu"
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
                                label="Grace Start Date"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="startdate" @change="fun"></v-date-picker>
                          </v-menu>
                        </tr>

                        <tr class="tex-xs-center" style="padding:0px; ">
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
                                label="Grace End Date"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="enddate" @change="fun2"></v-date-picker>
                          </v-menu>
                        </tr>
                      </td>
                    </tr>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="incRow">Add More Unit Details</v-btn>
                  </template>
                </v-data-table>

                <v-flex sm12 md3>
                  <v-text-field
                    v-model="keyData.netmonthlyor"
                    v-on:keypress="isNumber(event)"
                    @click="monthlyOR()"
                    label="Net monthly OR for the property"
                    outline
                  ></v-text-field>
                </v-flex>

                <v-flex sm12 md3>
                  <v-text-field
                    v-model="keyData.mg1"
                    v-on:keypress="isNumber(event)"
                    label="Year 1 Total MG "
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md3>
                  <v-text-field
                    v-model="keyData.mg2"
                    v-on:keypress="isNumber(event)"
                    label="Year 2 Total MG "
                    outline
                  ></v-text-field>
                </v-flex>

                <v-flex sm12 md3>
                  <v-combobox
                    :items="advances"
                    v-model="keyData.advancepay"
                    v-on:keypress="isNumber(event)"
                    label="Advance OR "
                    outline
                  ></v-combobox>
                </v-flex>

                <v-flex sm12 md3>
                  <v-text-field
                    v-model="keyData.spra"
                    v-on:keypress="isNumber(event)"
                    label="SPRA Amount"
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md3>
                  <v-text-field
                    v-model="keyData.damages"
                    v-on:keypress="isNumber(event)"
                    label="Liquidated Damages"
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md3>
                  <v-combobox
                    v-model="keyData.noticeperiod"
                    :items="period"
                    label="Notice Period"
                    outline
                  ></v-combobox>
                </v-flex>
                <v-flex sm12 md3>
                  <v-combobox
                    v-model="keyData.lockperiod"
                    :items="lperiod"
                    label="Lock-In period for Zolo"
                    outline
                  ></v-combobox>
                </v-flex>

                <div class="text-xs-center">
                  <v-dialog width="500">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="sendData(); con(); rowData(); print();"
                        color="Green"
                        dark
                        v-on="on"
                      >Generate</v-btn>
                    </template>

                    <v-card>
                      <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                      >Generated Tranche Details</v-card-title>
                      <v-card-text>
                        <v-data-table
                          :items="rows2"
                          hide-default-footer
                          class="elevation-1"
                          style="display: flex; overflow-x: auto; "
                        >
                          <template v-slot:items="props" style="display: flex; overflow-x: auto;">
                            <tr v-for="item2 in rowNum" :key="item2">
                              <td>
                                Generated Details {{item2}}
                                <tr class="tex-xs-center" style="padding:0px;">
                                  <v-text-field
                                    v-model="props.item.gescf[item2-1]"
                                    label="Escalation Frequency"
                                    v-on:keypress="isNumber(event)"
                                    outline
                                  ></v-text-field>
                                </tr>
                                <tr class="tex-xs-center" style="padding:0px;">
                                  <v-text-field
                                    v-model="props.item.gescp[item2-1]"
                                    label="Escalation Percent"
                                    v-on:keypress="isNumber(event)"
                                    outline
                                  ></v-text-field>
                                </tr>
                              </td>
                              <td>
                                Modified Details {{item2}}
                                <tr class="tex-xs-center" style="padding:0px;">
                                  <v-text-field
                                    v-model="props.item.mescf[item2-1]"
                                    label="Escalation Frequency"
                                    v-on:keypress="isNumber(event)"
                                    outline
                                  ></v-text-field>
                                </tr>
                                <tr class="tex-xs-center" style="padding:0px;">
                                  <v-text-field
                                    v-model="props.item.mescp[item2-1]"
                                    label="Escalation Percent"
                                    v-on:keypress="isNumber(event)"
                                    outline
                                  ></v-text-field>
                                </tr>
                              </td>
                            </tr>

                            <td>
                              Total Generated Details
                              <tr class="tex-xs-center" style="padding:0px;">
                                <v-text-field
                                  @click="total()"
                                  v-model="totalData.gescf"
                                  label="Total Generated Escalation Frequency"
                                  v-on:keypress="isNumber(event)"
                                  outline
                                ></v-text-field>
                              </tr>
                              <tr class="tex-xs-center" style="padding:0px;">
                                <v-text-field
                                  v-model="totalData.gescf"
                                  label="Total Generated Escalation Percent"
                                  v-on:keypress="isNumber(event)"
                                  outline
                                ></v-text-field>
                              </tr>
                            </td>

                            <td>
                              Total Modified Details
                              <tr class="tex-xs-center" style="padding:0px;">
                                <v-text-field
                                  v-model="totalData.mescf"
                                  label="Total Modified Escalation Frequency"
                                  v-on:keypress="isNumber(event)"
                                  outline
                                ></v-text-field>
                              </tr>
                              <tr class="tex-xs-center" style="padding:0px;">
                                <v-text-field
                                  v-model="totalData.mescf"
                                  label="Total Modified Escalation Percent"
                                  v-on:keypress="isNumber(event)"
                                  outline
                                ></v-text-field>
                              </tr>
                            </td>

                            <v-spacer></v-spacer>
                          </template>
                        </v-data-table>
                      </v-card-text>

                      <v-divider></v-divider>
                    </v-card>
                  </v-dialog>
                </div>
                <v-btn href="/tranchedetails" color="Green">Back</v-btn>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
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
    rowNum: 0,
    Lasttid: 0,
    Num: 0,
    baseURl: "http://localhost:3000/",
    isDis: true,
    tabs: "",
    keyData: {
      netmonthlyor: "",
      mg1: "",
      mg2: "",
      advancepay: "",
      spra: "",
      damages: "",
      noticeperiod: "",
      lockperiod: ""
    },
    rows2: [
      {
        gescp: [],
        gescf: [],
        mescp: [],
        mescf: []
      }
    ],
    rows1: {
      id: "",
      typeunit: "",
      unit: "",
      grosslf: "",
      spf: "",
      oe: "",
      or: "",
      escp: "",
      escf: "",
      graceperiod: "",
      startdate: "",
      enddate: ""
    },
    rows: [
      {
        id: [],
        typeunit: [],
        unit: [],
        grosslf: [],
        spf: [],
        oe: [],
        or: [],
        escp: [],
        escf: [],
        graceperiod: [],
        startdate: [],
        enddate: []
      }
    ],
    totalData: {
      gescf: "",
      gescp: "",
      mescf: "",
      mescp: ""
    },
    event: "",
    advances: [
      "First month",
      "First two months",
      "First three months",
      "First four months",
      "First five months",
      "First six months",
      "First seven months",
      "First eight months",
      "First nine months",
      "First ten months",
      "First eleven months",
      "First tweleve months"
    ],
    period: [],
    lperiod: [],
    frequency: [
      "Monthly",
      "11 Months",
      "Yearly",
      "Every 2 years",
      "Every 3 years",
      "Every 4 years",
      "Every 5 years",
      "Others"
    ],
    types: ["1 BHK", "2 BHK", "3 BHK"],
    menu: false,
    menu2: false,
    fetchDate: "",
    fetchDate2: "",
    date: new Date().toISOString().substr(0, 10),
    startdate: new Date().toISOString().substr(0, 10),
    enddate: new Date().toISOString().substr(0, 10)
  }),
  methods: {
    async sendData() {
      console.log("keyData", this.keyData);
      axios.post(this.baseURl + "KeyCommericalTerms/insert", this.keyData);
    },
    con() {
      console.log("props", this.items);

      axios.post(this.baseURl + "entitymap/insert", this.items);
    },
    print() {
      for (var index = 0; index < this.rowNum; index++) {
        this.rows2[0].gescf[index] = this.rows[0].escf[index];
        this.rows2[0].gescp[index] = this.rows[0].escp[index];
        console.log(this.rows2[0].gescf[index]);
        console.log(this.rows2[0].gescp[index]);
      }
    },
    total() {
      var sumgescf = 0;
      var sumgescp = 0;
      var summescf = 0;
      var summescp = 0;
      for (var index = 0; index < this.rowNum; index++) {
        this.rows2[0].gescf[index] = parseInt(this.rows2[0].gescf[index]);
        this.rows2[0].gescp[index] = parseInt(this.rows2[0].gescp[index]);
        this.rows2[0].mescf[index] = parseInt(this.rows2[0].mescf[index]);
        this.rows2[0].mescp[index] = parseInt(this.rows2[0].mescp[index]);
        sumgescf = sumgescf + this.rows2[0].gescf[index]
        sumgescp = sumgescp + this.rows2[0].gescp[index]
        summescf = summescf + this.rows2[0].mescf[index]
        summescp = summescp + this.rows2[0].mescp[index]
        console.log(this.rows2[0].gescf[index])
        console.log("ty",sumgescp);
      }
      this.totalData.gescf = sumgescf
      this.totalData.gescp = sumgescp
      this.totalData.mescf = summescf
      this.totalData.mescp = summescp
      console.log(this.totalData.gescf )
    },
    async rowData() {
      for (var index = 0; index < this.rowNum; index++) {
        console.log("rowNum", this.rowNum);
        console.log("bye1", this.rows[0]);
        this.rows1.id = this.Lastid + 1;
        if (this.rows[0].typeunit[index] === undefined) {
          this.rows[0].typeunit[index] = " ";
        }
        if (this.rows[0].unit[index] === undefined) {
          this.rows[0].unit[index] = " ";
        }
        if (this.rows[0].grosslf[index] === undefined) {
          this.rows[0].grosslf[index] = " ";
        }
        if (this.rows[0].spf[index] === undefined) {
          this.rows[0].spf[index] = " ";
        }
        if (this.rows[0].oe[index] === undefined) {
          this.rows[0].oe[index] = " ";
        }
        if (this.rows[0].or[index] === undefined) {
          this.rows[0].or[index] = " ";
        }
        if (this.rows[0].escp[index] === undefined) {
          this.rows[0].escp[index] = " ";
        }
        if (this.rows[0].escf[index] === undefined) {
          this.rows[0].escf[index] = " ";
        }
        if (this.rows[0].startdate[index] === undefined) {
          this.rows[0].startdate[index] = " ";
        }
        if (this.rows[0].enddate[index] === undefined) {
          this.rows[0].enddate[index] = " ";
        }

        this.rows1.typeunit = this.rows[0].typeunit[index];
        this.rows1.unit = this.rows[0].unit[index];
        this.rows1.grosslf = this.rows[0].grosslf[index];
        this.rows1.spf = this.rows[0].spf[index];
        this.rows1.oe = this.rows[0].oe[index];
        this.rows1.or = this.rows[0].or[index];
        this.rows1.escp = this.rows[0].escp[index];
        this.rows1.escf = this.rows[0].escf[index];
        this.rows1.startdate = this.rows[0].startdate[index];
        this.rows1.enddate = this.rows[0].enddate[index];

        console.log("bye", this.rows1);
        console.log("index", index);
        await axios.post(
          this.baseURl + "tranchedetailsunit/insert",
          this.rows1
        );
      }
    },
    modalData() {
      console.log(this.rows[0].escp[this.rowNum - 1]);
      for (var index = 0; index < this.rowNum; index++) {
        this.rows[0].gescp[index] = this.rows[0].escp[index];
        this.rows[0].gescf[index] = this.rows[0].escf[index];
      }
    },
    
    addNewRow() {
      this.items.assign({
        id: "",
        typeunit: "",
        unit: "",
        grosslf: "",
        spf: "",
        oe: "",
        or: "",
        escp: "",
        escf: "",
        graceperiod: "",
        startdate: "",
        enddate: ""
      });
    },
    delRow() {
      this.delete.row1;
    },
    incRow() {
      this.rowNum++;
    },
    decRow() {
      this.rowNum--;
    },
    netOR() {
      var index = this.rowNum - 1;
      console.log(index);
      console.log(this.rows[0].grosslf[index]);
      this.rows[0].grosslf[index] = parseInt(this.rows[0].grosslf[index]);
      this.rows[0].spf[index] = parseInt(this.rows[0].spf[index]);
      this.rows[0].oe[index] = parseInt(this.rows[0].oe[index]);
      this.rows[0].or[index] =
        this.rows[0].grosslf[index] -
        this.rows[0].spf[index] -
        this.rows[0].oe[index];
      console.log(this.rows[0].or[index]);
      console.log(this.rows[0]);
    },
    monthlyOR() {
      var sum = 0;
      for (var index = 0; index < this.rowNum; index++) {
        this.rows[0].unit[index] = parseInt(this.rows[0].unit[index]);
        console.log("unit", this.rows[0].or[index]);
        sum = sum + this.rows[0].or[index] * this.rows[0].unit[index];
        console.log("sum", sum);
      }
      this.keyData.netmonthlyor = sum;
      console.log(this.keyData.netmonthlyor);
      this.keyData.mg1 = this.keyData.netmonthlyor * 12;
    },
    fun() {
      this.menu = false;
      this.menu = false;
      this.rows.startdate = this.date;
      console.log("date", this.startdate);
    },
    fun2() {
      this.menu2 = false;
      this.menu2 = false;
      this.rows.enddate = this.date;
      console.log("date", this.enddate);
    },

    async Id() {
      await axios
        .get(this.baseURl + "KeyCommericalTerms/getid")
        .then(response => {
          console.log("hi", response.data[0]);
          if (response.data[0].id === undefined) {
            this.Lastid = 0;
          } else {
            this.Lastid = response.data[0].id;
          }
        });
    },
    Period() {
      for (var i = 1; i <= 48; i++) {
        this.period.push(i + " months");
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
    LPeriod() {
      for (var i = 1; i <= 96; i++) {
        this.period.push(i + " months");
      }
    }
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.startdate ? moment(this.startdate).format("DD/MM/YYYY") : "";
    },
    computedDateFormattedMomentjs2() {
      return this.enddate ? moment(this.enddate).format("DD/MM/YYYY") : "";
    }
  },
  mounted() {
    this.Period();
    this.LPeriod();
    this.Id();
  }
};
</script>

<style>
tbody {
  padding-top: 0.2%;
}
div.v-text-field.v-text-field--enclosed {
  width: 400px;
}
div.v-datatable.v-table.theme--light {
  visibility: hidden;
  width: 0;
  height: 0;
}
</style>
