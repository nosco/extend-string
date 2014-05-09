String.prototype.zeroPadding = function(totalChars) {
  if(this.length < totalChars) {
    return String( Array( (totalChars - this.length) + 1 ).join('0') + this );
  } else return String(this);
};


String.prototype.pluralize = function(plural, count) {
  count = parseInt(count);
  if(count === 0) {
    return plural;
  } else if(count === 1) {
    return this;
  } else {
    return plural;
  }
};


String.prototype.linkify = function(target) {
  var str = String(this);

  str = str.stripTags();

  str = str.replace(/\b[a-z0-9-_!#$%&'`=\*\+\-\/\?\^\{\|\}\~]+@[a-z0-9]+?[a-z0-9\-\.]+\.[a-z]{2,4}/ig, function() {
    return '<a href="mailto:' + arguments[0] + '">' + arguments[0] + '</a>';
  });

  str = str.replace(/(^|[^a-z0-9@\.\-]{1}|[a-zA-Z]+:\/\/|www\.)((?:[0-9]{1,3}\.){3}[0-9]{1,3}|(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,})(:[0-9]+)?(\/[^\?\s]+)?(\?\S+)?/ig, function() {
    var link = arguments[1] + '<a href="' + arguments[2] + '"';
    if(target) {
      link += ' target="' + target + '"';
    }
    link += '>' + arguments[2] + '</a>';
    return link;
  });

  return str;
};


String.prototype.trim = function(replaceStr) {
  if(typeof replaceStr !== 'undefined') {
    replaceStr = replaceStr.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
  } else {
    replaceStr = "\\s";
  }
  var reStart = new RegExp('^'+replaceStr+'+');
  var reEnd = new RegExp(replaceStr+'+$');
  return String(this).replace(reStart, '').replace(reEnd, '');
};


String.prototype.repeat = function(times) {
  return String((new Array(times + 1)).join(String(this)));
};


String.prototype.upperCaseFirst = function() {
  var str = String(this);
  return str.charAt(0).toUpperCase() + str.slice(1);
};


String.prototype.camelCase = function(isClass) {
  var str = String(this);
  isClass = isClass || false;
  str = str.replace(/([^a-zA-Z]+[a-z])/g, function($1) { return $1.toUpperCase().slice(1); } );
  if(isClass) str = str.upperCaseFirst();
  return str;
};


String.prototype.slug = function(spacer) {
  spacer = spacer || '-';
  var str = String(this);
  str = str.replace(/([A-Z])/g, function($1) { return ' ' + $1.toLowerCase(); } );
  str = str.replace(/([^a-z0-9]+)/g, ' ');
  str = str.replace(/\s+/g, ' ');
  str = str.trim().replace(/ +/g, spacer);
  return str;
};


String.prototype.parseTrueInt = function() {
  var number = parseInt(this);
  return (isNaN(number) ? 0 : number);
};


String.prototype.stripTags = function(replaceChar) {
  if(typeof replaceChar == 'undefined') replaceChar = "";

  var str = String(this);
  str = str.replace(/<\s*(\/|)\s*p\s*>/g, "\n");
  str = str.replace(/<\s*(\/|)\s*br\s*(\/|)\s*>/g, "\n");
  str = str.replace(/<\s*(\/|)\s*[^>]+\s*(\/|)\s*>/g, replaceChar);
  str = str.replace(/(\r\n|\n\r|\r|\n|\t)/g, "\n");
  str = str.replace(/\t/g, " ");
  str = str.replace(/\n+/g, "\n");
  str = str.replace(/\s+/g, " ");
  return str.trim();
};


