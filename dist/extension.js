"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/json5/lib/unicode.js
var require_unicode = __commonJS({
  "node_modules/json5/lib/unicode.js"(exports2, module2) {
    module2.exports.Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
    module2.exports.ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
    module2.exports.ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
  }
});

// node_modules/json5/lib/util.js
var require_util = __commonJS({
  "node_modules/json5/lib/util.js"(exports2, module2) {
    var unicode = require_unicode();
    module2.exports = {
      isSpaceSeparator(c) {
        return typeof c === "string" && unicode.Space_Separator.test(c);
      },
      isIdStartChar(c) {
        return typeof c === "string" && (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c === "$" || c === "_" || unicode.ID_Start.test(c));
      },
      isIdContinueChar(c) {
        return typeof c === "string" && (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9" || c === "$" || c === "_" || c === "\u200C" || c === "\u200D" || unicode.ID_Continue.test(c));
      },
      isDigit(c) {
        return typeof c === "string" && /[0-9]/.test(c);
      },
      isHexDigit(c) {
        return typeof c === "string" && /[0-9A-Fa-f]/.test(c);
      }
    };
  }
});

// node_modules/json5/lib/parse.js
var require_parse = __commonJS({
  "node_modules/json5/lib/parse.js"(exports2, module2) {
    var util = require_util();
    var source;
    var parseState;
    var stack;
    var pos;
    var line;
    var column;
    var token;
    var key;
    var root;
    module2.exports = function parse(text, reviver) {
      source = String(text);
      parseState = "start";
      stack = [];
      pos = 0;
      line = 1;
      column = 0;
      token = void 0;
      key = void 0;
      root = void 0;
      do {
        token = lex();
        parseStates[parseState]();
      } while (token.type !== "eof");
      if (typeof reviver === "function") {
        return internalize({ "": root }, "", reviver);
      }
      return root;
    };
    function internalize(holder, name, reviver) {
      const value = holder[name];
      if (value != null && typeof value === "object") {
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            const key2 = String(i);
            const replacement = internalize(value, key2, reviver);
            if (replacement === void 0) {
              delete value[key2];
            } else {
              Object.defineProperty(value, key2, {
                value: replacement,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          }
        } else {
          for (const key2 in value) {
            const replacement = internalize(value, key2, reviver);
            if (replacement === void 0) {
              delete value[key2];
            } else {
              Object.defineProperty(value, key2, {
                value: replacement,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          }
        }
      }
      return reviver.call(holder, name, value);
    }
    var lexState;
    var buffer;
    var doubleQuote;
    var sign;
    var c;
    function lex() {
      lexState = "default";
      buffer = "";
      doubleQuote = false;
      sign = 1;
      for (; ; ) {
        c = peek();
        const token2 = lexStates[lexState]();
        if (token2) {
          return token2;
        }
      }
    }
    function peek() {
      if (source[pos]) {
        return String.fromCodePoint(source.codePointAt(pos));
      }
    }
    function read() {
      const c2 = peek();
      if (c2 === "\n") {
        line++;
        column = 0;
      } else if (c2) {
        column += c2.length;
      } else {
        column++;
      }
      if (c2) {
        pos += c2.length;
      }
      return c2;
    }
    var lexStates = {
      default() {
        switch (c) {
          case "	":
          case "\v":
          case "\f":
          case " ":
          case "\xA0":
          case "\uFEFF":
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
            read();
            return;
          case "/":
            read();
            lexState = "comment";
            return;
          case void 0:
            read();
            return newToken("eof");
        }
        if (util.isSpaceSeparator(c)) {
          read();
          return;
        }
        return lexStates[parseState]();
      },
      comment() {
        switch (c) {
          case "*":
            read();
            lexState = "multiLineComment";
            return;
          case "/":
            read();
            lexState = "singleLineComment";
            return;
        }
        throw invalidChar(read());
      },
      multiLineComment() {
        switch (c) {
          case "*":
            read();
            lexState = "multiLineCommentAsterisk";
            return;
          case void 0:
            throw invalidChar(read());
        }
        read();
      },
      multiLineCommentAsterisk() {
        switch (c) {
          case "*":
            read();
            return;
          case "/":
            read();
            lexState = "default";
            return;
          case void 0:
            throw invalidChar(read());
        }
        read();
        lexState = "multiLineComment";
      },
      singleLineComment() {
        switch (c) {
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
            read();
            lexState = "default";
            return;
          case void 0:
            read();
            return newToken("eof");
        }
        read();
      },
      value() {
        switch (c) {
          case "{":
          case "[":
            return newToken("punctuator", read());
          case "n":
            read();
            literal("ull");
            return newToken("null", null);
          case "t":
            read();
            literal("rue");
            return newToken("boolean", true);
          case "f":
            read();
            literal("alse");
            return newToken("boolean", false);
          case "-":
          case "+":
            if (read() === "-") {
              sign = -1;
            }
            lexState = "sign";
            return;
          case ".":
            buffer = read();
            lexState = "decimalPointLeading";
            return;
          case "0":
            buffer = read();
            lexState = "zero";
            return;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            buffer = read();
            lexState = "decimalInteger";
            return;
          case "I":
            read();
            literal("nfinity");
            return newToken("numeric", Infinity);
          case "N":
            read();
            literal("aN");
            return newToken("numeric", NaN);
          case '"':
          case "'":
            doubleQuote = read() === '"';
            buffer = "";
            lexState = "string";
            return;
        }
        throw invalidChar(read());
      },
      identifierNameStartEscape() {
        if (c !== "u") {
          throw invalidChar(read());
        }
        read();
        const u = unicodeEscape();
        switch (u) {
          case "$":
          case "_":
            break;
          default:
            if (!util.isIdStartChar(u)) {
              throw invalidIdentifier();
            }
            break;
        }
        buffer += u;
        lexState = "identifierName";
      },
      identifierName() {
        switch (c) {
          case "$":
          case "_":
          case "\u200C":
          case "\u200D":
            buffer += read();
            return;
          case "\\":
            read();
            lexState = "identifierNameEscape";
            return;
        }
        if (util.isIdContinueChar(c)) {
          buffer += read();
          return;
        }
        return newToken("identifier", buffer);
      },
      identifierNameEscape() {
        if (c !== "u") {
          throw invalidChar(read());
        }
        read();
        const u = unicodeEscape();
        switch (u) {
          case "$":
          case "_":
          case "\u200C":
          case "\u200D":
            break;
          default:
            if (!util.isIdContinueChar(u)) {
              throw invalidIdentifier();
            }
            break;
        }
        buffer += u;
        lexState = "identifierName";
      },
      sign() {
        switch (c) {
          case ".":
            buffer = read();
            lexState = "decimalPointLeading";
            return;
          case "0":
            buffer = read();
            lexState = "zero";
            return;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            buffer = read();
            lexState = "decimalInteger";
            return;
          case "I":
            read();
            literal("nfinity");
            return newToken("numeric", sign * Infinity);
          case "N":
            read();
            literal("aN");
            return newToken("numeric", NaN);
        }
        throw invalidChar(read());
      },
      zero() {
        switch (c) {
          case ".":
            buffer += read();
            lexState = "decimalPoint";
            return;
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
          case "x":
          case "X":
            buffer += read();
            lexState = "hexadecimal";
            return;
        }
        return newToken("numeric", sign * 0);
      },
      decimalInteger() {
        switch (c) {
          case ".":
            buffer += read();
            lexState = "decimalPoint";
            return;
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalPointLeading() {
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalFraction";
          return;
        }
        throw invalidChar(read());
      },
      decimalPoint() {
        switch (c) {
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalFraction";
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalFraction() {
        switch (c) {
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalExponent() {
        switch (c) {
          case "+":
          case "-":
            buffer += read();
            lexState = "decimalExponentSign";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalExponentInteger";
          return;
        }
        throw invalidChar(read());
      },
      decimalExponentSign() {
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalExponentInteger";
          return;
        }
        throw invalidChar(read());
      },
      decimalExponentInteger() {
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      hexadecimal() {
        if (util.isHexDigit(c)) {
          buffer += read();
          lexState = "hexadecimalInteger";
          return;
        }
        throw invalidChar(read());
      },
      hexadecimalInteger() {
        if (util.isHexDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      string() {
        switch (c) {
          case "\\":
            read();
            buffer += escape();
            return;
          case '"':
            if (doubleQuote) {
              read();
              return newToken("string", buffer);
            }
            buffer += read();
            return;
          case "'":
            if (!doubleQuote) {
              read();
              return newToken("string", buffer);
            }
            buffer += read();
            return;
          case "\n":
          case "\r":
            throw invalidChar(read());
          case "\u2028":
          case "\u2029":
            separatorChar(c);
            break;
          case void 0:
            throw invalidChar(read());
        }
        buffer += read();
      },
      start() {
        switch (c) {
          case "{":
          case "[":
            return newToken("punctuator", read());
        }
        lexState = "value";
      },
      beforePropertyName() {
        switch (c) {
          case "$":
          case "_":
            buffer = read();
            lexState = "identifierName";
            return;
          case "\\":
            read();
            lexState = "identifierNameStartEscape";
            return;
          case "}":
            return newToken("punctuator", read());
          case '"':
          case "'":
            doubleQuote = read() === '"';
            lexState = "string";
            return;
        }
        if (util.isIdStartChar(c)) {
          buffer += read();
          lexState = "identifierName";
          return;
        }
        throw invalidChar(read());
      },
      afterPropertyName() {
        if (c === ":") {
          return newToken("punctuator", read());
        }
        throw invalidChar(read());
      },
      beforePropertyValue() {
        lexState = "value";
      },
      afterPropertyValue() {
        switch (c) {
          case ",":
          case "}":
            return newToken("punctuator", read());
        }
        throw invalidChar(read());
      },
      beforeArrayValue() {
        if (c === "]") {
          return newToken("punctuator", read());
        }
        lexState = "value";
      },
      afterArrayValue() {
        switch (c) {
          case ",":
          case "]":
            return newToken("punctuator", read());
        }
        throw invalidChar(read());
      },
      end() {
        throw invalidChar(read());
      }
    };
    function newToken(type, value) {
      return {
        type,
        value,
        line,
        column
      };
    }
    function literal(s) {
      for (const c2 of s) {
        const p = peek();
        if (p !== c2) {
          throw invalidChar(read());
        }
        read();
      }
    }
    function escape() {
      const c2 = peek();
      switch (c2) {
        case "b":
          read();
          return "\b";
        case "f":
          read();
          return "\f";
        case "n":
          read();
          return "\n";
        case "r":
          read();
          return "\r";
        case "t":
          read();
          return "	";
        case "v":
          read();
          return "\v";
        case "0":
          read();
          if (util.isDigit(peek())) {
            throw invalidChar(read());
          }
          return "\0";
        case "x":
          read();
          return hexEscape();
        case "u":
          read();
          return unicodeEscape();
        case "\n":
        case "\u2028":
        case "\u2029":
          read();
          return "";
        case "\r":
          read();
          if (peek() === "\n") {
            read();
          }
          return "";
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          throw invalidChar(read());
        case void 0:
          throw invalidChar(read());
      }
      return read();
    }
    function hexEscape() {
      let buffer2 = "";
      let c2 = peek();
      if (!util.isHexDigit(c2)) {
        throw invalidChar(read());
      }
      buffer2 += read();
      c2 = peek();
      if (!util.isHexDigit(c2)) {
        throw invalidChar(read());
      }
      buffer2 += read();
      return String.fromCodePoint(parseInt(buffer2, 16));
    }
    function unicodeEscape() {
      let buffer2 = "";
      let count = 4;
      while (count-- > 0) {
        const c2 = peek();
        if (!util.isHexDigit(c2)) {
          throw invalidChar(read());
        }
        buffer2 += read();
      }
      return String.fromCodePoint(parseInt(buffer2, 16));
    }
    var parseStates = {
      start() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        push();
      },
      beforePropertyName() {
        switch (token.type) {
          case "identifier":
          case "string":
            key = token.value;
            parseState = "afterPropertyName";
            return;
          case "punctuator":
            pop();
            return;
          case "eof":
            throw invalidEOF();
        }
      },
      afterPropertyName() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        parseState = "beforePropertyValue";
      },
      beforePropertyValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        push();
      },
      beforeArrayValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        if (token.type === "punctuator" && token.value === "]") {
          pop();
          return;
        }
        push();
      },
      afterPropertyValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        switch (token.value) {
          case ",":
            parseState = "beforePropertyName";
            return;
          case "}":
            pop();
        }
      },
      afterArrayValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        switch (token.value) {
          case ",":
            parseState = "beforeArrayValue";
            return;
          case "]":
            pop();
        }
      },
      end() {
      }
    };
    function push() {
      let value;
      switch (token.type) {
        case "punctuator":
          switch (token.value) {
            case "{":
              value = {};
              break;
            case "[":
              value = [];
              break;
          }
          break;
        case "null":
        case "boolean":
        case "numeric":
        case "string":
          value = token.value;
          break;
      }
      if (root === void 0) {
        root = value;
      } else {
        const parent = stack[stack.length - 1];
        if (Array.isArray(parent)) {
          parent.push(value);
        } else {
          Object.defineProperty(parent, key, {
            value,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
      if (value !== null && typeof value === "object") {
        stack.push(value);
        if (Array.isArray(value)) {
          parseState = "beforeArrayValue";
        } else {
          parseState = "beforePropertyName";
        }
      } else {
        const current = stack[stack.length - 1];
        if (current == null) {
          parseState = "end";
        } else if (Array.isArray(current)) {
          parseState = "afterArrayValue";
        } else {
          parseState = "afterPropertyValue";
        }
      }
    }
    function pop() {
      stack.pop();
      const current = stack[stack.length - 1];
      if (current == null) {
        parseState = "end";
      } else if (Array.isArray(current)) {
        parseState = "afterArrayValue";
      } else {
        parseState = "afterPropertyValue";
      }
    }
    function invalidChar(c2) {
      if (c2 === void 0) {
        return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
      }
      return syntaxError(`JSON5: invalid character '${formatChar(c2)}' at ${line}:${column}`);
    }
    function invalidEOF() {
      return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
    }
    function invalidIdentifier() {
      column -= 5;
      return syntaxError(`JSON5: invalid identifier character at ${line}:${column}`);
    }
    function separatorChar(c2) {
      console.warn(`JSON5: '${formatChar(c2)}' in strings is not valid ECMAScript; consider escaping`);
    }
    function formatChar(c2) {
      const replacements = {
        "'": "\\'",
        '"': '\\"',
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "	": "\\t",
        "\v": "\\v",
        "\0": "\\0",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029"
      };
      if (replacements[c2]) {
        return replacements[c2];
      }
      if (c2 < " ") {
        const hexString = c2.charCodeAt(0).toString(16);
        return "\\x" + ("00" + hexString).substring(hexString.length);
      }
      return c2;
    }
    function syntaxError(message) {
      const err = new SyntaxError(message);
      err.lineNumber = line;
      err.columnNumber = column;
      return err;
    }
  }
});

// node_modules/json5/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/json5/lib/stringify.js"(exports2, module2) {
    var util = require_util();
    module2.exports = function stringify(value, replacer, space) {
      const stack = [];
      let indent2 = "";
      let propertyList;
      let replacerFunc;
      let gap = "";
      let quote;
      if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
        space = replacer.space;
        quote = replacer.quote;
        replacer = replacer.replacer;
      }
      if (typeof replacer === "function") {
        replacerFunc = replacer;
      } else if (Array.isArray(replacer)) {
        propertyList = [];
        for (const v of replacer) {
          let item;
          if (typeof v === "string") {
            item = v;
          } else if (typeof v === "number" || v instanceof String || v instanceof Number) {
            item = String(v);
          }
          if (item !== void 0 && propertyList.indexOf(item) < 0) {
            propertyList.push(item);
          }
        }
      }
      if (space instanceof Number) {
        space = Number(space);
      } else if (space instanceof String) {
        space = String(space);
      }
      if (typeof space === "number") {
        if (space > 0) {
          space = Math.min(10, Math.floor(space));
          gap = "          ".substr(0, space);
        }
      } else if (typeof space === "string") {
        gap = space.substr(0, 10);
      }
      return serializeProperty("", { "": value });
      function serializeProperty(key, holder) {
        let value2 = holder[key];
        if (value2 != null) {
          if (typeof value2.toJSON5 === "function") {
            value2 = value2.toJSON5(key);
          } else if (typeof value2.toJSON === "function") {
            value2 = value2.toJSON(key);
          }
        }
        if (replacerFunc) {
          value2 = replacerFunc.call(holder, key, value2);
        }
        if (value2 instanceof Number) {
          value2 = Number(value2);
        } else if (value2 instanceof String) {
          value2 = String(value2);
        } else if (value2 instanceof Boolean) {
          value2 = value2.valueOf();
        }
        switch (value2) {
          case null:
            return "null";
          case true:
            return "true";
          case false:
            return "false";
        }
        if (typeof value2 === "string") {
          return quoteString(value2, false);
        }
        if (typeof value2 === "number") {
          return String(value2);
        }
        if (typeof value2 === "object") {
          return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
        }
        return void 0;
      }
      function quoteString(value2) {
        const quotes = {
          "'": 0.1,
          '"': 0.2
        };
        const replacements = {
          "'": "\\'",
          '"': '\\"',
          "\\": "\\\\",
          "\b": "\\b",
          "\f": "\\f",
          "\n": "\\n",
          "\r": "\\r",
          "	": "\\t",
          "\v": "\\v",
          "\0": "\\0",
          "\u2028": "\\u2028",
          "\u2029": "\\u2029"
        };
        let product = "";
        for (let i = 0; i < value2.length; i++) {
          const c = value2[i];
          switch (c) {
            case "'":
            case '"':
              quotes[c]++;
              product += c;
              continue;
            case "\0":
              if (util.isDigit(value2[i + 1])) {
                product += "\\x00";
                continue;
              }
          }
          if (replacements[c]) {
            product += replacements[c];
            continue;
          }
          if (c < " ") {
            let hexString = c.charCodeAt(0).toString(16);
            product += "\\x" + ("00" + hexString).substring(hexString.length);
            continue;
          }
          product += c;
        }
        const quoteChar = quote || Object.keys(quotes).reduce((a, b) => quotes[a] < quotes[b] ? a : b);
        product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
        return quoteChar + product + quoteChar;
      }
      function serializeObject(value2) {
        if (stack.indexOf(value2) >= 0) {
          throw TypeError("Converting circular structure to JSON5");
        }
        stack.push(value2);
        let stepback = indent2;
        indent2 = indent2 + gap;
        let keys = propertyList || Object.keys(value2);
        let partial = [];
        for (const key of keys) {
          const propertyString = serializeProperty(key, value2);
          if (propertyString !== void 0) {
            let member = serializeKey(key) + ":";
            if (gap !== "") {
              member += " ";
            }
            member += propertyString;
            partial.push(member);
          }
        }
        let final;
        if (partial.length === 0) {
          final = "{}";
        } else {
          let properties;
          if (gap === "") {
            properties = partial.join(",");
            final = "{" + properties + "}";
          } else {
            let separator = ",\n" + indent2;
            properties = partial.join(separator);
            final = "{\n" + indent2 + properties + ",\n" + stepback + "}";
          }
        }
        stack.pop();
        indent2 = stepback;
        return final;
      }
      function serializeKey(key) {
        if (key.length === 0) {
          return quoteString(key, true);
        }
        const firstChar = String.fromCodePoint(key.codePointAt(0));
        if (!util.isIdStartChar(firstChar)) {
          return quoteString(key, true);
        }
        for (let i = firstChar.length; i < key.length; i++) {
          if (!util.isIdContinueChar(String.fromCodePoint(key.codePointAt(i)))) {
            return quoteString(key, true);
          }
        }
        return key;
      }
      function serializeArray(value2) {
        if (stack.indexOf(value2) >= 0) {
          throw TypeError("Converting circular structure to JSON5");
        }
        stack.push(value2);
        let stepback = indent2;
        indent2 = indent2 + gap;
        let partial = [];
        for (let i = 0; i < value2.length; i++) {
          const propertyString = serializeProperty(String(i), value2);
          partial.push(propertyString !== void 0 ? propertyString : "null");
        }
        let final;
        if (partial.length === 0) {
          final = "[]";
        } else {
          if (gap === "") {
            let properties = partial.join(",");
            final = "[" + properties + "]";
          } else {
            let separator = ",\n" + indent2;
            let properties = partial.join(separator);
            final = "[\n" + indent2 + properties + ",\n" + stepback + "]";
          }
        }
        stack.pop();
        indent2 = stepback;
        return final;
      }
    };
  }
});

// node_modules/json5/lib/index.js
var require_lib = __commonJS({
  "node_modules/json5/lib/index.js"(exports2, module2) {
    var parse = require_parse();
    var stringify = require_stringify();
    var JSON53 = {
      parse,
      stringify
    };
    module2.exports = JSON53;
  }
});

// src/extension/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(extension_exports);
var vscode7 = __toESM(require("vscode"));
var import_json52 = __toESM(require_lib());

// src/core/jsonToTypesAndZod.ts
function jsonToTypesAndZod(json, rootName = "RootObject", mode = "full", safeMode = false) {
  const registry = /* @__PURE__ */ new Map();
  const rootNode = analyzeValue(json, rootName);
  collectObjectSchemas(rootNode, registry, rootName, true);
  const typeBlocks = [];
  for (const entry of registry.values()) {
    const typeBody = renderObjectType(
      entry.node,
      registry,
      entry.name,
      safeMode
    );
    typeBlocks.push(`type ${entry.name} = ${typeBody};`);
  }
  const schemaBlocks = [];
  for (const entry of registry.values()) {
    const schemaBody = renderObjectSchema(
      entry.node,
      registry,
      entry.name,
      safeMode
    );
    schemaBlocks.push(`const ${entry.name}Schema = ${schemaBody};`);
  }
  const typesOutput = joinBlocks(typeBlocks).join("\n");
  const schemasOutput = joinBlocks(schemaBlocks).join("\n\n");
  if (mode === "types") {
    return typesOutput.trim();
  }
  const finalOutput = `import { z } from "zod";

${typesOutput}

${schemasOutput}`.trim();
  if (!finalOutput || finalOutput.length < 20) {
    return `// \u26A0\uFE0F No types could be generated from input

import { z } from "zod";`;
  }
  return finalOutput;
}
function mapPrimitive(value) {
  const t = typeof value;
  if (t === "string") return "string";
  if (t === "number") return "number";
  if (t === "boolean") return "boolean";
  return "unknown";
}
function analyzeValue(value, name) {
  if (value === null) {
    return {
      kind: "primitive",
      type: "null"
    };
  }
  if (typeof value !== "object") {
    return { kind: "primitive", type: mapPrimitive(value) };
  }
  if (Array.isArray(value)) {
    return analyzeArray(value, name);
  }
  return analyzeObject(value, name);
}
function analyzeArray(arr, keyHint = "Item") {
  if (arr.length === 0) {
    return {
      kind: "array",
      item: { kind: "primitive", type: "unknown" }
    };
  }
  const nonNullItems = arr.filter((item) => item !== null);
  if (nonNullItems.length > 0 && nonNullItems.every(isPlainObject)) {
    const mergedObject = mergeObjectArray(
      nonNullItems,
      singularize(keyHint)
    );
    return {
      kind: "array",
      item: mergedObject
    };
  }
  const itemNodes = arr.map((item) => analyzeValue(item, singularize(keyHint)));
  const mergedItemNode = mergeNodes(itemNodes, singularize(keyHint));
  return {
    kind: "array",
    item: mergedItemNode
  };
}
function analyzeObject(obj, _keyHint = "Object") {
  const fields = {};
  for (const [key, value] of Object.entries(obj)) {
    const childKey = pascalCase(key);
    if (value === null) {
      fields[key] = {
        node: { kind: "primitive", type: "null" },
        optional: false,
        nullable: false
      };
      continue;
    }
    const analyzed = analyzeValue(value, childKey);
    fields[key] = {
      node: analyzed,
      optional: false,
      nullable: false
    };
  }
  return {
    kind: "object",
    fields
  };
}
function mergeObjectArray(objects, _keyHint = "Item") {
  const allKeys = /* @__PURE__ */ new Set();
  for (const obj of objects) {
    Object.keys(obj).forEach((key) => allKeys.add(key));
  }
  const fields = {};
  for (const key of allKeys) {
    const presentValues = objects.filter((obj) => Object.prototype.hasOwnProperty.call(obj, key)).map((obj) => obj[key]);
    const optional = presentValues.length < objects.length;
    const nullable = presentValues.some((value) => value === null);
    const nonNullValues = presentValues.filter((value) => value !== null);
    const childKeyHint = pascalCase(singularize(key));
    let node;
    if (nonNullValues.length === 0) {
      node = { kind: "primitive", type: "unknown" };
    } else {
      const analyzedNodes = nonNullValues.map(
        (value) => analyzeValue(value, childKeyHint)
      );
      node = mergeNodes(analyzedNodes, childKeyHint);
    }
    if (nullable) {
      node = mergeNodes(
        [node, { kind: "primitive", type: "null" }],
        childKeyHint
      );
    }
    fields[key] = {
      node,
      optional,
      nullable: false
    };
  }
  return {
    kind: "object",
    fields
  };
}
function mergeNodes(nodes, keyHint = "Item") {
  if (nodes.length === 0) {
    return { kind: "primitive", type: "unknown" };
  }
  const normalizedNodes = nodes.map(normalizeNode);
  const uniqueNodes = dedupeNodes(normalizedNodes);
  if (uniqueNodes.length === 1) {
    return uniqueNodes[0];
  }
  const allObjects = uniqueNodes.every((node) => node.kind === "object");
  if (allObjects) {
    return mergeObjectNodes(
      uniqueNodes,
      keyHint
    );
  }
  const allArrays = uniqueNodes.every((node) => node.kind === "array");
  if (allArrays) {
    const mergedItems = mergeNodes(
      uniqueNodes.map(
        (node) => node.item
      ),
      singularize(keyHint)
    );
    return {
      kind: "array",
      item: mergedItems
    };
  }
  return {
    kind: "union",
    options: uniqueNodes
  };
}
function mergeObjectNodes(nodes, _keyHint = "Item") {
  const allKeys = /* @__PURE__ */ new Set();
  for (const node of nodes) {
    Object.keys(node.fields).forEach((key) => allKeys.add(key));
  }
  const mergedFields = {};
  for (const key of allKeys) {
    const existingFields = nodes.map((node) => node.fields[key]).filter(Boolean);
    const optional = existingFields.length < nodes.length || existingFields.some((field) => field.optional);
    const hasExplicitNullable = existingFields.some((field) => field.nullable);
    const hasNullNode = existingFields.some(
      (field) => field.node.kind === "primitive" && field.node.type === "null"
    );
    const nonNullNodes = existingFields.map((field) => field.node).filter((node) => !(node.kind === "primitive" && node.type === "null"));
    let mergedNode;
    let nullable = hasExplicitNullable || hasNullNode;
    if (nonNullNodes.length === 0) {
      mergedNode = { kind: "primitive", type: "null" };
      nullable = false;
    } else {
      mergedNode = mergeNodes(nonNullNodes, pascalCase(singularize(key)));
    }
    mergedFields[key] = {
      node: mergedNode,
      optional,
      nullable
    };
  }
  return {
    kind: "object",
    fields: mergedFields
  };
}
function normalizeNode(node) {
  if (node.kind !== "union") {
    return node;
  }
  const flatOptions = node.options.flatMap(
    (option) => option.kind === "union" ? option.options : [option]
  );
  const map = /* @__PURE__ */ new Map();
  for (const option of flatOptions) {
    const sig = getNodeSignature(option);
    if (!map.has(sig)) {
      map.set(sig, option);
    }
  }
  const unique = Array.from(map.values());
  if (unique.length === 1) {
    return unique[0];
  }
  return {
    kind: "union",
    options: unique
  };
}
function dedupeNodes(nodes) {
  const map = /* @__PURE__ */ new Map();
  for (const node of nodes) {
    map.set(getNodeSignature(node), node);
  }
  return Array.from(map.values());
}
function collectObjectSchemas(node, registry, suggestedName, isRoot = false) {
  if (node.kind === "object") {
    for (const [fieldKey, field] of Object.entries(node.fields)) {
      collectObjectSchemas(
        field.node,
        registry,
        pascalCase(singularize(fieldKey))
      );
    }
    const signature = getObjectSignature(node);
    const existing = registry.get(signature);
    if (existing) {
      return;
    }
    const baseName = pascalCase(
      isRoot ? suggestedName : singularize(suggestedName)
    );
    const finalName = ensureUniqueName(baseName, registry);
    registry.set(signature, {
      name: finalName,
      node,
      signature
    });
    node.__name = finalName;
    return;
  }
  if (node.kind === "array") {
    if (node.item.kind === "union") {
      for (const option of node.item.options) {
        collectObjectSchemas(
          option,
          registry,
          pascalCase(singularize(suggestedName))
        );
      }
      return;
    }
    collectObjectSchemas(
      node.item,
      registry,
      pascalCase(singularize(suggestedName))
    );
    return;
  }
  if (node.kind === "union") {
    for (const option of node.options) {
      collectObjectSchemas(option, registry, suggestedName);
    }
  }
}
function renderObjectType(node, registry, currentName, safeMode) {
  const lines = Object.entries(node.fields).map(([key, field]) => {
    const optionalMark = field.optional ? "?" : "";
    let typeValue = renderTypeNode(field.node, registry, currentName, safeMode);
    if (field.nullable) {
      typeValue = `${typeValue} | null`;
    }
    if (safeMode && key === "bottom_widget") {
      return `${key}?: unknown | null; // \u26A0 overlay dynamic`;
    }
    return `${key}${optionalMark}: ${typeValue};`;
  });
  return `{
${indent(lines.join("\n"))}
}`;
}
function renderTypeNode(node, registry, currentName, safeMode) {
  switch (node.kind) {
    case "primitive":
      return node.type;
    case "array": {
      const itemType = renderTypeNode(
        node.item,
        registry,
        currentName,
        safeMode
      );
      if (needsParensForArrayItem(node.item)) {
        return `(${itemType})[]`;
      }
      return `${itemType}[]`;
    }
    case "object": {
      return node.__name || "unknown";
    }
    case "union": {
      const types = node.options.map(
        (opt) => renderTypeNode(opt, registry, currentName, safeMode)
      );
      if (safeMode) {
        const unique = Array.from(new Set(types));
        const cleaned = unique.map((t) => t.trim());
        if (cleaned.includes("string") && cleaned.includes("number")) {
          return "string /* \u26A0 normalized from (string | number) */";
        }
        return unique.join(" | ");
      }
      return types.join(" | ");
    }
    default:
      return "unknown";
  }
}
function renderObjectSchema(node, registry, currentName, safeMode) {
  const entries = Object.entries(node.fields);
  if (entries.length === 0) {
    return "z.object({}).strict()";
  }
  const lines = entries.map(([key, field]) => {
    let value = renderSchemaNode(field.node, registry, currentName, safeMode);
    if (field.nullable) {
      value += ".nullable()";
    }
    if (field.optional) {
      value += ".optional()";
    }
    return `${key}: ${value}`;
  });
  return `z.object({
${indent(lines.join(",\n"))}
}).strict()`;
}
function renderSchemaNode(node, registry, currentName, safeMode) {
  switch (node.kind) {
    case "primitive":
      if (node.type === "null") {
        return "z.null()";
      }
      return `z.${node.type}()`;
    case "array":
      return `z.array(${renderSchemaNode(
        node.item,
        registry,
        currentName,
        safeMode
      )})`;
    case "object": {
      const name = node.__name;
      return name ? `${name}Schema` : "z.unknown()";
    }
    case "union": {
      const options = node.options.filter((opt) => !(opt.kind === "primitive" && opt.type === "null")).map((opt) => renderSchemaNode(opt, registry, currentName, safeMode));
      if (safeMode) {
        return `${options[0]} // \u26A0 normalized`;
      }
      return `z.union([${options.join(", ")}])`;
    }
    default:
      return "z.unknown()";
  }
}
function needsParensForArrayItem(node) {
  return node.kind === "union";
}
function getNodeSignature(node) {
  switch (node.kind) {
    case "primitive":
      return node.type;
    case "array":
      return `array:${getNodeSignature(node.item)}`;
    case "union":
      return `union:${node.options.map(getNodeSignature).sort().join("|")}`;
    case "object":
      return getObjectSignature(node);
    default:
      return "unknown";
  }
}
function getObjectSignature(node) {
  const entries = Object.entries(node.fields).map(([key, field]) => {
    return `${key}:${getNodeSignature(field.node)}:${field.optional ? "opt" : "req"}:${field.nullable ? "null" : "non-null"}`;
  });
  return `object:{${entries.sort().join(",")}}`;
}
function ensureUniqueName(baseName, registry) {
  const usedNames = new Set(
    Array.from(registry.values()).map((entry) => entry.name)
  );
  if (!usedNames.has(baseName)) {
    return baseName;
  }
  let counter = 1;
  while (usedNames.has(`${baseName}${counter}`)) {
    counter += 1;
  }
  return `${baseName}${counter}`;
}
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function pascalCase(value) {
  return value.replace(/[_\-\s]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").trim().split(/\s+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
}
function singularize(value) {
  if (value.endsWith("ies")) {
    return `${value.slice(0, -3)}y`;
  }
  if (value.endsWith("ses")) {
    return value.slice(0, -2);
  }
  if (value.endsWith("s") && !value.endsWith("ss")) {
    return value.slice(0, -1);
  }
  return value;
}
function indent(value, spaces = 2) {
  const prefix = " ".repeat(spaces);
  return value.split("\n").map((line) => `${prefix}${line}`).join("\n");
}
function joinBlocks(blocks) {
  return blocks.flatMap(
    (block, index) => index === 0 ? [block] : ["", block]
  );
}

// src/core/providers/codeActionProvider.ts
var vscode = __toESM(require("vscode"));
var JsonToZodCodeActionProvider = class {
  provideCodeActions(document, range) {
    const selectedText = document.getText(range);
    if (!selectedText || selectedText.trim().length === 0) {
      return;
    }
    try {
      JSON.parse(selectedText);
    } catch {
      return;
    }
    const generateAction = new vscode.CodeAction(
      "Generate TypeScript + Zod",
      vscode.CodeActionKind.QuickFix
    );
    generateAction.command = {
      command: "jsonLensit.generate",
      title: "Generate TypeScript + Zod"
    };
    const fixAction = new vscode.CodeAction(
      "\u2728 Apply safe JSON fix",
      vscode.CodeActionKind.QuickFix
    );
    fixAction.command = {
      command: "jsonLensit.applyFix",
      title: "Apply safe JSON fix"
    };
    const fixAndGenerateAction = new vscode.CodeAction(
      "\u26A1 Fix + Generate Types",
      vscode.CodeActionKind.QuickFix
    );
    fixAndGenerateAction.command = {
      command: "jsonLensit.fixAndGenerate",
      title: "Fix + Generate Types"
    };
    return [generateAction, fixAction, fixAndGenerateAction];
  }
};

// src/core/utils/extractJson.ts
function extractJsonFromCode(text) {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : null;
}

// src/core/providers/hoverProvider.ts
var vscode2 = __toESM(require("vscode"));
var import_json5 = __toESM(require_lib());

// src/core/utils/jsonDetector.ts
function looksLikeJson(text) {
  if (!text) return false;
  const trimmed = text.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
    return false;
  }
  if (!trimmed.includes(":")) {
    return false;
  }
  return true;
}

// src/core/utils/jsonExplain.ts
function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function getType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}
function analyzeArray2(arr) {
  if (arr.length === 0) return "empty array";
  const first = arr[0];
  if (isObject(first)) {
    return "array of objects";
  }
  return `array of ${getType(first)}s`;
}
function describeObject(obj, indent2 = 0) {
  const pad = "  ".repeat(indent2);
  return Object.entries(obj).flatMap(([key, value]) => {
    if (Array.isArray(value)) {
      const description = `${pad}- ${key}: ${analyzeArray2(value)}`;
      if (value.length > 0 && isObject(value[0])) {
        return [
          description,
          ...describeObject(value[0], indent2 + 1)
        ];
      }
      return [description];
    }
    if (isObject(value)) {
      return [`${pad}- ${key}: object`, ...describeObject(value, indent2 + 1)];
    }
    return [`${pad}- ${key}: ${getType(value)}`];
  });
}
function explainJson(data) {
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return "- Root: empty array";
    }
    if (isObject(data[0])) {
      return [
        "- Root: array of objects",
        ...describeObject(data[0], 1)
      ].join("\n");
    }
    return `- Root: array of ${getType(data[0])}s`;
  }
  if (isObject(data)) {
    return describeObject(data).join("\n");
  }
  return `- Root: ${getType(data)}`;
}

// src/core/utils/jsonShapeProblems.ts
function isObject2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function getType2(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}
function isNumericString(value) {
  return typeof value === "string" && /^[0-9]+$/.test(value);
}
function detectShapeProblems(data) {
  const problems = [];
  function walk2(value, path) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        problems.push({
          path,
          message: "empty array, item type unknown",
          severity: "warning"
        });
        return;
      }
      const types = new Set(value.map(getType2));
      if (types.size > 1) {
        problems.push({
          path,
          message: `mixed types (${Array.from(types).join(" | ")})`,
          severity: value.some(isObject2) ? "critical" : "warning"
        });
      }
      if (value.every(isObject2)) {
        const shapes = new Set(
          value.map((obj) => Object.keys(obj).sort().join("|"))
        );
        if (shapes.size > 1) {
          problems.push({
            path,
            message: "inconsistent object shape",
            severity: "critical"
          });
        }
        const keysMap = /* @__PURE__ */ new Map();
        value.forEach((item) => {
          Object.keys(item).forEach((key) => {
            keysMap.set(key, (keysMap.get(key) || 0) + 1);
          });
        });
        const total = value.length;
        keysMap.forEach((count, key) => {
          if (count !== total) {
            problems.push({
              path,
              message: `${key} appears in ${count}/${total} items`,
              severity: "warning"
            });
          }
        });
        value.forEach((item, i) => walk2(item, `${path}[${i}]`));
      }
      return;
    }
    if (isObject2(value)) {
      Object.entries(value).forEach(([key, val]) => {
        const currentPath = path ? `${path}.${key}` : key;
        if (val === null) {
          problems.push({
            path: currentPath,
            message: "null value detected",
            severity: "warning"
          });
        }
        if (isNumericString(val)) {
          problems.push({
            path: currentPath,
            message: "numeric string detected",
            severity: "warning"
          });
        }
        walk2(val, currentPath);
      });
      return;
    }
  }
  walk2(data, "root");
  return problems.map((p) => {
    const icon = p.severity === "critical" ? "\u274C" : "\u26A0";
    return `${icon} ${p.path}: ${p.message}`;
  });
}

