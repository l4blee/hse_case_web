import{g as h,a as c,c as g,s as m}from"./Container.ae59540f.js";import{c as y,j as u,b as d}from"./Box.ebdae987.js";import{m as i,c as f}from"./index.b496f06c.js";function v(a){return c("MuiTypography",a)}h("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);const b=y()({name:"MuiTypography",selfPropNames:["align","children","classes","gutterBottom","noWrap","paragraph","variant","variantMapping"],propDefaults:({set:a})=>a({align:"inherit",gutterBottom:!1,noWrap:!1,paragraph:!1,variant:"body1",variantMapping:{}}),utilityClass:v,slotClasses:a=>({root:["root",a.variant,a.align!=="inherit"&&`align${g(a.align)}`,a.gutterBottom&&"gutterBottom",a.noWrap&&"noWrap",a.paragraph&&"paragraph"]})}),T=m("span",{name:"MuiTypography",slot:"Root",overridesResolver:(a,r)=>{const{ownerState:t}=a;return[r.root,t.variant&&r[t.variant],t.align!=="inherit"&&r[`align${g(t.align)}`],t.noWrap&&r.noWrap,t.gutterBottom&&r.gutterBottom,t.paragraph&&r.paragraph]}})(({theme:a,ownerState:r})=>({margin:0,color:r.color,...r.variant&&a.typography[r.variant],...r.align!=="inherit"&&{textAlign:r.align},...r.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},...r.gutterBottom&&{marginBottom:"0.35em"},...r.paragraph&&{marginBottom:16}})),x={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},B={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},C=a=>B[a]||a,M=b.component(function({allProps:r,classes:t,otherProps:o,props:n}){const s=()=>o.component||(n.paragraph?"p":n.variantMapping[n.variant]||x[n.variant])||"span",e=i(()=>{const p=C(r.color);return p?{color:p}:{}}),l=i(r,e);return o=u(i(o,e)),f(T,i(o,{get component(){return s()},ownerState:l,get class(){return d(t.root,o.class)},get children(){return n.children}}))}),U=M;export{U as T};