String.prototype.shorten = function(length, append) {
  var str = String(this);
  length = String(length).parseTrueInt() || 55;

  append = append || '';

  if(str.length > length) {
    str = str.substr(0, (length - append.length) );

    var lastpos = Math.max(str.lastIndexOf('.'), str.lastIndexOf(','), str.lastIndexOf(';'), str.lastIndexOf(' '));
    if(lastpos > length) str = str.substr(0, (length - append.length));
    else if(lastpos > 0) str = str.substr(0, lastpos);

    if(append.length > 0) {
      if(str.substr((str.length-1)) == '.') str = str.substr(0, (str.length-1));
      else if(str.substr((str.length-1)) == ',') str = str.substr(0, (str.length-1));
      str += append;
    }
  }

  return str;
};


String.prototype.addSlashes = function(replaceChar) {
  replaceChar = replaceChar || "'";
  var regex = new RegExp(replaceChar, 'g');
  return String(this).replace(regex, "\\"+replaceChar);
};


/* HTML DECODE */

var entitiesToChars = { '&amp;': '&', '&nbsp;': ' ', '&iexcl;': '¡', '&cent;': '¢', '&pound;': '£', '&curren;': '¤', '&yen;': '¥', '&brvbar;': '¦',
                  '&sect;': '§', '&uml;': '¨', '&copy;': '©', '&ordf;': 'ª', '&laquo;': '«', '&not;': '¬', '&reg;': '®', '&macr;': '¯',
                  '&deg;': '°', '&plusmn;': '±', '&sup2;': '²', '&sup3;': '³', '&acute;': '´', '&micro;': 'µ', '&para;': '¶', '&middot;': '·',
                  '&cedil;': '¸', '&sup1;': '¹', '&ordm;': 'º', '&raquo;': '»', '&frac14;': '¼', '&frac12;': '½', '&frac34;': '¾', '&iquest;': '¿',
                  '&Agrave;': 'À', '&Aacute;': 'Á', '&Acirc;': 'Â', '&Atilde;': 'Ã', '&Auml;': 'Ä', '&Aring;': 'Å', '&AElig;': 'Æ', '&Ccedil;': 'Ç',
                  '&Egrave;': 'È', '&Eacute;': 'É', '&Ecirc;': 'Ê', '&Euml;': 'Ë', '&Igrave;': 'Ì', '&Iacute;': 'Í', '&Icirc;': 'Î', '&Iuml;': 'Ï',
                  '&ETH;': 'Ð', '&Ntilde;': 'Ñ', '&Ograve;': 'Ò', '&Oacute;': 'Ó', '&Ocirc;': 'Ô', '&Otilde;': 'Õ', '&Ouml;': 'Ö', '&times;': '×',
                  '&Oslash;': 'Ø', '&Ugrave;': 'Ù', '&Uacute;': 'Ú', '&Ucirc;': 'Û', '&Uuml;': 'Ü', '&Yacute;': 'Ý', '&THORN;': 'Þ', '&szlig;': 'ß',
                  '&agrave;': 'à', '&aacute;': 'á', '&acirc;': 'â', '&atilde;': 'ã', '&auml;': 'ä', '&aring;': 'å', '&aelig;': 'æ', '&ccedil;': 'ç',
                  '&egrave;': 'è', '&eacute;': 'é', '&ecirc;': 'ê', '&euml;': 'ë', '&igrave;': 'ì', '&iacute;': 'í', '&icirc;': 'î', '&iuml;': 'ï',
                  '&eth;': 'ð', '&ntilde;': 'ñ', '&ograve;': 'ò', '&oacute;': 'ó', '&ocirc;': 'ô', '&otilde;': 'õ', '&ouml;': 'ö', '&divide;': '÷',
                  '&oslash;': 'ø', '&ugrave;': 'ù', '&uacute;': 'ú', '&ucirc;': 'û', '&uuml;': 'ü', '&yacute;': 'ý', '&thorn;': 'þ', '&yuml;': 'ÿ',
                  '&quot;': '"', '&lt;': '<', '&gt;': '>', '&apos;': "'", '&OElig;': 'Œ', '&oelig;': 'œ', '&Scaron;': 'Š', '&scaron;': 'š',
                  '&Yuml;': 'Ÿ', '&circ;': 'ˆ', '&tilde;': '˜', '&ensp;': ' ', '&emsp;': ' ', '&thinsp;': ' ', '&zwnj;': '‌', '&zwj;': '‍',
                  '&lrm;': '‎', '&rlm;': '‏', '&ndash;': '–', '&mdash;': '—', '&lsquo;': '‘', '&rsquo;': '’', '&sbquo;': '‚', '&ldquo;': '“',
                  '&rdquo;': '”', '&bdquo;': '„', '&dagger;': '†', '&Dagger;': '‡', '&permil;': '‰', '&lsaquo;': '‹', '&rsaquo;': '›', '&euro;': '€',
                  '&fnof;': 'ƒ', '&Gamma;': 'Γ', '&Delta;': 'Δ', '&Theta;': 'Θ', '&Lambda;': 'Λ', '&Xi;': 'Ξ', '&Pi;': 'Π', '&Sigma;': 'Σ',
                  '&Upsilon;': 'Υ', '&Phi;': 'Φ', '&Psi;': 'Ψ', '&Omega;': 'Ω', '&alpha;': 'α', '&beta;': 'β', '&gamma;': 'γ', '&delta;': 'δ',
                  '&epsilon;': 'ε', '&zeta;': 'ζ', '&eta;': 'η', '&theta;': 'θ', '&iota;': 'ι', '&kappa;': 'κ', '&lambda;': 'λ', '&mu;': 'μ',
                  '&nu;': 'ν', '&xi;': 'ξ', '&omicron;': 'ο', '&pi;': 'π', '&rho;': 'ρ', '&sigmaf;': 'ς', '&sigma;': 'σ', '&tau;': 'τ',
                  '&upsilon;': 'υ', '&phi;': 'φ', '&chi;': 'χ', '&psi;': 'ψ', '&omega;': 'ω', '&thetasym;': 'ϑ', '&upsih;': 'ϒ', '&piv;': 'ϖ',
                  '&bull;': '•', '&hellip;': '…', '&prime;': '′', '&Prime;': '″', '&oline;': '‾', '&frasl;': '⁄', '&weierp;': '℘', '&image;': 'ℑ',
                  '&real;': 'ℜ', '&trade;': '™', '&alefsym;': 'ℵ', '&larr;': '←', '&uarr;': '↑', '&rarr;': '→', '&darr;': '↓', '&harr;': '↔',
                  '&crarr;': '↵', '&lArr;': '⇐', '&uArr;': '⇑', '&rArr;': '⇒', '&dArr;': '⇓', '&hArr;': '⇔', '&forall;': '∀', '&part;': '∂',
                  '&exist;': '∃', '&empty;': '∅', '&nabla;': '∇', '&isin;': '∈', '&notin;': '∉', '&ni;': '∋', '&prod;': '∏', '&sum;': '∑',
                  '&minus;': '−', '&lowast;': '∗', '&radic;': '√', '&prop;': '∝', '&infin;': '∞', '&ang;': '∠', '&and;': '∧', '&or;': '∨',
                  '&cap;': '∩', '&cup;': '∪', '&int;': '∫', '&there4;': '∴', '&sim;': '∼', '&cong;': '≅', '&asymp;': '≈', '&ne;': '≠',
                  '&equiv;': '≡', '&le;': '≤', '&ge;': '≥', '&sub;': '⊂', '&sup;': '⊃', '&nsub;': '⊄', '&sube;': '⊆', '&supe;': '⊇',
                  '&oplus;': '⊕', '&otimes;': '⊗', '&perp;': '⊥', '&sdot;': '⋅', '&lceil;': '⌈', '&rceil;': '⌉', '&lfloor;': '⌊', '&rfloor;': '⌋',
                  '&lang;': '〈', '&rang;': '〉', '&loz;': '◊', '&spades;': '♠', '&clubs;': '♣', '&hearts;': '♥', '&diams;': '♦' };