// src/core/fixes/buildFixPreview.ts
function isObject3(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function mergeObjectKeys(arr) {
  const allKeys = /* @__PURE__ */ new Set();
  arr.forEach((obj) => {
    Object.keys(obj).forEach((key) => allKeys.add(key));
  });
  return Array.from(allKeys);
}
function fixArray(arr) {
  const allObjects = arr.every(isObject3);
  if (!allObjects) {
    return { fixed: arr, hasChanges: false };
  }
  const objects = arr;
  const normalized = objects.map((obj) => {
    const fix = buildFixPreview(obj);
    return fix.fixed;
  });
  const keys = mergeObjectKeys(normalized);
  let changed = false;
  const fixed = normalized.map((obj, index) => {
    const newObj = {};
    keys.forEach((key) => {
      const value = obj[key];
      if (value === void 0) {
        newObj[key] = null;
        changed = true;
      } else if (Array.isArray(value)) {
        const fix = fixArray(value);
        newObj[key] = fix.fixed;
        if (fix.hasChanges) changed = true;
      } else if (isObject3(value)) {
        const valuesAtKey = normalized.map((item) => item[key]);
        const allObjects2 = valuesAtKey.every(isObject3);
        if (allObjects2) {
          const nestedFix = fixArray(valuesAtKey);
          const fixedArray = nestedFix.fixed;
          newObj[key] = fixedArray[index];
          if (nestedFix.hasChanges) changed = true;
        } else {
          const fix = buildFixPreview(value);
          newObj[key] = fix.fixed;
          if (fix.hasChanges) changed = true;
        }
      } else {
        newObj[key] = value;
      }
    });
    return newObj;
  });
  return {
    fixed,
    hasChanges: changed
  };
}
function buildFixPreview(input) {
  if (Array.isArray(input)) {
    return fixArray(input);
  }
  if (isObject3(input)) {
    let changed = false;
    const result = {};
    Object.entries(input).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const fix = fixArray(value);
        result[key] = fix.fixed;
        if (fix.hasChanges) changed = true;
      } else if (isObject3(value)) {
        const fix = buildFixPreview(value);
        result[key] = fix.fixed;
        if (fix.hasChanges) changed = true;
      } else {
        result[key] = value;
      }
    });
    return {
      fixed: result,
      hasChanges: changed
    };
  }
  return {
    fixed: input,
    hasChanges: false
  };
}

