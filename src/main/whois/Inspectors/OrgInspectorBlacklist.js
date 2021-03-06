/*
 * Filename: c:\Users\inktv\Desktop\SIH\whos-architecture\Inspectors\PipeLineInspector
 * Path: c:\Users\inktv\Desktop\SIH\whos-architecture
 * Created Date: Monday, July 20th 2020, 2:51:19 pm
 * Author: Dying
 *
 * Copyright (c) 2020
 *
 * Do not modify this file
 */
var fs = require("fs");
const os = require("os");
const path = require("path");

function matchKeyword(string, arr) {
  for (regex of arr) {
    if (regex.test(string)) return true;
  }
  return false;
}

class OrgInspectorBlacklist {
  constructor() {
    //Load in your blacklists etc here for the piple line

    this.orgBlacklist = fs
      .readFileSync(
        path.resolve(
          __dirname,
          "../",
          "Blacklists",
          "OrganizationBlacklist.txt"
        ),
        "utf8"
      )
      .toLowerCase()
      .split(os.EOL);

    this.org_map = {};

    this.orgBlacklist.forEach((org) => {
      let params = org.split("    ");
      this.org_map[String(params[0])] = parseFloat(params[1]);
    });

    // console.log(this.org_map);
  }

  /**
   * Inspection procedure f
   * @param {*} data transformed data
   */
  async inspectionTechnique(data) {
    // console.log(data);
    //Matching the organisation with our blacklisted database
    // return this.org_map[data] || 0;
    let score = this.org_map[String(data).toLowerCase()];
    if (score > 0 && score <= 30) {
      return [
        score,
        String(
          "The organisation : " +
            data +
            " is deemed to be secure and unsuspicious based on the internal scores used by the inspector. This organization seems to be a normal internet service provider and IP should have a normal connection. A score of : " +
            score +
            " is assigned to this IP by the enforced inspector."
        ),
      ];
    } else if (score > 30 && score < 70) {
      return [
        score,
        String(
          "The organisation : " +
            data +
            " appears to be suspicious and unreliable based on the internal scores used by the inspector. This organisation maybe a large hosting company or a malicious ISP. Hence a score of : " +
            score +
            " is assigned to this IP by the enforced inspector."
        ),
      ];
    } else if (score >= 70 && score <= 100) {
      return [
        score,
        String(
          "The organisation : " +
            data +
            " appears to be Proxy/VPN service provider based on the internal scores used by the inspector. Hence a score of : " +
            score +
            " is assigned to this IP by the enforced inspector."
        ),
      ];
    } else {
      return [0, "Nothing detected."];
    }
  }

  /**
   * Transformer
   * @param {*} data
   */
  async transformer(data) {
    return String(data.name);
  }
}

module.exports = OrgInspectorBlacklist;
