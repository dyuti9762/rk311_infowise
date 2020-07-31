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

class NetNameInspector {
  constructor() {
    //Load in your blacklists etc here for the piple line
  }

  /**
   * Inspection procedure f
   * @param {*} data transformed data
   */
  async inspectionTechnique(data) {
    if (data.indexOf("ANUBHAV") != -1) {
      return -100;
    } else {
      return 0;
    }
  }

  /**
   * Transformer
   * @param {*} data
   */
  transformer(data) {
    return data.netname;
  }
}

module.exports = NetNameInspector;
