import React from 'react';
import { useState } from "react";
import axios from "axios";


const GenerateCode = async (ev, numCodesSet, setCodeCallback) => {
    ev.preventDefault();
    
    try {
      console.log("Starting");
      const response = await axios.post("https://3u1gcbtihl.execute-api.us-west-1.amazonaws.com/LIVE/transactions", {
        numCodes: numCodesSet
      });
      console.log("DONE:");
      console.log(JSON.stringify(response));
      setCodeCallback(response.data.transaction.id);
      // return response;
    } 
    catch (err) {
      console.log("Err: " + JSON.stringify(err));
      // return "Caught err: " + err;
    }
  }

  
const QueryCode = async (ev, callback) => {
    ev.preventDefault();
    // console.log("Event target: " + JSON.stringify(ev.target.value));
    // var json = JSON.stringify(ev.target.code.value, function (k, v) { return k && v && typeof v !== "number" ? "" + v : v; }); // will expose arrays as strings.
    // console.log("Event stuff: " + json);
    // console.log("Querying code: " + code);
    var code = ev.target.code.value;
    console.log(code);
    try {
      const response = await axios.get("https://3u1gcbtihl.execute-api.us-west-1.amazonaws.com/LIVE/transactions?code="+code);
      console.log("Done");
      console.log(JSON.stringify(response));
      callback(JSON.stringify(response.data));
    }
    catch (err) {
      console.log("Err: " + (err));
  
    }
  }

function QueryCodeForm(props) {

    const [code, setCode] = useState("noState");
    const [codeStatus, setCodeStatus] = useState("noCodeStatus");
  
    return (
        <div>
            <button onClick={event => GenerateCode(event, 1, setCode)}>
        Get Code! {code}
      </button>

      <button onClick={event => GenerateCode(event, numDonuts, setCode)}>
        </button>
      <form onSubmit={event => QueryCode(event, setCodeStatus)}>
        <label>
          Code to Check:
          <input type="text" name="code" />
        </label>
        <input type="submit" value="Check" />
        {codeStatus}
      </form>
        </div>
    );
}

export default QueryCodeForm;