// src/core/insights/buildHealthSummary.ts
function buildHealthSummary(problems = []) {
  const critical = problems.filter((p) => p.includes("\u274C")).length;
  const warnings = problems.filter((p) => p.includes("\u26A0")).length;
  if (critical > 0) {
    return {
      status: "\u274C Unstable",
      summary: "This response may break your frontend"
    };
  }
  if (warnings > 0) {
    return {
      status: "\u26A0 Needs attention",
      summary: "This response has potential issues"
    };
  }
  return {
    status: "\u2705 Healthy",
    summary: "Safe to use in frontend"
  };
}

// src/core/providers/hoverProvider.ts
var lastText = "";
var lastResult = null;
var JsonHoverProvider = class {
  provideHover(document) {
    const text = document.getText();
    if (text === lastText && lastResult) {
      return lastResult;
    }
    lastText = text;
    let extracted = null;
    if (document.languageId === "json") {
      extracted = text;
    } else {
      extracted = extractJsonFromCode(text);
    }
    if (!extracted || !looksLikeJson(extracted)) {
      return null;
    }
    try {
      const parsed = import_json5.default.parse(extracted);
      const { hasChanges } = buildFixPreview(parsed);
      const typesOutput = jsonToTypesAndZod(parsed);
      const explanation = explainJson(parsed);
      const problems = detectShapeProblems(parsed);
      const health = buildHealthSummary(problems || []);
      const preview = typesOutput ? typesOutput.split("const")[0].trim() : null;
      const md = new vscode2.MarkdownString(void 0, true);
      md.isTrusted = true;
      md.supportHtml = true;
      md.appendMarkdown(`### \u{1F9EC} API Insight

`);
      md.appendMarkdown(`**Health:** ${health?.status}

`);
      md.appendMarkdown(`_${health?.summary}_

`);
      md.appendMarkdown(`---

`);
      md.appendMarkdown(`---

`);
      const hasNulls = JSON.stringify(parsed).includes(": null");
      if (!problems.some((p) => p.includes("inconsistent")) && hasNulls) {
        md.appendMarkdown(`\u26A0 Structure normalized (null values present)

`);
      }
      const criticalCount = (problems || []).filter(
        (p) => p.includes("\u274C")
      ).length;
      const warningCount = (problems || []).filter(
        (p) => p.includes("\u26A0")
      ).length;
      if (problems.length > 0) {
        md.appendMarkdown(`---

`);
        md.appendMarkdown(`### \u{1F4A5} **Impact**

`);
        if (problems.some((p) => p.includes("inconsistent"))) {
          md.appendMarkdown(`- \u274C UI may break due to missing fields
`);
        }
        if (problems.some((p) => p.includes("numeric string"))) {
          md.appendMarkdown(`- \u274C TypeScript types may become unsafe
`);
        }
        if (problems.some((p) => p.includes("null"))) {
          md.appendMarkdown(`- \u26A0 Null checks required in components
`);
        }
        if (problems.some((p) => p.includes("mixed types"))) {
          md.appendMarkdown(
            `- \u26A0 Union types will be generated (harder to use)
`
          );
        }
        md.appendMarkdown(`
`);
      } else {
        md.appendMarkdown(`**\u2705 STRUCTURE IS STABLE**

`);
      }
      md.appendMarkdown(`**\u26A0 Detected Problems**

`);
      if (problems.length > 0) {
        md.appendMarkdown(`---

`);
        md.appendMarkdown(`**\u26A0 Issues**

`);
        problems.slice(0, 4).forEach((p) => {
          const clean = p.replace(/❗|⚠/g, "").trim();
          md.appendMarkdown(`> \u2757 **${clean}**

`);
        });
        md.appendMarkdown(`
`);
      }
      if (explanation) {
        md.appendMarkdown(`---

`);
        md.appendMarkdown(`**\u{1F4A1} Why this happens**

`);
        const shortExplanation = explanation.split("\n").slice(0, 2).join("\n");
        md.appendMarkdown(`${shortExplanation}

`);
      }
      if (problems.length > 0) {
        md.appendMarkdown(`---

`);
        md.appendMarkdown(`**\u{1F6A8} What may break**

`);
        md.appendMarkdown(
          `- \u274C <b>UI can break</b> if it expects missing fields
`
        );
        md.appendMarkdown(`- \u274C <b>TypeScript becomes unreliable</b>

`);
      }
      if (preview) {
        md.appendMarkdown(`---

`);
        md.appendMarkdown(`**\u{1F4E6} Types Preview**

`);
        md.appendCodeblock(preview, "ts");
        md.appendMarkdown(`<sub>Generated from current JSON shape</sub>

`);
      }
      md.appendMarkdown(`---

`);
      md.appendMarkdown(`### \u26A1 Actions

`);
      if (hasChanges) {
        md.appendMarkdown(
          `\u26A1 **[Fix JSON Structure](command:jsonLens.applyFix)**

`
        );
      } else {
        md.appendMarkdown(`\u2705 JSON already clean

`);
      }
      md.appendMarkdown(
        `\u{1F4E6} **[Generate full Types + Zod](command:jsonLens.generate)**

`
      );
      const hover = new vscode2.Hover(md);
      lastText = text;
      lastResult = hover;
      console.log("HOVER OK");
      return hover;
    } catch (err) {
      console.error("HOVER ERROR:", err);
      return null;
    }
  }
};