String.prototype.htmlDecode = function() {
  var str = String(this);
  var regexCharcode = /&#(\d+);/g;
  var result = regexCharcode.exec(str);
  while(result != null) {
    var regexCurCharcode = new RegExp(result[0], 'g');
    str = str.replace(regexCurCharcode, String.fromCharCode(result[1]));
    result = regexCharcode.exec(str);
  }

  for(var i in entitiesToChars) {
    var regex = new RegExp(i, 'g');
    str = str.replace(regex, entitiesToChars[i]);
  }

  return String(str);
};


/* HTML ENCODE */

var charToEntities = { '&': '&amp;', ' ': '&nbsp;', '¡': '&iexcl;', '¢': '&cent;', '£': '&pound;', '¤': '&curren;', '¥': '&yen;', '¦': '&brvbar;',
                   '§': '&sect;', '¨': '&uml;', '©': '&copy;', 'ª': '&ordf;', '«': '&laquo;', '¬': '&not;', '®': '&reg;', '¯': '&macr;',
                   '°': '&deg;', '±': '&plusmn;', '²': '&sup2;', '³': '&sup3;', '´': '&acute;', 'µ': '&micro;', '¶': '&para;', '·': '&middot;',
                   '¸': '&cedil;', '¹': '&sup1;', 'º': '&ordm;', '»': '&raquo;', '¼': '&frac14;', '½': '&frac12;', '¾': '&frac34;', '¿': '&iquest;',
                   'À': '&Agrave;', 'Á': '&Aacute;', 'Â': '&Acirc;', 'Ã': '&Atilde;', 'Ä': '&Auml;', 'Å': '&Aring;', 'Æ': '&AElig;', 'Ç': '&Ccedil;',
                   'È': '&Egrave;', 'É': '&Eacute;', 'Ê': '&Ecirc;', 'Ë': '&Euml;', 'Ì': '&Igrave;', 'Í': '&Iacute;', 'Î': '&Icirc;', 'Ï': '&Iuml;',
                   'Ð': '&ETH;', 'Ñ': '&Ntilde;', 'Ò': '&Ograve;', 'Ó': '&Oacute;', 'Ô': '&Ocirc;', 'Õ': '&Otilde;', 'Ö': '&Ouml;', '×': '&times;',
                   'Ø': '&Oslash;', 'Ù': '&Ugrave;', 'Ú': '&Uacute;', 'Û': '&Ucirc;', 'Ü': '&Uuml;', 'Ý': '&Yacute;', 'Þ': '&THORN;', 'ß': '&szlig;',
                   'à': '&agrave;', 'á': '&aacute;', 'â': '&acirc;', 'ã': '&atilde;', 'ä': '&auml;', 'å': '&aring;', 'æ': '&aelig;', 'ç': '&ccedil;',
                   'è': '&egrave;', 'é': '&eacute;', 'ê': '&ecirc;', 'ë': '&euml;', 'ì': '&igrave;', 'í': '&iacute;', 'î': '&icirc;', 'ï': '&iuml;',
                   'ð': '&eth;', 'ñ': '&ntilde;', 'ò': '&ograve;', 'ó': '&oacute;', 'ô': '&ocirc;', 'õ': '&otilde;', 'ö': '&ouml;', '÷': '&divide;',
                   'ø': '&oslash;', 'ù': '&ugrave;', 'ú': '&uacute;', 'û': '&ucirc;', 'ü': '&uuml;', 'ý': '&yacute;', 'þ': '&thorn;', 'ÿ': '&yuml;',
                   '"': '&quot;', '<': '&lt;', '>': '&gt;', "'": '&apos;', 'Œ': '&OElig;', 'œ': '&oelig;', 'Š': '&Scaron;', 'š': '&scaron;',
                   'Ÿ': '&Yuml;', 'ˆ': '&circ;', '˜': '&tilde;', ' ': '&ensp;', ' ': '&emsp;', ' ': '&thinsp;', '‌': '&zwnj;', '‍': '&zwj;',
                   '‎': '&lrm;', '‏': '&rlm;', '–': '&ndash;', '—': '&mdash;', '‘': '&lsquo;', '’': '&rsquo;', '‚': '&sbquo;', '“': '&ldquo;',
                   '”': '&rdquo;', '„': '&bdquo;', '†': '&dagger;', '‡': '&Dagger;', '‰': '&permil;', '‹': '&lsaquo;', '›': '&rsaquo;', '€': '&euro;',
                   'ƒ': '&fnof;', 'Γ': '&Gamma;', 'Δ': '&Delta;', 'Θ': '&Theta;', 'Λ': '&Lambda;', 'Ξ': '&Xi;', 'Π': '&Pi;', 'Σ': '&Sigma;',
                   'Υ': '&Upsilon;', 'Φ': '&Phi;', 'Ψ': '&Psi;', 'Ω': '&Omega;', 'α': '&alpha;', 'β': '&beta;', 'γ': '&gamma;', 'δ': '&delta;',
                   'ε': '&epsilon;', 'ζ': '&zeta;', 'η': '&eta;', 'θ': '&theta;', 'ι': '&iota;', 'κ': '&kappa;', 'λ': '&lambda;', 'μ': '&mu;',
                   'ν': '&nu;', 'ξ': '&xi;', 'ο': '&omicron;', 'π': '&pi;', 'ρ': '&rho;', 'ς': '&sigmaf;', 'σ': '&sigma;', 'τ': '&tau;',
                   'υ': '&upsilon;', 'φ': '&phi;', 'χ': '&chi;', 'ψ': '&psi;', 'ω': '&omega;', 'ϑ': '&thetasym;', 'ϒ': '&upsih;', 'ϖ': '&piv;',
                   '•': '&bull;', '…': '&hellip;', '′': '&prime;', '″': '&Prime;', '‾': '&oline;', '⁄': '&frasl;', '℘': '&weierp;', 'ℑ': '&image;',
                   'ℜ': '&real;', '™': '&trade;', 'ℵ': '&alefsym;', '←': '&larr;', '↑': '&uarr;', '→': '&rarr;', '↓': '&darr;', '↔': '&harr;',
                   '↵': '&crarr;', '⇐': '&lArr;', '⇑': '&uArr;', '⇒': '&rArr;', '⇓': '&dArr;', '⇔': '&hArr;', '∀': '&forall;', '∂': '&part;',
                   '∃': '&exist;', '∅': '&empty;', '∇': '&nabla;', '∈': '&isin;', '∉': '&notin;', '∋': '&ni;', '∏': '&prod;', '∑': '&sum;',
                   '−': '&minus;', '∗': '&lowast;', '√': '&radic;', '∝': '&prop;', '∞': '&infin;', '∠': '&ang;', '∧': '&and;', '∨': '&or;',
                   '∩': '&cap;', '∪': '&cup;', '∫': '&int;', '∴': '&there4;', '∼': '&sim;', '≅': '&cong;', '≈': '&asymp;', '≠': '&ne;',
                   '≡': '&equiv;', '≤': '&le;', '≥': '&ge;', '⊂': '&sub;', '⊃': '&sup;', '⊄': '&nsub;', '⊆': '&sube;', '⊇': '&supe;',
                   '⊕': '&oplus;', '⊗': '&otimes;', '⊥': '&perp;', '⋅': '&sdot;', '⌈': '&lceil;', '⌉': '&rceil;', '⌊': '&lfloor;', '⌋': '&rfloor;',
                   '〈': '&lang;', '〉': '&rang;', '◊': '&loz;', '♠': '&spades;', '♣': '&clubs;', '♥': '&hearts;', '♦': '&diams;' };

String.prototype.htmlEncode = function() {
  var str = String(this);
  for(var i in charToEntities) {
    var regex = new RegExp(i, 'g');
    str = str.replace(regex, charToEntities[i]);
  }
  return String(str);
};

