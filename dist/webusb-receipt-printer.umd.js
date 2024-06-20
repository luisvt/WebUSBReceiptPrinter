!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e="undefined"!=typeof globalThis?globalThis:e||self).WebUSBReceiptPrinter=n()}(this,(function(){"use strict";class e{constructor(e){this._events={}}on(e,n){this._events[e]=this._events[e]||[],this._events[e].push(n)}emit(e,...n){let i=this._events[e];i&&i.forEach((e=>{e(...n)}))}}const n=[{filters:[{vendorId:1046,productId:20497}],configuration:1,interface:0,endpoint:3,language:"esc-pos",codepageMapping:"zjiang"},{filters:[{vendorId:1049}],configuration:1,interface:0,endpoint:1,language:"esc-pos",codepageMapping:"bixolon"},{filters:[{vendorId:1305}],configuration:1,interface:0,language:"star-prnt",codepageMapping:"star"},{filters:[{vendorId:1208}],configuration:1,interface:0,endpoint:1,language:"esc-pos",codepageMapping:"epson"},{filters:[{vendorId:7568}],configuration:1,interface:0,endpoint:2,language:"esc-pos",codepageMapping:"citizen"},{filters:[{vendorId:4070,productId:33054}],configuration:1,interface:0,endpoint:2,language:"esc-pos",codepageMapping:"epson"},{filters:[{vendorId:8137,productId:8214}],configuration:1,interface:0,language:"esc-pos",codepageMapping:"xprinter"}];return class{constructor(){this._internal={emitter:new e,device:null,profile:null},navigator.usb.addEventListener("disconnect",(e=>{this._internal.device==e.device&&this._internal.emitter.emit("disconnected")}))}async connect(){try{let e=await navigator.usb.requestDevice({filters:n.map((e=>e.filters)).reduce(((e,n)=>e.concat(n)))});e&&await this.open(e)}catch(e){console.log("Could not connect! "+e)}}async reconnect(e){let n=await navigator.usb.getDevices(),i=n.find((n=>n.serialNumber==e.serialNumber));i||(i=n.find((n=>n.vendorId==e.vendorId&&n.productId==e.productId))),i&&await this.open(i)}async open(e){this._internal.device=e,this._internal.profile=n.find((e=>e.filters.some((e=>e.vendorId&&e.productId?e.vendorId==this._internal.device.vendorId&&e.productId==this._internal.device.productId:e.vendorId==this._internal.device.vendorId)))),await this._internal.device.open(),await this._internal.device.selectConfiguration(this._internal.profile.configuration),await this._internal.device.claimInterface(this._internal.profile.interface),this._internal.emitter.emit("connected",{type:"usb",manufacturerName:this._internal.device.manufacturerName,productName:this._internal.device.productName,serialNumber:this._internal.device.serialNumber,vendorId:this._internal.device.vendorId,productId:this._internal.device.productId,language:this._internal.profile.language,codepageMapping:this._internal.profile.codepageMapping})}async disconnect(){this._internal.device&&(await this._internal.device.close(),this._internal.device=null,this._internal.profile=null,this._internal.emitter.emit("disconnected"))}async print(e){let n=this._internal.profile.endpoint;if(!n){let e=this._internal.device.configuration.interfaces.find((e=>e.interfaceNumber==this._internal.profile.interface)).alternate.endpoints.find((e=>"out"==e.direction));e&&(n=e.endpointNumber)}if(n)try{await this._internal.device.transferOut(n,e)}catch(e){console.log(e)}}addEventListener(e,n){this._internal.emitter.on(e,n)}}}));
