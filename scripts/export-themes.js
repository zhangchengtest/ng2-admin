'use strict';
(function (module) {
  var _ = require('lodash');
  var fs = require('fs');
  var Colors = require('colors.js');

  var exporter = {};

  module.exports = function (path, name) {
    var out = {};
    out[exporter.interface(name)] = exporter.function(path);
    return out;
  };

  exporter.get_value = function get_value(a) {
    var value, i;
    switch (a.constructor.name) {
      case 'SassList':
        value = [];
        for (i = 0; i < a.getLength(); i++) {
          value.push(get_value(a.getValue(i)));
        }
        break;
      case 'SassMap':
        value = {};
        for (i = 0; i < a.getLength(); i++) {
          value[a.getKey(i).getValue()] = get_value(a.getValue(i));
        }
        break;
      case 'SassColor':
        if (1 === a.getA()) {
          debugger;
          value = Colors.rgb2hex(a.getR(), a.getG(), a.getB());
        }
        else {
          value = 'rgba(' + a.getR() + ', ' + a.getG() + ', ' + a.getB() + ', ' + a.getA() + ')';
        }
        break;
      case 'SassNumber':
        value = a.getValue();
        if (a.getUnit()) {
          value += a.getUnit();
        }
        break;
      case 'SassNull':
        value = null;
        break;
      default:
        value = a.getValue();
    }
    return value;
  };

  class Prop {
    constructor(name) {
      this.name = name;
      this.value = null;
      this.ancestors = [];
      this.descendants = [];
    };
  }

  class ThemeNode {
    constructor(theme, prop) {
      this.theme = theme;
      this.prop = prop;
    }
  }

  exporter.parseThemes = function(THEMES) {
    var result = {};
    for (let themeName in THEMES) {
      result[themeName] = result[themeName] ? result[themeName] : {};
      result[themeName].data = result[themeName].data ? result[themeName].data : {};
      result[themeName].name = themeName;
      result[themeName].parent = THEMES[themeName].parent;
      let theme = THEMES[themeName].data;
      for (let prop in theme) {
        result[themeName].data[prop] = result[themeName].data[prop] ? result[themeName].data[prop] : new Prop(prop);
        result = exporter.getAncestors(prop, themeName, themeName, prop, result, THEMES);
      }
    }
    let output = {};
    output['themes'] = result;
    return output;
  }

  exporter.getAncestors = function(prop, scopedThemeName, resultThemeName, resultProp, resultObj, THEMES) {
    let scopedTheme = THEMES[scopedThemeName].data;
    let scopedParent = THEMES[scopedThemeName].parent;
    let value = scopedTheme[prop];
    if (typeof value === "string" && scopedTheme[value]) {
      resultObj[resultThemeName].data[resultProp].ancestors ?
        resultObj[resultThemeName].data[resultProp].ancestors.push(new ThemeNode(scopedThemeName, value))
        : resultObj[resultThemeName].data[resultProp].ancestors = [new ThemeNode(scopedThemeName, value)];
      resultObj = exporter.addDescendant(resultObj, scopedThemeName, value, resultThemeName, resultProp);
      this.getAncestors(value, scopedThemeName, resultThemeName, resultProp, resultObj, THEMES);
    } else {
      resultObj[resultThemeName].data[resultProp].value = value;
      if (scopedParent && THEMES[scopedParent].data[prop] === value) {
        resultObj[resultThemeName].data[resultProp].ancestors ?
          resultObj[resultThemeName].data[resultProp].ancestors.push(new ThemeNode(scopedParent, prop))
          : resultObj[resultThemeName].data[resultProp].ancestors = [new ThemeNode(scopedParent, prop)];
        resultObj = this.addDescendant(resultObj, scopedParent, prop, resultThemeName, resultProp);
      }
    }
    return resultObj;
  }

  exporter.addDescendant = function(resultObj, targetTheme, targetProp, themeName, prop) {
    if (!resultObj.hasOwnProperty(targetTheme)) {
      resultObj[targetTheme].data = {};
      resultObj[targetTheme].data[targetProp] = new Prop(targetProp);
    } else if (!resultObj[targetTheme].data.hasOwnProperty(targetProp)) {
      resultObj[targetTheme].data[targetProp] = new Prop(targetProp);
    }
    resultObj[targetTheme].data[targetProp].descendants.push(new ThemeNode(themeName, prop));
    return resultObj;
  }

  exporter.function = function (path) {
    return function (file, value, options) {
      let opt = _.defaults(exporter.get_value(options), {prefix: '', suffix: '', extend: false});
      let output = exporter.get_value(value);
      output = exporter.parseThemes(output);
      output = _.defaults(JSON.parse(fs.readFileSync(path + '/' + file.getValue())), output);
      fs.writeFileSync(path + '/' + file.getValue(), opt.prefix + JSON.stringify(output, null, '  ') + opt.suffix);
      return value;
    }
  };

  exporter.interface = function (name) {
    name = name || 'export';
    return name + '($file, $value, $options:())';
  };
})(module);