// src/core/providers/codeLensProvider.ts
var vscode3 = __toESM(require("vscode"));
var JsonCodeLensProvider = class {
  provideCodeLenses(document) {
    const text = document.getText();
    const extracted = extractJsonFromCode(text);
    if (!extracted || !looksLikeJson(extracted)) {
      return [];
    }
    const startIndex = text.indexOf(extracted);
    if (startIndex === -1) {
      return [];
    }
    const position = document.positionAt(startIndex);
    const range = new vscode3.Range(position, position);
    return [
      new vscode3.CodeLens(range, {
        title: "$(zap) Generate Types",
        command: "jsonLensit.generate"
      })
    ];
  }
};

// src/decorations/inlineInsights.ts
var vscode4 = __toESM(require("vscode"));
var insightDecoration = vscode4.window.createTextEditorDecorationType({
  after: {
    margin: "0 0 0 1rem",
    color: "#888",
    fontStyle: "italic"
  }
});
function getInlineInsight(parsed) {
  if (!Array.isArray(parsed)) return null;
  if (parsed.length === 0) return null;
  const shapes = /* @__PURE__ */ new Map();
  const fieldCounts = {};
  const fieldTypes = {};
  parsed.forEach((item) => {
    if (typeof item !== "object" || item === null) return;
    const keys = Object.keys(item).sort();
    const shapeKey = keys.join("|");
    shapes.set(shapeKey, (shapes.get(shapeKey) || 0) + 1);
    keys.forEach((k) => {
      const value = item[k];
      fieldCounts[k] = (fieldCounts[k] || 0) + 1;
      if (!fieldTypes[k]) {
        fieldTypes[k] = /* @__PURE__ */ new Set();
      }
      const type = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
      fieldTypes[k].add(type);
    });
  });
  const total = parsed.length;
  const shapeCount = shapes.size;
  const optionalFields = Object.entries(fieldCounts).filter(([_, count]) => count < total).map(([key, count]) => ({
    key,
    missingPercent: Math.round((total - count) / total * 100)
  })).sort((a, b) => b.missingPercent - a.missingPercent);
  const typeConflicts = Object.entries(fieldTypes).filter(([_, types]) => types.size > 1).map(([key, types]) => ({
    key,
    types: Array.from(types).join(" | ")
  }));
  let parts = [];
  if (typeConflicts.length > 0) {
    const top = typeConflicts[0];
    parts.push(`${top.key} type conflict (${top.types})`);
  } else if (shapeCount > 1) {
    parts.push(`${shapeCount} shapes`);
  }
  if (optionalFields.length > 0 && parts.length < 2) {
    const top = optionalFields[0];
    parts.push(`${top.key} missing in ${top.missingPercent}%`);
  }
  if (parts.length === 0) return null;
  return `\u{1F9E0} ${parts.join(" \u2022 ")}`;
}
function updateInlineInsights(editor) {
  const text = editor.document.getText();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    editor.setDecorations(insightDecoration, []);
    return;
  }
  const insight = getInlineInsight(parsed);
  if (!insight) {
    editor.setDecorations(insightDecoration, []);
    return;
  }
  const firstLine = new vscode4.Range(
    new vscode4.Position(0, 0),
    new vscode4.Position(0, 0)
  );
  editor.setDecorations(insightDecoration, [
    {
      range: firstLine,
      renderOptions: {
        after: {
          contentText: insight
        }
      }
    }
  ]);
}

