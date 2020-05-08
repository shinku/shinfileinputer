!function(n,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.shinfileinput=e():n.shinfileinput=e()}(window,(function(){return function(n){var e={};function t(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return n[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=n,t.c=e,t.d=function(n,e,i){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:i})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)t.d(i,r,function(e){return n[e]}.bind(null,r));return i},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s="./src/index.ts")}({"./src/core/shinfileinput.ts":
/*!***********************************!*\
  !*** ./src/core/shinfileinput.ts ***!
  \***********************************/
/*! exports provided: OUTOUTTYPE, default */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OUTOUTTYPE", function() { return OUTOUTTYPE; });\nvar OUTOUTTYPE;\n\n(function (OUTOUTTYPE) {\n  OUTOUTTYPE["BASE64"] = "base64";\n  OUTOUTTYPE["TEXT"] = "text";\n  OUTOUTTYPE["BUFFER"] = "arraybuffer";\n})(OUTOUTTYPE || (OUTOUTTYPE = {}));\n\nvar shinfileinput =\n/** @class */\nfunction () {\n  function shinfileinput(ismultiple) {\n    if (ismultiple === void 0) {\n      ismultiple = false;\n    }\n\n    this._ismultiple = false;\n    this._limitSize = 50 * 1024 * 100;\n    this._ismultiple = ismultiple;\n    this.accept = ".*";\n    this.initInput();\n\n    if (window.hasOwnProperty(\'File\') && window.hasOwnProperty(\'FileReader\') && window.hasOwnProperty(\'FileList\') && window.hasOwnProperty(\'Blob\')) {\n      console.log("Great success! All the File APIs are supported.");\n    } else {\n      console.log(\'The File APIs are not fully supported in this browser.\');\n      alert("你使用的浏览器不支持文件本地上传。请更新你的浏览器"); //return;\n    }\n\n    ; //初始化input标签，\n  }\n\n  shinfileinput.prototype.initInput = function () {\n    var _this = this;\n\n    this.input = null;\n    this.input = document.createElement(\'input\');\n    this.input.type = \'file\';\n    this.input.accept = this.accept; //document.body.appendChild(this.input);\n\n    if (this.ismultiple) {\n      this.input.setAttribute(\'multiple\', \'multiple\');\n    }\n\n    this.input.onchange = function (e) {\n      _this.fileSelect(e);\n    };\n  };\n\n  shinfileinput.prototype.setLimitSize = function (size) {\n    this._limitSize = size;\n    return this;\n  };\n\n  Object.defineProperty(shinfileinput.prototype, "ismultiple", {\n    get: function () {\n      return this._ismultiple;\n    },\n    set: function (val) {\n      this._ismultiple = val;\n\n      if (val && this.input) {\n        this.input.setAttribute(\'multiple\', "multiple");\n      } else if (!val && this.input) {\n        this.input.removeAttribute(\'multiple\');\n      }\n    },\n    enumerable: true,\n    configurable: true\n  });\n\n  shinfileinput.prototype.setMultiple = function (val) {\n    this.ismultiple = val;\n    return this;\n  };\n\n  Object.defineProperty(shinfileinput.prototype, "files", {\n    get: function () {\n      return this._files;\n    },\n    set: function (val) {\n      console.warn("this params is not allowed be setted");\n    },\n    enumerable: true,\n    configurable: true\n  });\n\n  shinfileinput.prototype.fileSelect = function (e) {\n    var _this = this;\n\n    var filedatas = this.input.files;\n    this._files = this.input.files; //如果重复提交同一个文件，不用再次读取。直接返回即可。\n\n    var outputset = new Set(this.outputoption);\n    var promises = [];\n\n    for (var i = 0; i < filedatas.length; i++) {\n      var file = filedatas[i];\n\n      if (!file) {\n        console.log(\'没有选择文件\');\n        return;\n      } else {\n        promises.push(this.startReadFile(file, outputset));\n      }\n    }\n\n    Promise.all(promises).then(function (res) {\n      if (_this.callback) {\n        _this.callback.call(null, res);\n      }\n\n      ;\n\n      _this.initInput();\n    });\n  };\n\n  shinfileinput.prototype.startReadFile = function (file, options) {\n    //console.log(\'startload\');\n    if (file.size > this._limitSize) {\n      return Promise.resolve({\n        data: null,\n        msg: "size outof limited"\n      });\n    }\n\n    var readfile = function (option) {\n      return new Promise(function (ros, jet) {\n        var filereader = new FileReader();\n\n        filereader.onload = function (e) {\n          ros({\n            data: filereader.result,\n            type: option\n          });\n        };\n\n        switch (option) {\n          case OUTOUTTYPE.BASE64:\n            filereader.readAsDataURL(file);\n            break;\n\n          case OUTOUTTYPE.BUFFER:\n            filereader.readAsArrayBuffer(file);\n            break;\n\n          case OUTOUTTYPE.TEXT:\n            filereader.readAsText(file);\n            break;\n\n          default:\n            ros({\n              data: null,\n              type: option,\n              msg: "outputtype not exists"\n            });\n            break;\n        }\n      });\n    };\n\n    return new Promise(function (ros, jet) {\n      var arr = [];\n      options.forEach(function (option) {\n        arr.push(readfile(option));\n      });\n      Promise.all(arr).then(function (res) {\n        ros({\n          file: file,\n          datas: res\n        });\n      });\n    });\n  };\n\n  shinfileinput.prototype.loadFile = function (filters, callback, errorhandle) {\n    //console.log(this.input);\n    this.callback = callback;\n    this.errorhandle = errorhandle;\n\n    if (filters) {\n      this.input.accept = filters;\n    } //console.log(this.input);\n\n\n    if (document.all) {\n      this.input.click();\n    } else {\n      var e = document.createEvent(\'MouseEvents\');\n      e.initEvent(\'click\', true, true);\n      this.input.dispatchEvent(e);\n    }\n  };\n\n  shinfileinput.prototype.start = function (filters, outputoption) {\n    var _this = this;\n\n    this.outputoption = outputoption || [OUTOUTTYPE.BASE64];\n    return new Promise(function (res, jet) {\n      _this.loadFile(filters, res, jet);\n    });\n  };\n\n  return shinfileinput;\n}();\n\n/* harmony default export */ __webpack_exports__["default"] = (shinfileinput);\n\n//# sourceURL=webpack://shinfileinput/./src/core/shinfileinput.ts?')},"./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default, OUTOUTTYPE */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_shinfileinput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/shinfileinput */ "./src/core/shinfileinput.ts");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OUTOUTTYPE", function() { return _core_shinfileinput__WEBPACK_IMPORTED_MODULE_0__["OUTOUTTYPE"]; });\n\n\n/* harmony default export */ __webpack_exports__["default"] = (_core_shinfileinput__WEBPACK_IMPORTED_MODULE_0__["default"]);\n\n\n//# sourceURL=webpack://shinfileinput/./src/index.ts?')}})}));