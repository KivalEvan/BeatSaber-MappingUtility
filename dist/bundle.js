(()=>{"use strict";const e=function(){function e(){this.version="v2.0.1",this.wm="Kival Evan#5480"}return Object.defineProperty(e.prototype,"number",{get:function(){return this.version},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"watermark",{get:function(){return this.wm},enumerable:!1,configurable:!0}),e}();function t(e,t){return void 0===t&&(t=0),t>0?Math.round(e*Math.pow(10,t))/Math.pow(10,t):Math.round(e)}function n(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}const r=function(){function e(e){void 0===e&&(e=128),this.bpm=e}return Object.defineProperty(e.prototype,"value",{get:function(){return this.bpm},set:function(e){this.bpm=e},enumerable:!1,configurable:!0}),e}(),o=function(){function e(e,t){void 0===t&&(t=2),this._bpm=e,this._precBeat=t,this.update()}return Object.defineProperty(e.prototype,"precBeat",{get:function(){return this._precBeat},set:function(e){this._precBeat=e,this.update()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"precTime",{get:function(){return this._precTime},set:function(e){this.precBeat=1/e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"precRealTime",{get:function(){return this._precRealTime},set:function(e){this.precBeat=1/(this._bpm.value*e/6e4)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"ebpmStream",{get:function(){return this._ebpmStream},set:function(e){this._ebpmStream=e,this.precBeat=this.calcBeatPrecision()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"ebpmOHJ",{get:function(){return this._ebpmOHJ},set:function(e){this._ebpmStream=e/2,this.precBeat=this.calcBeatPrecision()},enumerable:!1,configurable:!0}),e.prototype.update=function(){this._precTime=1/this._precBeat,this._precRealTime=60/this._bpm.value/this._precBeat*1e3,this._ebpmOHJ=this.calcEffectiveBPM(),this._ebpmStream=this._ebpmOHJ/2},e.prototype.calcEffectiveBPM=function(){return.5*this._bpm.value/(1/this._precBeat)},e.prototype.calcBeatPrecision=function(){return this._ebpmStream/(.25*this._bpm.value)},e}(),i=function(){function e(e,t,n){void 0===t&&(t=10),void 0===n&&(n=0),this._hjdStart=4,this._hjdMin=1,this._bpm=e,this._njs=t,this._sdm=n,this.update()}return Object.defineProperty(e.prototype,"njs",{get:function(){return this._njs},set:function(e){this._njs=e,this.update()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"offset",{get:function(){return this._sdm},set:function(e){this._sdm=e,this.update()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"hjd",{get:function(){return this._hjd},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"hjdMin",{get:function(){return this._hjdMin},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"reactTime",{get:function(){return this._reactionTime},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"jd",{get:function(){return this._jd},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"jdMin",{get:function(){return this._jdMin},enumerable:!1,configurable:!0}),e.prototype.update=function(){this._hjd=this.calcHalfJumpDuration(),this._jd=this.calcJumpDistance(),this._jdMin=this.calcJumpDistance(this._hjdMin),this._reactionTime=this.calcReactionTimeHJD()},e.prototype.calcHalfJumpDurationRaw=function(){for(var e=this._njs*this._njs/this._njs,t=60/this._bpm.value,n=this._hjdStart;e*t*n>18;)n/=2;return n<this._hjdMin&&(n=1),n},e.prototype.calcHalfJumpDuration=function(e){return void 0===e&&(e=this.offset),Math.max(this.calcHalfJumpDurationRaw()+e,1)},e.prototype.calcHalfJumpDurationFromJD=function(e){return void 0===e&&(e=this.calcJumpDistance()),e/(60/this._bpm.value*this._njs*2)},e.prototype.calcHalfJumpDurationFromRT=function(e){return void 0===e&&(e=this.calcReactionTimeHJD()),e/(60/this._bpm.value)},e.prototype.calcJumpDistance=function(e){return void 0===e&&(e=this.calcHalfJumpDuration()),this._njs*(60/this._bpm.value)*e*2},e.prototype.calcJumpDistanceOptimalHigh=function(){return 18*Math.pow(1/1.07,this._njs)+18},e.prototype.calcJumpDistanceOptimalLow=function(){return-18/(this._njs+1)+18},e.prototype.calcReactionTimeJD=function(e){return void 0===e&&(e=this.calcJumpDistance()),e/(2*this._njs)},e.prototype.calcReactionTimeHJD=function(e){return void 0===e&&(e=this.calcHalfJumpDuration()),60/this._bpm.value*e},e}();var a={scoresaber:[[1.14,1.2],[1.1,1.15],[1,1.1],[.95,1.036],[.94,.974],[.93,.92],[.92,.885],[.91,.85],[.9,.815],[.88,.766],[.86,.72],[.845,.63],[.82,.56],[.75,.425],[.69,.25],[.5,.15],[.4,.08],[0,0]],exponential:[[1,8],[.99,4],[.98,2],[.97,1.5],[.96,1.1],[.95,1.036],[.94,.974],[.93,.92],[.92,.885],[.91,.85],[.9,.815],[.88,.766],[.86,.72],[.845,.63],[.82,.56],[.75,.425],[.69,.25],[.5,.15],[.4,.08],[0,0]]},c=function(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e};const u=function(){function e(e,t,n){void 0===e&&(e=0),void 0===t&&(t=7),void 0===n&&(n=a.scoresaber),this._starRating=7,this._starPP=42.521,this._note=e,this._starRating=t,this._curvePoints=c([],n).sort((function(e,t){return e[0]-t[0]}))}return Object.defineProperty(e.prototype,"note",{get:function(){return this._note},set:function(e){this._note=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"star",{get:function(){return this._starRating},set:function(e){this._starRating=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"curvePoints",{get:function(){return this._curvePoints},set:function(e){this._curvePoints=c([],e).sort((function(e,t){return e[0]-t[0]}))},enumerable:!1,configurable:!0}),e.prototype.calcPP=function(e,t){return void 0===e&&(e=this._starRating),void 0===t&&(t=.9458064516129032),this._starPP*e*(n=this._curvePoints,r=t,u=n.map((function(e){return e[0]})),l=n.map((function(e){return e[1]})),s=null!==(o=c([],u).reverse().find((function(e){return e<=r})))&&void 0!==o?o:u[0],p=null!==(i=u.find((function(e){return e>=r})))&&void 0!==i?i:s,h=l[u.indexOf(s)],d=l[u.indexOf(p)],f=function(e,t,n){return function(e,t,n){return void 0===t&&(t=0),void 0===n&&(n=1),Math.min(n,Math.max(t,e))}((n-e)/(t-e))}(s,p,r)||0,l[u.indexOf(r)]||(a=h)+(d-a)*f);var n,r,o,i,a,u,l,s,p,h,d,f},e.prototype.calcScore=function(e,t,n,r){void 0===e&&(e=115),void 0===t&&(t=1),void 0===n&&(n=[]),void 0===r&&(r=[]);var o=0,i=e*t,a=!0,u=0,l=1,s=c([],n).map((function(e){return e-1})),p=c([],r).map((function(e){return e-1}));function h(){l=Math.max(l/2,1),u=0,a=!0}for(var d=0;d<this._note;d++)p.includes(d)&&h(),s.includes(d)?h():(u++,a&&u>=2*l&&((l*=2)>=8&&(a=!1),u=0),o+=i*l);return o},e}(),l=function(){function e(){this._difficulty={easy:null,normal:null,hard:null,expert:null,expertplus:null}}return Object.defineProperty(e.prototype,"difficulty",{get:function(){return this._difficulty},enumerable:!1,configurable:!0}),e.prototype.calcDifference=function(e,t){return 100*(1-this._difficulty[t]/this._difficulty[e])},e.prototype.getTotalReduction=function(){var e=null,t=null;for(var n in this._difficulty)null!==this._difficulty[n]&&((!e||e<this._difficulty[n])&&(e=this._difficulty[n]),(!t||t>this._difficulty[n])&&(t=this._difficulty[n]));return e||e&&t?100*(1-t/e):0},e}();var s={"Default Custom":{_colorLeft:{r:.7529412,g:.1882353,b:.1882353},_colorRight:{r:.1254902,g:.3921569,b:.6588235},_envColorLeft:{r:.7529412,g:.1882353,b:.1882353},_envColorRight:{r:.1882353,g:.5960785,b:1},_obstacleColor:{r:1,g:.1882353,b:.1882353}},"The First":{_colorLeft:{r:.7843137,g:.07843138,b:.07843138},_colorRight:{r:.1568627,g:.5568627,b:.8235294},_envColorLeft:{r:.85,g:.08499997,b:.08499997},_envColorRight:{r:.1882353,g:.675294,b:1},_obstacleColor:{r:1,g:.1882353,b:.1882353}},Origins:{_colorLeft:{r:.6792453,g:.5712628,b:0},_colorRight:{r:.7075472,g:0,b:.5364411},_envColorLeft:{r:.4910995,g:.6862745,b:.7},_envColorRight:{r:.03844783,g:.6862745,b:.9056604},_obstacleColor:{r:.06167676,g:.2869513,b:.3962264}},KDA:{_colorLeft:{r:.6588235,g:.2627451,b:.1607843},_colorRight:{r:.5019608,g:.08235294,b:.572549},_envColorLeft:{r:1,g:.3960785,b:.2431373},_envColorRight:{r:.7607844,g:.1254902,b:.8666667},_obstacleColor:{r:1,g:.3960785,b:.2431373}},"Crab Rave":{_colorLeft:{r:0,g:.7130001,b:.07806564},_colorRight:{r:.04805952,g:.5068096,b:.734},_envColorLeft:{r:.134568,g:.756,b:.1557533},_envColorRight:{r:.05647058,g:.6211764,b:.9},_obstacleColor:{r:0,g:.8117648,b:.09019608}},Noir:{_colorLeft:{r:.1792453,g:.1792453,b:.1792453},_colorRight:{r:.5943396,g:.5943396,b:.5943396},_envColorLeft:{r:.4056604,g:.4056604,b:.4056604},_envColorRight:{r:.6037736,g:.6037736,b:.6037736},_obstacleColor:{r:.2358491,g:.2358491,b:.2358491}},Rocket:{_colorLeft:{r:1,g:.4980392,b:0},_colorRight:{r:0,g:.5294118,b:1},_envColorLeft:{r:.9,g:.4866279,b:.3244186},_envColorRight:{r:.4,g:.7180724,b:1},_obstacleColor:{r:.3176471,g:.6117647,b:.7254902}},"Green Day":{_colorLeft:{r:.2588235,g:.7843138,b:.01960784},_colorRight:{r:0,g:.7137255,b:.6705883},_envColorLeft:{r:0,g:.7137255,b:.6705883},_envColorRight:{r:.2588235,g:.7843137,b:.01960784},_obstacleColor:{r:0,g:.8117648,b:.09019608}},Timbaland:{_colorLeft:{r:.5019608,g:.5019608,b:.5019608},_colorRight:{r:.1,g:.5517647,b:1},_envColorLeft:{r:.1,g:.5517647,b:1},_envColorRight:{r:.1,g:.5517647,b:1},_obstacleColor:{r:.5,g:.5,b:.5}},FitBeat:{_colorLeft:{r:.8000001,g:.6078432,b:.1568628},_colorRight:{r:.7921569,g:.1607843,b:.682353},_envColorLeft:{r:.8,g:.5594772,b:.5594772},_envColorRight:{r:.5594772,g:.5594772,b:.8},_obstacleColor:{r:.2784314,g:.2784314,b:.4}},"Linkin Park":{_colorLeft:{r:.6627451,g:.1643608,b:.1690187},_colorRight:{r:.3870196,g:.5168997,b:.5568628},_envColorLeft:{r:.7529412,g:.672753,b:.5925647},_envColorRight:{r:.6241197,g:.6890281,b:.709},_envColorLeftBoost:{r:.922,g:.5957885,b:.255394},_envColorRightBoost:{r:.282353,g:.4586275,b:.6235294},_obstacleColor:{r:.6627451,g:.1647059,b:.172549}},BTS:{_colorLeft:{r:1,g:.09019607,b:.4059771},_colorRight:{r:.8018868,g:0,b:.7517689},_envColorLeft:{r:.7843137,g:.1254902,b:.5010797},_envColorRight:{r:.6941177,g:.1254902,b:.8666667},_envColorLeftBoost:{r:.9019608,g:.5411765,b:1},_envColorRightBoost:{r:.3490196,g:.8078431,b:1},_obstacleColor:{r:.6698113,g:.1800908,b:.5528399}},Kaleidoscope:{_colorLeft:{r:.65882355,g:.1254902,b:.1254902},_colorRight:{r:.28235295,g:.28235295,b:.28235295},_envColorLeft:{r:.65882355,g:.1254902,b:.1254902},_envColorRight:{r:.47058824,g:.47058824,b:.47058824},_envColorLeftBoost:{r:.50196081,g:0,b:0},_envColorRightBoost:{r:.49244517,g:0,b:.53725493},_obstacleColor:{r:.25098041,g:.25098041,b:.25098041}},Interscope:{_colorLeft:{r:.726415,g:.62691,b:.31181},_colorRight:{r:.589571,g:.297888,b:.723},_envColorLeft:{r:.724254,g:.319804,b:.913725},_envColorRight:{r:.764706,g:.758971,b:.913725},_envColorLeftBoost:{r:.792453,g:.429686,b:.429868},_envColorRightBoost:{r:.7038,g:.715745,b:.765},_obstacleColor:{r:.588235,g:.298039,b:.721569}},"Glass Desert":{_colorLeft:{r:.6792453,g:.5712628,b:0},_colorRight:{r:.7075472,g:0,b:.5364411},_envColorLeft:{r:.32222217,g:.6111111,b:.75},_envColorRight:{r:.03844783,g:.62239975,b:.90566039},_obstacleColor:{r:.06167676,g:.2869513,b:.3962264}}};const p=function(){function e(e){void 0===e&&(e="Default Custom"),this._environmentColor=e,this._colorScheme={_colorLeft:null,_colorRight:null,_envColorLeft:null,_envColorRight:null,_envColorLeftBoost:null,_envColorRightBoost:null,_obstacleColor:null},this.update()}return Object.defineProperty(e.prototype,"colorScheme",{get:function(){return this._colorScheme},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"environmentColor",{get:function(){return this._environmentColor},set:function(e){this._environmentColor=e,this.update()},enumerable:!1,configurable:!0}),e.prototype.update=function(){if(s[this._environmentColor])for(var e in this._colorScheme)this._colorScheme[e]=s[this._environmentColor][e]||null},e.prototype.getColorHex=function(e){return null==e?"#000000":this.rgbaToHex(e)},e.prototype.decToHex=function(e){var t=e.toString(16);return 1===t.length?"0"+t:t},e.prototype.hexToDec=function(e){return parseInt(e,16)},e.prototype.cDenorm=function(e){return e>1&&!(e<0)?255:t(255*e)},e.prototype.cNorm=function(e){return e/255},e.prototype.rgbaToHex=function(e){var t={r:null,g:null,b:null};for(var n in e)t[n]=this.cDenorm(e[n]);return"#"+this.decToHex(t.r)+this.decToHex(t.g)+this.decToHex(t.b)+(void 0!==t.a?this.decToHex(t.a):"")},e.prototype.hexToRGB=function(e){return{r:this.cNorm(this.hexToDec(e.slice(1,3))),g:this.cNorm(this.hexToDec(e.slice(3,5))),b:this.cNorm(this.hexToDec(e.slice(5,7)))}},e}();var h={0:"noter.svg",1:"noteb.svg",2:"bomb.png",3:"noterd.svg",4:"notebd.svg",blank:"blank.png"},d={0:"",1:"deg180",2:"deg270",3:"deg90",4:"deg315",5:"deg45",6:"deg225",7:"deg135",8:""};const f=function(){function e(e,t){this._maxIndex=t,this._maxLayer=e}return Object.defineProperty(e.prototype,"column",{get:function(){return this._maxIndex},set:function(e){this._maxIndex=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"row",{get:function(){return this._maxLayer},set:function(e){this._maxLayer=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"limit",{get:function(){return this._limit},set:function(e){this._limit=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"total",{get:function(){return this._total},set:function(e){this._total=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"noteRed",{get:function(){return this._noteRed},set:function(e){this._noteRed=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"noteBlue",{get:function(){return this._noteBlue},set:function(e){this._noteBlue=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"noteBomb",{get:function(){return this._noteBomb},set:function(e){this._noteBomb=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"noDot",{get:function(){return this._noDot},set:function(e){this._noDot=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parity",{get:function(){return this._parity},set:function(e){this._parity=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parityExtend",{get:function(){return this._parityExtend},set:function(e){this._parityExtend=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parityRed",{get:function(){return this._parityRed},set:function(e){this._parityRed=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parityBlue",{get:function(){return this._parityBlue},set:function(e){this._parityBlue=e},enumerable:!1,configurable:!0}),e.prototype.createValidParity=function(e,t){void 0===e&&(e=0),void 0===t&&(t=!1);var n={0:{0:[6,1,7],1:[4,0,5],2:[0,1,2,3,4,5,6,7,8],3:[0,1,2,3,4,5,6,7,8]},1:{0:[6,1,7],1:[4,0,5],2:[0,1,2,3,4,5,6,7,8],3:[0,1,2,3,4,5,6,7,8]}};return t&&(n[0][0].push(8),n[0][1].push(8),n[1][0].push(8),n[1][1].push(8)),e>0&&(n[0][0].push(3),n[0][1].push(2),n[1][0].push(2),n[1][1].push(3)),e>1&&(n[0][0].push(5),n[0][1].push(6),n[1][0].push(4),n[1][1].push(7)),e>2&&(n[0][0].push(0,2),n[0][1].push(1,3),n[1][0].push(0,3),n[1][1].push(1,2)),n},e.prototype.generate=function(){var e=2,t=[this._noteRed,this._noteBlue,this._noteBomb],n={0:this._parityRed?0:1,1:this._parityBlue?0:1},r=this.createValidParity(this._parityExtend,!this._noDot),o=this._maxIndex*this._maxLayer;this._limit&&(e=Math.min(this._total,t.reduce((function(e,t){return e+t})),o)),this._limit||(e=Math.min(t.reduce((function(e,t){return e+t})),o));var i=new Array(o).fill(null);if(0===e)return i;for(var a=0;a<e;){for(var c=Math.floor(Math.random()*o),u=Math.floor(3*Math.random()),l=0;l<3;l++)0===t[u]&&(u=(u+1)%3);if(0===t[u])break;var s=Math.floor(9*Math.random());for(this._parity&&u<=1&&(s=r[u][n[u]][Math.floor(Math.random()*r[u][n[u]].length)]),l=0;l<o;l++){var p=(c+l)%o;if(null===i[p]){2===u&&(s=0),i[p]={_noteType:u,_noteDirection:s},t[u]--,a++;break}}}return i},e}();var v=function(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e},m=new r,g=new i(m,16),b=new o(m),y=new u(727),_=new l,S=new p,C=new f(3,4),j=new e,L=document.querySelectorAll(".text-version"),x=document.querySelectorAll(".text-watermark"),R=document.querySelector("#map-settings-input-bpm"),E=document.querySelectorAll(".toggle-input"),q=document.querySelector("#ebpm-input-precbeat"),P=document.querySelector("#ebpm-input-prectime"),M=document.querySelector("#ebpm-input-precrealtime"),T=document.querySelector("#ebpm-input-ebpm-ohj"),B=document.querySelector("#ebpm-input-ebpm-stream"),O=document.querySelector("#njs-input-njs"),D=document.querySelector("#njs-input-offset"),k=document.querySelector("#njs-input-hjd"),H=document.querySelector("#njs-input-jd"),J=document.querySelector("#njs-input-reacttime"),F=document.querySelector("#njs-output-jd"),w=document.querySelector("#njs-output-reacttime"),N=document.querySelector("#njs-output-jd-optimal-high"),I=document.querySelector("#njs-output-jd-optimal-low"),A=document.querySelector("#njs-option-njs-scale"),G=document.querySelector("#score-input-note"),K=document.querySelector("#score-input-star"),V=document.querySelector("#score-input-percent"),$=document.querySelector("#score-input-score"),z=document.querySelector("#score-input-pp"),Q=document.querySelector("#score-output-maxscore"),U=document.querySelector("#score-output-maxscore-modifier"),W=document.querySelector("#score-input-avgcut"),X=document.querySelector("#score-input-missed"),Y=document.querySelector("#score-input-break"),Z=document.querySelector("#score-output-estscore"),ee=document.querySelector("#score-output-estpercent"),te=document.querySelector("#score-output-estpp"),ne=document.querySelector("#score-output-missscore"),re=document.querySelector("#score-output-nomissscore"),oe=document.querySelector("#score-output-nomisspercent"),ie=document.querySelector("#score-output-nomisspp"),ae=document.querySelector("#score-table"),ce=document.querySelector("#score-table-percentage"),ue=document.querySelector("#score-option-pp-curve"),le=document.querySelector("#score-text-json"),se=document.querySelector("#score-error-json"),pe=document.querySelector("#label-input-text"),he=document.querySelector("#label-output-text"),de=document.querySelector("#label-input-diff-count-1"),fe=document.querySelector("#label-input-diff-count-2"),ve=document.querySelector("#label-input-diff-count-3"),me=document.querySelector("#label-input-diff-count-4"),ge=document.querySelector("#label-input-diff-count-5"),be={},ye={};for(var _e in _.difficulty)be[_e]=document.querySelector("#sps-input-"+_e),ye[_e]=document.querySelector("#sps-output-"+_e);var Se=document.querySelector("#sps-output-total-reduction"),Ce=document.querySelector("#cp-option-colorscheme"),je={},Le={},xe={},Re={};for(var Ee in S.colorScheme){var qe=Ee.replace(/^\_/,"").toLowerCase();je[Ee]=document.querySelector("#cp-input-hex-"+qe),Le[Ee]=document.querySelector("#cp-input-picker-"+qe),xe[Ee]=document.querySelector("#cp-input-include-"+qe),Re[Ee]=document.querySelector("#cp-input-reset-"+qe)}var Pe=document.querySelector("#cp-io-colorjson"),Me=document.querySelector("#cp-error-colorjson"),Te=document.querySelector("#rpg-input-rpattern-row"),Be=document.querySelector("#rpg-input-rpattern-column"),Oe=document.querySelector("#rpg-table-rpattern"),De=document.querySelector("#rpg-input-rpattern-red"),ke=document.querySelector("#rpg-input-rpattern-blue"),He=document.querySelector("#rpg-input-rpattern-bomb"),Je=document.querySelector("#rpg-input-rpattern-limit"),Fe=document.querySelector("#rpg-input-rpattern-total"),we=document.querySelector("#rpg-input-rpattern-nodot"),Ne=document.querySelector("#rpg-input-rpattern-parity"),Ie=document.querySelector("#rpg-input-rpattern-parity-extend"),Ae=document.querySelector("#rpg-input-rpattern-parity-red"),Ge=document.querySelector("#rpg-input-rpattern-parity-blue"),Ke=document.querySelector("#rpg-input-generate-rpattern");for(var _e in function(){var e;e=j.number,L.forEach((function(t){t.textContent=e})),function(e){x.forEach((function(t){t.textContent=e}))}(j.watermark),R.value=m.value.toString(),tt(),et(),O.value=g.njs.toString(),D.value=g.offset.toString(),ct(),w.textContent=t(60/m.value*1e3)+"ms",Qe(),ce.value=[100,98,97,96,95,94,93,90,85,80].join(","),G.value=y.note.toString(),K.value=y.star.toString(),V.value="90",W.value="111",X.value=[3,22,100,102].join(","),Y.value=[127].join(","),a.custom=v([],a.scoresaber),ft(),vt(),mt(),gt(),Te.value=C.row.toString(),Be.value=C.column.toString(),De.value="1",ke.value="1",He.value="0",Fe.value="2",Ie.value="0",xt()}(),R.addEventListener("change",Ue),R.addEventListener("input",Ue),q.addEventListener("change",We),q.addEventListener("input",We),P.addEventListener("change",Xe),P.addEventListener("input",Xe),M.addEventListener("change",Ye),M.addEventListener("input",Ye),T.addEventListener("change",Ze),T.addEventListener("input",Ze),B.addEventListener("change",Ze),B.addEventListener("input",Ze),O.addEventListener("change",nt),O.addEventListener("input",nt),D.addEventListener("change",rt),D.addEventListener("input",rt),k.addEventListener("change",ot),k.addEventListener("input",ot),H.addEventListener("change",it),H.addEventListener("input",it),J.addEventListener("change",at),J.addEventListener("input",at),G.addEventListener("change",ut),G.addEventListener("input",ut),K.addEventListener("change",lt),K.addEventListener("input",lt),V.addEventListener("change",st),V.addEventListener("input",st),$.addEventListener("change",pt),$.addEventListener("input",pt),W.addEventListener("change",ht),W.addEventListener("input",ht),Y.addEventListener("change",dt),X.addEventListener("change",dt),ce.addEventListener("change",(function(e){var t=this.value.trim().replace(/\s+,/,",");if(/^((\d+\.)?\d+,?)+/.test(t)){var n=t.split(",").map((function(e){return parseFloat(e)})).filter((function(e){return!isNaN(e)})).sort((function(e,t){return t-e}));this.value=n.toString(),mt()}})),ue.addEventListener("change",(function(){y.curvePoints=a[this.value],le.disabled=!0,"custom"===this.value&&(le.disabled=!1),ft(),vt(),mt(),gt()})),le.addEventListener("change",(function(){var e={};Me.innerHTML="";try{e=/^{/.test(this.value.trim())?JSON.parse(this.value.trim()):JSON.parse("{"+this.value.trim().replace(/\,$/,"")+"}"),y.curvePoints=e.curvePoints,a.custom=e.curvePoints}catch(e){console.error(e),se.innerHTML=e+"<br>"}ft(),vt(),mt(),gt()})),pe.addEventListener("input",(function(e){""!==this.value.trim()?he.textContent=this.value.trim():he.textContent="none"})),de.addEventListener("click",yt),fe.addEventListener("click",yt),ve.addEventListener("click",yt),me.addEventListener("click",yt),ge.addEventListener("click",yt),_.difficulty)be[_e].addEventListener("input",bt);for(var Ee in Ce.addEventListener("change",(function(){if(this.value!==Ve){for(var e in S.colorScheme)je[e].value="",Le[e].value="#000000",xe[e].checked=!1,Re[e].style.display="none";for(var e in S.environmentColor=this.value,S.colorScheme)if(S.colorScheme[e]){var t=S.getColorHex(S.colorScheme[e]);je[e].value=t,Le[e].value=t,xe[e].checked=!!S.colorScheme[e],Re[e].style.display="block"}_t()}})),S.colorScheme)je[Ee].addEventListener("change",St),Le[Ee].addEventListener("change",Ct),xe[Ee].addEventListener("click",jt),Re[Ee].addEventListener("click",Lt),Re[Ee].style.display="none";var Ve="Custom",$e=document.createElement("option");for(var ze in $e.value=Ve,$e.textContent=Ve,Ce.append($e),s)($e=document.createElement("option")).value=ze,$e.textContent=ze,Ce.append($e);function Qe(){E.forEach((function(e){e.disabled=!1}))}function Ue(e){m.value=Math.abs(parseFloat(this.value))||0,m.value>0?(b.update(),Qe(),et(),tt(),ct(),w.textContent=t(60/m.value*1e3)+"ms"):E.forEach((function(e){e.disabled=!0})),"change"===e.type&&(this.value=m.value)}function We(e){b.precBeat=Math.abs(parseFloat(this.value))>0?Math.abs(parseFloat(this.value)):1,b.precBeat>0&&(tt(),P.value=t(b.precTime,3).toString(),M.value=t(b.precRealTime,1).toString()),"change"===e.type&&(this.value=t(b.precBeat,3).toString())}function Xe(e){b.precTime=Math.abs(parseFloat(this.value))>0?Math.abs(parseFloat(this.value)):1,b.precTime>0&&(tt(),q.value=t(b.precBeat,3).toString(),M.value=t(b.precRealTime,1).toString()),"change"===e.type&&(this.value=t(b.precTime,3).toString())}function Ye(e){b.precRealTime=Math.abs(parseFloat(this.value))>0?Math.abs(parseFloat(this.value)):1,b.precRealTime>0&&(tt(),q.value=t(b.precBeat,3).toString(),P.value=t(b.precTime,3).toString()),"change"===e.type&&(M.value=t(b.precRealTime,1).toString())}function Ze(e){"ebpm-input-ebpm-ohj"===this.id&&(b.ebpmOHJ=Math.abs(parseFloat(this.value))>0?Math.abs(parseFloat(this.value)):m.value,"change"===e.type&&(this.value=t(b.ebpmOHJ,2).toString()),B.value=t(b.ebpmStream,2).toString()),"ebpm-input-ebpm-stream"===this.id&&(b.ebpmStream=Math.abs(parseFloat(this.value))>0?Math.abs(parseFloat(this.value)):m.value,"change"===e.type&&(this.value=t(b.ebpmStream,2).toString()),T.value=t(b.ebpmOHJ,2).toString()),et()}function et(){q.value=t(b.precBeat,3).toString(),P.value=t(b.precTime,3).toString(),M.value=t(b.precRealTime,1).toString()}function tt(){T.value=t(b.ebpmOHJ,2).toString(),B.value=t(b.ebpmStream,2).toString()}function nt(e){g.njs=Math.abs(parseFloat(this.value))>0?Math.abs(parseFloat(this.value)):g.njs,ct(),"change"===e.type&&(this.value=t(g.njs,3))}function rt(e){g.offset=parseFloat(this.value)||0,ct(),"change"===e.type&&(this.value=t(g.offset,3))}function ot(e){g.offset=Math.max(Math.abs(parseFloat(this.value)),g.hjdMin)-g.calcHalfJumpDurationRaw(),D.value=t(g.offset,3).toString(),H.value=t(g.jd,3).toString(),J.value=t(1e3*g.reactTime).toString(),F.textContent=t(g.jdMin,2).toString(),"change"===e.type&&(this.value=t(g.hjd,3).toString())}function it(e){var n=Math.abs(parseFloat(this.value))>0?Math.abs(parseFloat(this.value)):g.jd;"hjd"===A.value&&(n=Math.max(n,g.jdMin),g.offset=g.calcHalfJumpDurationFromJD(n)-g.calcHalfJumpDurationRaw()),"njs"===A.value&&(g.njs=n/(2*g.calcReactionTimeHJD())),k.value=t(g.hjd,3).toString(),J.value=t(1e3*g.reactTime).toString(),F.textContent=t(g.jdMin,2).toString(),O.value=t(g.njs,3).toString(),D.value=t(g.offset,3).toString(),"change"===e.type&&(this.value=t(g.jd,2).toString())}function at(e){var n=Math.max(Math.abs(parseFloat(this.value))/1e3>0?Math.abs(parseFloat(this.value))/1e3:g.calcReactionTimeHJD(),g.calcReactionTimeHJD(g.hjdMin));g.offset=n/(60/m.value)-g.calcHalfJumpDurationRaw(),k.value=t(g.hjd,3).toString(),H.value=t(g.jd,2).toString(),F.textContent=t(g.jdMin,2).toString(),D.value=t(g.offset,3).toString(),"change"===e.type&&(this.value=t(1e3*g.reactTime).toString())}function ct(){g.update(),k.value=t(g.hjd,3).toString(),H.value=t(g.jd,2).toString(),J.value=t(1e3*g.reactTime).toString(),N.textContent=t(g.calcJumpDistanceOptimalHigh(),2).toString(),I.textContent=t(g.calcJumpDistanceOptimalLow(),2).toString(),F.textContent=t(g.jdMin,2).toString()}function ut(e){y.note=parseInt(this.value)||0,ft(),vt(),mt(),"change"===e.type&&(this.value=y.note.toString())}function lt(e){y.star=parseFloat(this.value)||0,ft(),vt(),mt(),"change"===e.type&&(this.value=t(y.star,2).toString())}function st(e){ft(),mt(),"change"===e.type&&(this.value=t(parseFloat(this.value),2).toString())}function pt(e){var n=parseInt(this.value),r=y.calcScore();V.value=t(n/r*100,2).toString(),z.value=t(y.calcPP(y.star,parseFloat(V.value)/100),2).toString(),"change"===e.type&&(this.value=n.toString())}function ht(e){vt(),"change"===e.type&&(this.value=t(parseFloat(this.value),2).toString())}function dt(e){var t=this.value.trim().replace(/\s+,/,",");if(/^((\d+\.)?\d+,?)+/.test(t)||""===t){var n=t.split(",").map((function(e){return parseInt(e)})).filter((function(e){return!isNaN(e)})).sort((function(e,t){return e-t}));this.value=n.join(",").toString(),vt()}}function ft(){$.value=t(y.calcScore()*(parseFloat(V.value)/100)).toString(),z.value=t(y.calcPP(y.star,parseFloat(V.value)/100),2).toString(),Q.textContent=n(y.calcScore()),U.textContent=n(y.calcScore())}function vt(){var e=X.value.split(",").map((function(e){return parseInt(e)}))||[],r=Y.value.split(",").map((function(e){return parseInt(e)}))||[],o=y.calcScore(),i=y.calcScore(parseFloat(W.value),void 0,e,r),a=y.calcScore(parseFloat(W.value));Z.textContent=n(t(i)),ee.textContent=t(i/o*100,2).toString(),te.textContent=t(y.calcPP(y.star,i/o),2).toString(),ne.textContent=n(t(a-i)),re.textContent=n(t(a)),oe.textContent=t(a/o*100,2).toString(),ie.textContent=t(y.calcPP(y.star,a/o),2).toString()}function mt(){ae.innerHTML="<tr><th>Percentage</th><th>Score</th><th>PP</th></tr>";for(var e=ce.value.split(",").map((function(e){return parseFloat(e)})),r=0;r<e.length;r++){var o=document.createElement("tr"),i=document.createElement("td"),a=document.createElement("td"),c=document.createElement("td");i.textContent=t(e[r],2).toString(),a.textContent=n(t(y.calcScore()*(e[r]/100))),c.textContent=t(y.calcPP(y.star,e[r]/100),2).toString(),o.appendChild(i),o.appendChild(a),o.appendChild(c),ae.appendChild(o)}}function gt(){var e={curvePoints:v([],y.curvePoints).reverse()};le.value=JSON.stringify(e,null,4)}function bt(e){var n=this.id.slice(10);_.difficulty[n]=this.value?Math.abs(parseFloat(this.value.trim())):null;var r=null;for(var o in _.difficulty)null!==_.difficulty[o]&&(null!==r&&(ye[r].textContent=(0!==_.difficulty[o]?_.calcDifference(o,r).toFixed(2):"Infinity")+"%"),r=o),ye[o].textContent="";Se.textContent=_.getTotalReduction().toFixed(2)+"%","change"===e.type&&null!==_.difficulty[n]&&(this.value=t(_.difficulty[n],2).toString())}function yt(e){he.className="diff-label diff-count-"+parseInt(this.value)}function _t(){var e={};for(var t in S.colorScheme)xe[t].checked&&(e[t]=S.colorScheme[t]);Pe.value=JSON.stringify(e,null,4)}function St(){if(/^\#?[0-9a-fA-F]{6,8}/.test(this.value.trim())){var e="_"+this.id.slice(13);for(var t in S.colorScheme)e===t.toLowerCase()&&(e=t);var n=this.value.trim().replace(/^\#?/,"#").slice(0,7);S.colorScheme[e]=S.hexToRGB(n),je[e].value=n,Le[e].value=n,xe[e].checked=!0,Re[e].style.display="block",_t()}}function Ct(){var e="_"+this.id.slice(16);for(var t in S.colorScheme)e===t.toLowerCase()&&(e=t);S.colorScheme[e]=S.hexToRGB(this.value),je[e].value=this.value,xe[e].checked=!0,Re[e].style.display="block",_t()}function jt(){var e="_"+this.id.slice(17);for(var t in S.colorScheme)e===t.toLowerCase()&&(e=t);this.checked&&(S.colorScheme[e]=S.hexToRGB(Le[e].value),je[e].value=Le[e].value,Re[e].style.display="block"),_t()}function Lt(){var e="_"+this.id.slice(15);for(var t in S.colorScheme)e===t.toLowerCase()&&(e=t);S.colorScheme[e]=null,je[e].value="",Le[e].value="#000000",xe[e].checked=!1,Re[e].style.display="none",_t()}function xt(){Oe.innerHTML="";for(var e=0;e<C.row;e++){for(var t=document.createElement("tr"),n=0;n<C.column;n++){var r=document.createElement("td");r.className="table-grid";var o=document.createElement("img");o.className="table-rpattern-image",o.src="./assets/"+h.blank,o.alt=h.blank.slice(0,-4),r.appendChild(o),t.appendChild(r)}Oe.appendChild(t)}}Pe.addEventListener("change",(function(){for(var e in S.colorScheme)je[e].value="",Le[e].value="#000000",xe[e].checked=!1,Re[e].style.display="none";Me.innerHTML="";var t=["_colorLeft","_colorRight","_envColorLeft","_envColorRight","_envColorLeftBoost","_envColorRightBoost","_obstacleColor"],n={};try{n=/^{/.test(this.value.trim())?JSON.parse(this.value.trim()):JSON.parse("{"+this.value.trim().replace(/\,$/,"")+"}")}catch(e){console.error(e),Me.innerHTML=e+"<br>"}for(var e in n)if(t.includes(e)){S.colorScheme[e]=n[e];var r=S.getColorHex(n[e]);je[e].value=r,Le[e].value=r,xe[e].checked=!0,Re[e].style.display="block"}_t()})),Te.addEventListener("click",(function(){var e=Math.min(Math.abs(parseFloat(this.value))||1,4);this.value=e,C.row=e,xt()})),Be.addEventListener("click",(function(){var e=Math.min(Math.abs(parseFloat(this.value))||1,8);this.value=e,C.column=e,xt()})),Ke.addEventListener("click",(function(){var e=document.querySelectorAll(".table-rpattern-image");e.forEach((function(e){e.src="./assets/blank.png",e.alt="blank",e.className="table-rpattern-image"})),C.noteRed=parseInt(De.value)||0,C.noteBlue=parseInt(ke.value)||0,C.noteBomb=parseInt(He.value)||0,C.noDot=we.checked,C.limit=Je.checked,C.total=parseInt(Fe.value)||0,C.parity=Ne.checked,C.parityExtend=parseInt(Ie.value)||0,C.parityRed=Ae.checked,C.parityBlue=Ge.checked;for(var t=C.generate(),n=0;n<t.length;n++)null!==t[n]&&(e[n].src="./assets/"+(8!==t[n]._noteDirection||we.checked?h[t[n]._noteType]:h[t[n]._noteType+3]),e[n].alt=h[t[n]._noteType].slice(0,-4),8!==t[n]._noteDirection&&(e[n].className+=" "+d[t[n]._noteDirection],e[n].alt+=" "+d[t[n]._noteDirection]))}))})();