// src/core/fixes/generateSmartFixes.ts
function generateSmartFixes(advanced) {
  const fixes = [];
  advanced.numeric.forEach((issue) => {
    fixes.push({
      message: `${issue.path} \u2192 convert to number`,
      confidence: "high"
    });
  });
  advanced.shape.forEach((issue) => {
    if (issue.type === "critical") {
      fixes.push({
        message: `${issue.path} \u2192 unify object structure`,
        confidence: "medium"
      });
    }
  });
  advanced.deep.forEach((issue) => {
    fixes.push({
      message: `${issue.path} \u2192 add null guards`,
      confidence: "low"
    });
  });
  return fixes;
}
function getHighConfidenceFixes(fixes) {
  return fixes.filter((f) => f.confidence === "high");
}

// src/core/insights/formatInsightMarkdown.ts
function getSeverityIcon(severity) {
  switch (severity) {
    case "critical":
      return "\u274C";
    case "warning":
      return "\u26A0";
    case "info":
    default:
      return "\u2139\uFE0F";
  }
}
function extractFieldInsights(problems) {
  return problems.filter((p) => p.includes("appears in")).map((p) => {
    const match = p.match(/root\.(.*?)\: (.*?) appears in (\d+)\/(\d+)/);
    if (!match) return null;
    const [, path, field, count, total] = match;
    const missing = Number(total) - Number(count);
    const percentage = Math.round(missing / Number(total) * 100);
    const cleanPath = path.replace(/^root\./, "");
    return `${cleanPath}[].${field} \u2192 optional (missing ${percentage}%)`;
  }).filter(Boolean);
}
function formatInsightMarkdown(insights, problems, advanced = { numeric: [], shape: [], deep: [] }) {
  if (!insights.length) return null;
  const primary = insights.find((i) => i.severity === "critical") || insights[0];
  const secondary = insights.find(
    (i) => i !== primary && i.severity !== "info"
  );
  const advancedFieldInsights = [
    ...advanced.numeric.map((p) => p.message),
    ...advanced.shape.map((p) => p.message),
    ...advanced.deep.map((p) => p.message)
  ];
  const baseFieldInsights = [
    ...extractFieldInsights(problems),
    ...insights.filter((i) => i.id.startsWith("mixed-field-type")).map((i) => {
      const base = i.summary;
      const relatedNumeric = insights.find(
        (x) => x.title === "Numeric string detected" && x.meta?.field === i.meta?.field
      );
      if (relatedNumeric) {
        return base + "\n    \u21B3 numeric string detected";
      }
      return base;
    })
  ];
  const fieldInsights = [...advancedFieldInsights, ...baseFieldInsights];
  const allFixes = generateSmartFixes(advanced);
  const safeFixes = getHighConfidenceFixes(allFixes);
  let output = `### \u{1F9E0} API Insight

`;
  output += `## ${getSeverityIcon(primary.severity)} ${primary.title}

`;
  if (fieldInsights.length) {
    output += `### \u26A0 Key issues
`;
    output += fieldInsights.slice(0, 3).map((f) => `- ${f}`).join("\n");
    output += `

`;
  }
  if (primary.risks.length) {
    output += `### \u26A0 What will break
`;
    output += primary.risks.slice(0, 3).map((r) => `- ${r}`).join("\n");
    output += `

`;
  }
  if (safeFixes.length > 0) {
    output += `### \u{1F4A1} Suggested fix
`;
    output += safeFixes.slice(0, 2).map((f) => `- ${f.message}`).join("\n");
    output += `

`;
  } else if (primary.actions.length) {
    output += `### \u{1F4A1} Safest fix
`;
    output += primary.actions.slice(0, 2).map((a) => `- ${a}`).join("\n");
    output += `

`;
  }
  if (secondary) {
    output += `\u2014 \u2014 \u2014

`;
    output += `**${getSeverityIcon(secondary.severity)} ${secondary.title}**

`;
    output += secondary.summary + `

`;
  }
  return output;
}

