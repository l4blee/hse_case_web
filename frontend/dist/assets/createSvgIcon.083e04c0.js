import{y as s,z as u,c as i,m as l,r as d,S as g,i as m,t as f}from"./index.8af2b38c.js";import{g as S,a as h,c as r,s as v}from"./Container.e3f5c66c.js";import{c as x,b as p}from"./Box.5a30774a.js";const z=s();function C(e){return h("MuiSvgIcon",e)}S("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const y=f("<title></title>"),I=x()({name:"MuiSvgIcon",selfPropNames:["children","classes","color","fontSize","htmlColor","inheritViewBox","shapeRendering","titleAccess","viewBox"],propDefaults:({set:e})=>{const t=u(z);return e({component:"svg",color:"inherit",get fontSize(){return t?.fontSize??"medium"},inheritViewBox:!1,viewBox:"0 0 24 24"})},utilityClass:C,slotClasses:e=>({root:["root",e.color!=="inherit"&&`color${r(e.color)}`,`fontSize${r(e.fontSize)}`]})}),w=v("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.color!=="inherit"&&t[`color${r(o.color)}`],t[`fontSize${r(o.fontSize)}`]]}})(({theme:e,ownerState:t})=>({userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:"currentColor",flexShrink:0,transition:e.transitions?.create?.("fill",{duration:e.transitions?.duration?.shorter}),fontSize:{inherit:"inherit",small:e.typography?.pxToRem?.(20)||"1.25rem",medium:e.typography?.pxToRem?.(24)||"1.5rem",large:e.typography?.pxToRem?.(35)||"2.1875"}[t.fontSize],color:e.palette?.[t.color]?.main??{action:e.palette?.action?.active,disabled:e.palette?.action?.disabled,inherit:void 0}[t.color]})),$=I.component(function({allProps:t,props:o,otherProps:n,classes:a}){return i(w,l({get["aria-hidden"](){return o.titleAccess?void 0:!0},get role(){return o.titleAccess?"img":void 0},get viewBox(){return o.inheritViewBox?void 0:o.viewBox}},{focusable:"false"},{get color(){return o.htmlColor}},n,{get class(){return p(a.root,n.class)},ownerState:t,get children(){return[d(()=>o.children),i(g,{get when(){return!!o.titleAccess},get children(){const c=y.cloneNode(!0);return m(c,()=>o.titleAccess),c}})]}}))});function A(e,t){return n=>i($,l({"data-testid":`${t}Icon`},n,{children:e}))}export{A as c};