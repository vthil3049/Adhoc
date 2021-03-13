import fetch from "../util/fetch-fill";
import URI from "urijs";
import { ResolvePlugin } from 'webpack';

// /records endpoint
window.path = "http://localhost:3000/records";
let totalRecords = 0;

// Your retrieve function plus any additional functions go here ...
function retrieve(options) {
   function isEmptyObject(obj) {
      return JSON.stringify(obj) === '{}';
   }

   function getRecordCount() {
      return new Promise((resolve, reject) => {
         fetch(window.path)
            .then(allrecords => {
               if (allrecords) {
                  resolve(allrecords.length);
               }
               else {
                  reject('could not get records')
               }
            },
               error => {
                  reject('could not get records')
               }
            )
      });
   }

   async function countRecords() {
      totalRecords = await getRecordCount();
   }

   if (totalRecords == 0) 
   {
      countRecords();
   }

   let urlstr = window.path;
   if (!isEmptyObject(options)) {
      urlstr += '?';
   }

   if (options.limit) {
      urlstr += `limit=${limit}`
   }
   fetch(window.path)
      .then(response => response.json())
      .then(data => console.log(data));




}

export default retrieve;