// src/core/insights/runInsightEngine.ts
function isPlainObject2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function formatPath(path) {
  return path || "root";
}
function getObjectKeys(obj) {
  return Object.keys(obj).sort();
}
function isNumericString2(value) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /^-?\d+(\.\d+)?$/.test(trimmed);
}
function isDateLikeString(value) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  const isoLike = /^\d{4}-\d{2}-\d{2}$/.test(trimmed) || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(trimmed);
  if (!isoLike) return false;
  const time = Date.parse(trimmed);
  return !Number.isNaN(time);
}
function collectArrayObjectShapeInsights(value, path = "", insights = []) {
  if (Array.isArray(value)) {
    const currentPath = formatPath(path);
    if (value.length === 0) {
      insights.push({
        id: `empty-array:${currentPath}`,
        title: "Empty array with unknown future shape",
        severity: "warning",
        confidence: "high",
        summary: `${currentPath} is an empty array, so its future item shape is unknown.`,
        risks: [
          "Type inference may become too loose",
          "Future API responses may introduce unstable structure"
        ],
        actions: [
          "Treat this array cautiously in generated types",
          "Validate future payloads before assuming item shape"
        ]
      });
    }
    const objectItems = value.filter(isPlainObject2);
    if (objectItems.length >= 2) {
      const keySets = objectItems.map((item) => getObjectKeys(item).join("|"));
      const uniqueKeySets = new Set(keySets);
      if (uniqueKeySets.size > 1) {
        const unionKeys = /* @__PURE__ */ new Set();
        const keyFrequency = /* @__PURE__ */ new Map();
        objectItems.forEach((item) => {
          const keys = getObjectKeys(item);
          keys.forEach((key) => {
            unionKeys.add(key);
            keyFrequency.set(key, (keyFrequency.get(key) ?? 0) + 1);
          });
        });
        const total = objectItems.length;
        const unstableFields = Array.from(unionKeys).map((key) => ({
          key,
          count: keyFrequency.get(key) ?? 0
        })).filter((entry) => entry.count !== total).sort((a, b) => a.count - b.count).slice(0, 3).map(
          (entry) => `"${entry.key}" appears in ${entry.count}/${total} items`
        );
        insights.push({
          id: `inconsistent-array-shape:${currentPath}`,
          title: "Inconsistent object shape inside array",
          severity: "critical",
          confidence: "high",
          summary: `${currentPath} contains object items with different field sets.`,
          risks: [
            "Unsafe assumptions in UI rendering",
            "TypeScript may require unions or optional fields",
            "Runtime undefined access when fields are missing"
          ],
          actions: [
            "Use optional fields for frontend-safe types",
            "Normalize backend response to a stable object shape",
            ...unstableFields
          ]
        });
      }
    }
    value.forEach((item, index) => {
      collectArrayObjectShapeInsights(item, `${path}[${index}]`, insights);
    });
    return insights;
  }
  if (isPlainObject2(value)) {
    Object.entries(value).forEach(([key, child]) => {
      const nextPath = path ? `${path}.${key}` : key;
      collectArrayObjectShapeInsights(child, nextPath, insights);
    });
  }
  return insights;
}
function collectMixedPrimitiveTypeInsights(value, path = "", insights = []) {
  if (Array.isArray(value)) {
    const currentPath = formatPath(path);
    const primitiveTypes = /* @__PURE__ */ new Set();
    value.forEach((item) => {
      if (item === null) {
        primitiveTypes.add("null");
        return;
      }
      if (!Array.isArray(item) && !isPlainObject2(item)) {
        primitiveTypes.add(typeof item);
      }
    });
    if (primitiveTypes.size > 1) {
      insights.push({
        id: `mixed-primitive-types:${currentPath}`,
        title: "Mixed primitive types in array",
        severity: "critical",
        confidence: "high",
        summary: `${currentPath} mixes primitive item types: ${Array.from(
          primitiveTypes
        ).join(", ")}.`,
        risks: [
          "Unstable runtime assumptions",
          "Generated types may become noisy unions",
          "Comparison and formatting logic may break"
        ],
        actions: [
          "Normalize the backend response to one primitive type",
          "Add explicit coercion before rendering"
        ]
      });
    }
    value.forEach((item, index) => {
      collectMixedPrimitiveTypeInsights(item, `${path}[${index}]`, insights);
    });
    return insights;
  }
  if (isPlainObject2(value)) {
    Object.entries(value).forEach(([key, child]) => {
      const nextPath = path ? `${path}.${key}` : key;
      collectMixedPrimitiveTypeInsights(child, nextPath, insights);
    });
  }
  return insights;
}
function collectNullableInsights(value, path = "", insights = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectNullableInsights(item, `${path}[${index}]`, insights);
    });
    return insights;
  }
  if (isPlainObject2(value)) {
    Object.entries(value).forEach(([key, child]) => {
      const currentPath = path ? `${path}.${key}` : key;
      if (child === null) {
        insights.push({
          id: `nullable-field:${currentPath}`,
          title: "Nullable field detected",
          severity: "warning",
          confidence: "high",
          summary: `${formatPath(currentPath)} is null in this payload.`,
          risks: [
            "UI may assume a concrete value exists",
            "Strict types may not reflect nullable behavior"
          ],
          actions: [
            "Represent this field as nullable in the schema",
            "Add null fallback handling in the UI"
          ]
        });
      } else {
        collectNullableInsights(child, currentPath, insights);
      }
    });
  }
  return insights;
}
function collectStringPatternInsights(value, path = "", insights = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectStringPatternInsights(item, `${path}[${index}]`, insights);
    });
    return insights;
  }
  if (isPlainObject2(value)) {
    Object.entries(value).forEach(([key, child]) => {
      const currentPath = path ? `${path}.${key}` : key;
      if (typeof child === "string") {
        if (isNumericString2(child)) {
          const cleanPath = (currentPath || "root").replace(/\[\d+\]/g, "[]").replace(/^root\./, "");
          const fullPath = cleanPath.endsWith(`.${key}`) ? cleanPath : `${cleanPath}.${key}`;
          insights.push({
            id: `numeric-string:${currentPath}`,
            title: "Numeric string detected",
            severity: "warning",
            confidence: "medium",
            summary: `${fullPath} looks numeric but is currently a string.`,
            risks: [
              "Sorting and comparisons may behave incorrectly",
              "Math operations may require manual coercion"
            ],
            actions: [
              "Decide whether this field should remain a string or become a number",
              "Normalize or coerce before using it in calculations"
            ],
            meta: {
              field: key,
              path: cleanPath
            }
          });
        }
        if (isDateLikeString(child)) {
          insights.push({
            id: `date-like-string:${currentPath}`,
            title: "Date-like string detected",
            severity: "info",
            confidence: "high",
            summary: `${formatPath(currentPath)} looks like a date/time string.`,
            risks: [
              "Consumers may treat it as a generic string instead of time data"
            ],
            actions: [
              "Document this field as date-like in your schema or typings",
              "Normalize date parsing in one place before rendering"
            ]
          });
        }
      } else {
        collectStringPatternInsights(child, currentPath, insights);
      }
    });
  }
  return insights;
}
function collectEnumCandidateInsights(value, path = "", insights = []) {
  if (Array.isArray(value)) {
    const currentPath = formatPath(path);
    const stringItems = value.filter(
      (item) => typeof item === "string"
    );
    const unique = Array.from(new Set(stringItems));
    if (value.length >= 3 && stringItems.length === value.length && unique.length >= 2 && unique.length <= 6) {
      insights.push({
        id: `enum-candidate:${currentPath}`,
        title: "Enum-like string array detected",
        severity: "info",
        confidence: "medium",
        summary: `${currentPath} looks like a constrained string set: ${unique.slice(0, 5).map((item) => `"${item}"`).join(", ")}.`,
        risks: ["Unknown future values may not be handled"],
        actions: [
          "Consider generating a string union for these values",
          "Add a fallback for unexpected enum values"
        ]
      });
    }
    value.forEach((item, index) => {
      collectEnumCandidateInsights(item, `${path}[${index}]`, insights);
    });
    return insights;
  }
  if (isPlainObject2(value)) {
    Object.entries(value).forEach(([key, child]) => {
      const nextPath = path ? `${path}.${key}` : key;
      collectEnumCandidateInsights(child, nextPath, insights);
    });
  }
  return insights;
}
function collectMixedFieldTypeInsights(value, path = "", insights = []) {
  if (Array.isArray(value)) {
    const objectItems = value.filter(
      (item) => typeof item === "object" && item !== null && !Array.isArray(item)
    );
    if (objectItems.length >= 2) {
      const fieldTypesMap = /* @__PURE__ */ new Map();
      objectItems.forEach((obj) => {
        Object.entries(obj).forEach(([key, val]) => {
          let type;
          if (val === null) type = "null";
          else if (Array.isArray(val)) type = "array";
          else type = typeof val;
          if (!fieldTypesMap.has(key)) {
            fieldTypesMap.set(key, /* @__PURE__ */ new Set());
          }
          fieldTypesMap.get(key).add(type);
        });
      });
      fieldTypesMap.forEach((types, field) => {
        if (types.size > 1) {
          const basePath = (path || "root").replace(/\[\d+\]/g, "[]").replace(/^root\./, "");
          const normalizedPath = basePath.includes("[]") ? basePath : `${basePath}[]`;
          const fullPath = `${normalizedPath}.${field}`;
          insights.push({
            id: `mixed-field-type:${fullPath}`,
            title: "Field has unstable type",
            severity: "critical",
            confidence: "high",
            summary: `${fullPath} \u2192 unstable type (${Array.from(types).join(" | ")})`,
            risks: [
              "TypeScript unions may become unsafe",
              "Runtime logic may fail depending on type"
            ],
            actions: [
              `Normalize "${field}" to a single type`,
              "Add type guards before usage"
            ],
            meta: {
              field,
              path: normalizedPath
            }
          });
        }
      });
    }
    value.forEach((item, index) => {
      collectMixedFieldTypeInsights(item, `${path}[${index}]`, insights);
    });
    return insights;
  }
  if (typeof value === "object" && value !== null) {
    Object.entries(value).forEach(([key, child]) => {
      const nextPath = path ? `${path}.${key}` : key;
      collectMixedFieldTypeInsights(child, nextPath, insights);
    });
  }
  return insights;
}
function mapProblemsToInsights(problems) {
  const insights = [];
  const hasInconsistent = problems.some(
    (problem) => problem.toLowerCase().includes("inconsistent")
  );
  const appearsInProblems = problems.filter(
    (problem) => problem.toLowerCase().includes("appears in")
  );
  if (hasInconsistent) {
    insights.push({
      id: "problem-map:inconsistent",
      title: "Backend shape inconsistency detected",
      severity: "critical",
      confidence: "high",
      summary: "The payload already shows structural inconsistencies across similar items.",
      risks: [
        "Frontend components may rely on fields that are not always present",
        "Type generation may require unions or optional fields"
      ],
      actions: [
        "Prefer frontend-safe optional fields",
        "Review backend normalization if a stable contract is expected"
      ]
    });
  }
  if (appearsInProblems.length > 0) {
    insights.push({
      id: "problem-map:missing-frequency",
      title: "Fields are not consistently present",
      severity: "warning",
      confidence: "high",
      summary: "Some fields only appear in a subset of items.",
      risks: [
        "Unsafe property access in rendering code",
        "Conditional UI paths may be required"
      ],
      actions: [
        "Guard field access in the UI",
        "Treat these fields as optional in types and schema"
      ]
    });
  }
  return insights;
}
function dedupeInsights(insights) {
  const seen = /* @__PURE__ */ new Set();
  const result = [];
  for (const insight of insights) {
    if (seen.has(insight.id)) continue;
    seen.add(insight.id);
    result.push(insight);
  }
  return result;
}
function rankSeverity(severity) {
  switch (severity) {
    case "critical":
      return 3;
    case "warning":
      return 2;
    case "info":
    default:
      return 1;
  }
}
function runInsightEngine(parsed, problems = []) {
  const insights = [
    ...mapProblemsToInsights(problems),
    ...collectArrayObjectShapeInsights(parsed),
    ...collectMixedPrimitiveTypeInsights(parsed),
    ...collectMixedFieldTypeInsights(parsed),
    ...collectNullableInsights(parsed),
    ...collectStringPatternInsights(parsed),
    ...collectEnumCandidateInsights(parsed)
  ];
  return dedupeInsights(insights).sort(
    (a, b) => rankSeverity(b.severity) - rankSeverity(a.severity)
  );
}

// src/problems/numericString.ts
var RISKY_FIELDS = ["id", "code", "zip", "phone"];
function isNumericString3(value) {
  return typeof value === "string" && /^\d+$/.test(value);
}
function isRiskyField(field) {
  return RISKY_FIELDS.some((f) => field.toLowerCase().includes(f));
}
function collectValuesByPath(obj, path = "", map = /* @__PURE__ */ new Map()) {
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => collectValuesByPath(item, `${path}[${i}]`, map));
    return map;
  }
  if (obj && typeof obj === "object") {
    Object.entries(obj).forEach(([key, value]) => {
      const newPath = path ? `${path}.${key}` : key;
      if (!map.has(newPath)) {
        map.set(newPath, []);
      }
      map.get(newPath).push(value);
      collectValuesByPath(value, newPath, map);
    });
  }
  return map;
}
function detectNumericStringIssues(data) {
  const issues = [];
  const map = collectValuesByPath(data);
  for (const [path, values] of map.entries()) {
    const hasNumber = values.some((v) => typeof v === "number");
    const numericStrings = values.filter(isNumericString3);
    if (!hasNumber || numericStrings.length === 0) continue;
    const fieldName = path.split(".").pop() || "";
    const safeToConvert = !isRiskyField(fieldName);
    const confidence = safeToConvert ? "high" : "low";
    if (confidence === "low") continue;
    issues.push({
      path,
      value: numericStrings[0],
      confidence,
      message: `${path} \u2192 unstable type (string | number)`
    });
  }
  return issues;
}

// src/problems/objectShape.ts
function isPlainObject3(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function analyzeArrayShape(arr, path) {
  const objects = arr.filter(isPlainObject3);
  if (objects.length < 2) return null;
  const keySets = objects.map((obj) => new Set(Object.keys(obj)));
  const allKeys = /* @__PURE__ */ new Set();
  keySets.forEach((set) => set.forEach((k) => allKeys.add(k)));
  const keyFrequency = /* @__PURE__ */ new Map();
  keySets.forEach((set) => {
    set.forEach((k) => {
      keyFrequency.set(k, (keyFrequency.get(k) || 0) + 1);
    });
  });
  const total = objects.length;
  const sharedKeys = [...allKeys].filter((k) => keyFrequency.get(k) === total);
  const hasNoSharedKeys = sharedKeys.length === 0;
  if (hasNoSharedKeys) {
    return {
      path,
      type: "critical",
      message: `${path} \u2192 inconsistent object shape (no shared keys)`
    };
  }
  const partialKeys = [...allKeys].filter((k) => keyFrequency.get(k) < total);
  const hasLowCoverage = partialKeys.some(
    (k) => keyFrequency.get(k) / total < 0.7
  );
  if (hasLowCoverage) {
    return {
      path,
      type: "warning",
      message: `${path} \u2192 partially inconsistent shape`
    };
  }
  return null;
}
function walk(data, path = "", issues = []) {
  if (Array.isArray(data)) {
    const issue = analyzeArrayShape(data, path);
    if (issue) issues.push(issue);
    data.forEach((item, i) => walk(item, `${path}[${i}]`, issues));
  } else if (isPlainObject3(data)) {
    Object.entries(data).forEach(([key, value]) => {
      const newPath = path ? `${path}.${key}` : key;
      walk(value, newPath, issues);
    });
  }
  return issues;
}
function detectObjectShapeIssues(data) {
  return walk(data);
}

// src/problems/deepOptional.ts
function isPlainObject4(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function analyzeDepth(obj, path = "", depth = 0, optionalCount = 0, totalCount = 0, issues = []) {
  if (!isPlainObject4(obj)) return;
  const keys = Object.keys(obj);
  const newTotal = totalCount + keys.length;
  const newOptional = optionalCount + keys.filter((k) => obj[k] == null).length;
  const ratio = newOptional / (newTotal || 1);
  if (depth >= 2 && ratio >= 0.3) {
    issues.push({
      path,
      depth,
      optionalRatio: ratio,
      message: `${path} \u2192 deep optional chain (null propagation risk)`
    });
  }
  keys.forEach((key) => {
    analyzeDepth(
      obj[key],
      path ? `${path}.${key}` : key,
      depth + 1,
      newOptional,
      newTotal,
      issues
    );
  });
  return issues;
}
function detectDeepOptionalIssues(data) {
  return analyzeDepth(data) || [];
}

// src/problems/index.ts
function detectAllProblems(data) {
  const numeric = detectNumericStringIssues(data);
  const shape = detectObjectShapeIssues(data);
  const deep = detectDeepOptionalIssues(data);
  return {
    numeric,
    shape,
    deep
  };
}

// src/decorations/jsonProblems.ts
var vscode5 = __toESM(require("vscode"));
var criticalDecoration = vscode5.window.createTextEditorDecorationType({
  textDecoration: "underline wavy #ff4d4f",
  overviewRulerColor: "#ff4d4f",
  overviewRulerLane: vscode5.OverviewRulerLane.Right
});
var warningDecoration = vscode5.window.createTextEditorDecorationType({
  textDecoration: "underline wavy #faad14",
  overviewRulerColor: "#faad14",
  overviewRulerLane: vscode5.OverviewRulerLane.Right
});

// src/decorations/findJsonKeyRanges.ts
var vscode6 = __toESM(require("vscode"));
function findKeyRanges(text, key, document) {
  const ranges = [];
  const regex = new RegExp(`"${key}"\\s*:`, "g");
  let match;
  while ((match = regex.exec(text)) !== null) {
    const start = document.positionAt(match.index);
    const end = document.positionAt(match.index + key.length + 2);
    ranges.push(new vscode6.Range(start, end));
  }
  return ranges;
}

// src/decorations/applyJsonHighlights.ts
function applyJsonHighlights(editor, text, problems) {
  const criticalRanges = [];
  const warningRanges = [];
  problems.slice(0, 5).forEach((p) => {
    const isCritical = p.includes("\u274C");
    const seen = /* @__PURE__ */ new Set();
    const keys = [];
    const [pathPart] = p.split(":");
    const rootMatch = pathPart.match(/root\.([a-zA-Z0-9_]+)/);
    if (rootMatch) {
      keys.push(rootMatch[1]);
    }
    const appearsMatches = [...p.matchAll(/([a-zA-Z0-9_]+) appears/g)];
    appearsMatches.forEach((m) => keys.push(m[1]));
    console.log("PROBLEM:", p);
    console.log("KEYS:", keys);
    keys.forEach((key) => {
      if (seen.has(key)) return;
      seen.add(key);
      const ranges = findKeyRanges(text, key, editor.document);
      if (isCritical) {
        criticalRanges.push(...ranges);
      } else {
        warningRanges.push(...ranges);
      }
    });
  });
  editor.setDecorations(criticalDecoration, criticalRanges);
  editor.setDecorations(warningDecoration, warningRanges);
}

// src/extension/extension.ts
function toSafeRange(doc, maybeRange) {
  if (!maybeRange || typeof maybeRange !== "object") {
    return null;
  }
  const candidate = maybeRange;
  const isValid = typeof candidate.start?.line === "number" && typeof candidate.start?.character === "number" && typeof candidate.end?.line === "number" && typeof candidate.end?.character === "number";
  if (!isValid) return null;
  try {
    const startLine = candidate.start?.line;
    const startChar = candidate.start?.character;
    const endLine = candidate.end?.line;
    const endChar = candidate.end?.character;
    if (typeof startLine !== "number" || typeof startChar !== "number" || typeof endLine !== "number" || typeof endChar !== "number") {
      return null;
    }
    const range = new vscode7.Range(
      new vscode7.Position(startLine, startChar),
      new vscode7.Position(endLine, endChar)
    );
    doc.getText(range);
    return range;
  } catch {
    return null;
  }
}
function activate(context) {
  const generateCommand = vscode7.commands.registerCommand(
    "jsonLens.generate",
    async (range) => {
      console.log("\u{1F525} COMMAND TRIGGERED");
      try {
        const editor = vscode7.window.activeTextEditor;
        if (!editor) {
          console.log("\u274C No editor");
          return;
        }
        const doc = editor.document;
        let text;
        const safeRange = toSafeRange(doc, range);
        if (safeRange) {
          text = doc.getText(safeRange);
        } else if (!editor.selection.isEmpty) {
          text = doc.getText(editor.selection);
        } else {
          text = doc.getText();
        }
        console.log("\u{1F4C4} TEXT LENGTH:", text.length);
        const extracted = extractJsonFromCode(text);
        console.log("\u{1F9E9} EXTRACTED:", extracted?.slice(0, 100));
        if (!extracted) {
          console.log("\u274C No JSON extracted");
          vscode7.window.showErrorMessage("No JSON found");
          return;
        }
        const parsed = import_json52.default.parse(extracted);
        console.log("\u2705 PARSED");
        const output = jsonToTypesAndZod(parsed, "RootObject", "full", true);
        console.log("\u{1F4E6} OUTPUT:", output?.slice(0, 200));
        if (!output) {
          console.log("\u274C No output generated");
          vscode7.window.showErrorMessage("Failed to generate types");
          return;
        }
        const docOut = await vscode7.workspace.openTextDocument({
          content: output,
          language: "typescript"
        });
        await vscode7.window.showTextDocument(docOut, {
          preview: true,
          viewColumn: vscode7.ViewColumn.Beside
        });
        console.log("\u{1F680} DONE");
      } catch (err) {
        console.error("\u{1F4A5} ERROR:", err);
        vscode7.window.showErrorMessage(
          "Generation failed: " + (err?.message || err)
        );
      }
    }
  );
  applyInitialHighlights();
  function applyInitialHighlights() {
    const editor = vscode7.window.activeTextEditor;
    if (!editor) return;
    const text = editor.document.getText();
    let extracted = null;
    if (editor.document.languageId === "json") {
      extracted = text;
    } else {
      extracted = extractJsonFromCode(text);
    }
    if (!extracted) return;
    try {
      const parsed = import_json52.default.parse(extracted);
      const problems = detectShapeProblems(parsed);
      applyJsonHighlights(editor, text, problems);
    } catch {
    }
  }
  const applyFixCommand = vscode7.commands.registerCommand(
    "jsonLens.applyFix",
    async () => {
      const editor = vscode7.window.activeTextEditor;
      if (!editor) return;
      const doc = editor.document;
      const fullText = doc.getText();
      let targetText;
      let range;
      if (!editor.selection.isEmpty) {
        targetText = doc.getText(editor.selection);
        range = editor.selection;
      } else {
        const extracted = extractJsonFromCode(fullText);
        if (!extracted) {
          vscode7.window.showErrorMessage("No JSON detected");
          return;
        }
        targetText = extracted;
        const startIndex = fullText.indexOf(extracted);
        if (startIndex === -1) {
          vscode7.window.showErrorMessage("Failed to locate JSON in document");
          return;
        }
        const start = doc.positionAt(startIndex);
        const end = doc.positionAt(startIndex + extracted.length);
        range = new vscode7.Range(start, end);
      }
      try {
        const initialVersion = doc.version;
        const parsed = import_json52.default.parse(targetText);
        const { fixed, hasChanges } = buildFixPreview(parsed);
        if (!hasChanges) {
          vscode7.window.showInformationMessage("No fix needed");
          return;
        }
        const fixedStr = JSON.stringify(fixed, null, 2);
        if (doc.version !== initialVersion) {
          vscode7.window.showWarningMessage(
            "Document changed. Please retry the fix."
          );
          return;
        }
        if (!range) {
          vscode7.window.showErrorMessage("No valid range to replace");
          return;
        }
        const edit = new vscode7.WorkspaceEdit();
        edit.replace(doc.uri, range, fixedStr);
        const success = await vscode7.workspace.applyEdit(edit);
        if (!success) {
          vscode7.window.showErrorMessage("Failed to apply fix");
          return;
        }
        vscode7.window.showInformationMessage("\u2705 JSON fixed safely");
      } catch (err) {
        vscode7.window.showErrorMessage(
          "Failed to apply fix: " + (err?.message || err)
        );
      }
    }
  );
  const openFullAnalysisCommand = vscode7.commands.registerCommand(
    "jsonLens.openFullAnalysis",
    async () => {
      const editor = vscode7.window.activeTextEditor;
      if (!editor) return;
      const text = editor.document.getText();
      const extracted = extractJsonFromCode(text);
      if (!extracted) return;
      try {
        const parsed = import_json52.default.parse(extracted);
        const typesOutput = jsonToTypesAndZod(parsed);
        const explanation = explainJson(parsed);
        const problems = detectShapeProblems(parsed);
        const advancedProblems = detectAllProblems(parsed);
        const insights = runInsightEngine(parsed, problems);
        const insightMarkdown = formatInsightMarkdown(
          insights,
          problems,
          advancedProblems
        );
        let fullContent = `# \u2728 JSON Toolkit Full Analysis

`;
        fullContent += insightMarkdown + "\n\n";
        if (problems.length > 0) {
          fullContent += `## \u26A0 Problems

`;
          fullContent += problems.join("\n") + "\n\n";
        }
        if (explanation) {
          fullContent += `## \u{1F4A1} Explanation

`;
          fullContent += "```ts\n" + explanation + "\n```\n\n";
        }
        if (typesOutput) {
          fullContent += `## \u{1F4E6} Types

`;
          fullContent += "```ts\n" + typesOutput + "\n```\n\n";
        }
        const doc = await vscode7.workspace.openTextDocument({
          content: fullContent,
          language: "markdown"
        });
        await vscode7.window.showTextDocument(doc, {
          preview: true,
          viewColumn: vscode7.ViewColumn.Beside
        });
      } catch {
        vscode7.window.showErrorMessage("Failed to open full analysis");
      }
    }
  );
  const fixAndGenerateCommand = vscode7.commands.registerCommand(
    "jsonLens.fixAndGenerate",
    async () => {
      const editor = vscode7.window.activeTextEditor;
      if (!editor) return;
      let text;
      let range;
      if (!editor.selection.isEmpty) {
        text = editor.document.getText(editor.selection);
        range = editor.selection;
      } else {
        const fullText = editor.document.getText();
        const extracted = extractJsonFromCode(fullText);
        if (!extracted) {
          vscode7.window.showErrorMessage("No JSON detected");
          return;
        }
        text = extracted;
        const startIndex = fullText.indexOf(extracted);
        if (startIndex !== -1) {
          const start = editor.document.positionAt(startIndex);
          const end = editor.document.positionAt(startIndex + extracted.length);
          range = new vscode7.Range(start, end);
        }
      }
      try {
        const parsed = import_json52.default.parse(text);
        const { fixed } = buildFixPreview(parsed);
        if (range) {
          const edit = new vscode7.WorkspaceEdit();
          edit.replace(
            editor.document.uri,
            range,
            JSON.stringify(fixed, null, 2)
          );
          await vscode7.workspace.applyEdit(edit);
        }
        const output = jsonToTypesAndZod(fixed);
        if (!output) {
          vscode7.window.showErrorMessage("Failed to generate types");
          return;
        }
        console.log("OUTPUT TYPE:", typeof output);
        console.log("OUTPUT LENGTH:", output?.length);
        console.log("OUTPUT VALUE:", output);
        if (!output || typeof output !== "string" || output.trim().length === 0) {
          console.log("\u274C INVALID OUTPUT:", output);
          vscode7.window.showErrorMessage("Invalid generated output");
          return;
        }
        const doc = await vscode7.workspace.openTextDocument({
          content: output,
          language: "typescript"
        });
        await vscode7.window.showTextDocument(doc, {
          preview: true,
          viewColumn: vscode7.ViewColumn.Beside
        });
        vscode7.window.showInformationMessage("\u26A1 Fixed + Generated Types");
      } catch (err) {
        vscode7.window.showErrorMessage("Fix + Generate failed");
      }
    }
  );
  const previewGenerateCommand = vscode7.commands.registerCommand(
    "jsonLens.previewGenerate",
    async () => {
      const editor = vscode7.window.activeTextEditor;
      if (!editor) return;
      const text = editor.document.getText();
      const extracted = extractJsonFromCode(text);
      if (!extracted) return;
      try {
        const parsed = import_json52.default.parse(extracted);
        const output = jsonToTypesAndZod(parsed);
        if (!output) {
          vscode7.window.showErrorMessage("Failed to generate types");
          return;
        }
        const doc = await vscode7.workspace.openTextDocument({
          content: output,
          language: "typescript"
        });
        await vscode7.window.showTextDocument(doc, {
          preview: true,
          viewColumn: vscode7.ViewColumn.Beside
        });
        vscode7.window.showInformationMessage("\u{1F441} Preview Generated Types");
      } catch {
        vscode7.window.showErrorMessage("Preview failed");
      }
    }
  );
  const codeActionProvider = vscode7.languages.registerCodeActionsProvider(
    ["json", "javascript", "typescript"],
    new JsonToZodCodeActionProvider(),
    {
      providedCodeActionKinds: [vscode7.CodeActionKind.QuickFix]
    }
  );
  context.subscriptions.push(
    vscode7.workspace.onDidChangeTextDocument((event) => {
      const editor = vscode7.window.activeTextEditor;
      if (!editor) return;
      if (event.document.uri.toString() !== editor.document.uri.toString()) {
        return;
      }
      const text = editor.document.getText();
      let extracted = null;
      if (editor.document.languageId === "json") {
        extracted = text;
      } else {
        extracted = extractJsonFromCode(text);
      }
      if (!extracted) {
        editor.setDecorations(criticalDecoration, []);
        editor.setDecorations(warningDecoration, []);
        return;
      }
      try {
        const parsed = import_json52.default.parse(extracted);
        const problems = detectShapeProblems(parsed);
        applyJsonHighlights(editor, text, problems);
      } catch {
        editor.setDecorations(criticalDecoration, []);
        editor.setDecorations(warningDecoration, []);
      }
    })
  );
  context.subscriptions.push(
    vscode7.window.onDidChangeActiveTextEditor((editor) => {
      if (!editor) return;
      const text = editor.document.getText();
      let extracted = null;
      if (editor.document.languageId === "json") {
        extracted = text;
      } else {
        extracted = extractJsonFromCode(text);
      }
      if (!extracted) return;
      try {
        const parsed = import_json52.default.parse(extracted);
        const problems = detectShapeProblems(parsed);
        applyJsonHighlights(editor, text, problems);
      } catch {
      }
    })
  );
  vscode7.commands.registerCommand("jsonLens.copyTypes", async () => {
    const editor = vscode7.window.activeTextEditor;
    if (!editor) return;
    const text = editor.document.getText();
    const extracted = extractJsonFromCode(text);
    if (!extracted) return;
    try {
      const parsed = import_json52.default.parse(extracted);
      const output = jsonToTypesAndZod(parsed);
      if (!output) return;
      const typesOnly = output.split("const")[0].trim();
      await vscode7.env.clipboard.writeText(typesOnly);
      vscode7.window.showInformationMessage("\u2705 Types copied");
    } catch {
      vscode7.window.showErrorMessage("\u274C Failed to copy types");
    }
  });
  vscode7.commands.registerCommand("jsonLens.copyZod", async () => {
    const editor = vscode7.window.activeTextEditor;
    if (!editor) return;
    const text = editor.document.getText();
    const extracted = extractJsonFromCode(text);
    if (!extracted) return;
    try {
      const parsed = import_json52.default.parse(extracted);
      const output = jsonToTypesAndZod(parsed);
      if (!output) return;
      const zodPart = output.split("const").slice(1).join("const").trim();
      await vscode7.env.clipboard.writeText(zodPart);
      vscode7.window.showInformationMessage("\u2705 Zod copied");
    } catch {
      vscode7.window.showErrorMessage("\u274C Failed to copy Zod");
    }
  });
  context.subscriptions.push(previewGenerateCommand);
  context.subscriptions.push(fixAndGenerateCommand);
  context.subscriptions.push(openFullAnalysisCommand);
  context.subscriptions.push(applyFixCommand);
  context.subscriptions.push(
    vscode7.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        updateInlineInsights(editor);
      }
    }),
    vscode7.workspace.onDidChangeTextDocument((event) => {
      const editor = vscode7.window.activeTextEditor;
      if (editor && event.document === editor.document) {
        updateInlineInsights(editor);
      }
    })
  );
  context.subscriptions.push(generateCommand);
  context.subscriptions.push(codeActionProvider);
  context.subscriptions.push(
    vscode7.languages.registerCodeLensProvider(
      ["javascript", "typescript", "json"],
      new JsonCodeLensProvider()
    )
  );
  context.subscriptions.push(
    vscode7.languages.registerHoverProvider(
      ["json", "jsonc", "javascript", "typescript"],
      new JsonHoverProvider()
    )
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
//# sourceMappingURL=extension.js.map
