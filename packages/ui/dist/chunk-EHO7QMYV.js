'use strict';var lucideReact=require('lucide-react'),react=require('react'),jsxRuntime=require('react/jsx-runtime');var P=react.forwardRef(({icon:n,color:f="#6366f1",label:p,error:t,variant:e="standard",type:b="text",value:o="",onChange:u,onClear:l,placeholder:h,disabled:d,className:x="",kd:m={},...$},y)=>{let[i,c]=react.useState(false),k=s=>{u&&u(s.target.value);},a=i||o&&o.toString().length>0,v=()=>{let s="block w-full text-sm transition-all outline-none dark:text-white";switch(e){case "filled":return `${s} pt-6 pb-3 px-4 bg-slate-100 dark:bg-slate-800 border-b-2 border-transparent rounded-t-xl focus:bg-slate-50 dark:focus:bg-slate-900 focus:border-[var(--highlight)] ${t?"border-red-400 bg-red-50 dark:bg-red-950/20":""}`;case "underlined":return `${s} pt-6 pb-3 bg-transparent border-b-2 border-slate-200 dark:border-slate-800 rounded-none px-0 focus:border-[var(--highlight)] focus:ring-0 ${t?"border-red-400":""}`;default:return `${s} py-3.5 px-4 bg-white dark:bg-slate-900 border rounded-xl 
          ${t?"border-red-400 focus:border-red-500 ring-0 focus:ring-2 focus:ring-red-500/10":"border-slate-200 dark:border-slate-800 focus:border-[var(--highlight)] ring-0 focus:ring-2 focus:ring-[var(--highlight)]/20"}`}};return jsxRuntime.jsxs("div",{className:`flex flex-col gap-1 w-full ${x}`,style:{"--highlight":f},children:[jsxRuntime.jsxs("div",{className:"relative flex items-center group",children:[p&&jsxRuntime.jsx("label",{className:`
              absolute pointer-events-none transition-all duration-200 ease-in-out z-20
              ${a?`text-[10px] font-bold uppercase tracking-wider ${t?"text-red-500":"text-[var(--highlight)]"}`:"text-sm font-medium text-slate-400"}
              
              /* Alineaci\xF3n Horizontal: Uniforme en standard y filled */
              ${e==="underlined"?"left-0":"left-4"}

              /* Posicionamiento Vertical */
              ${e==="standard"?a?"-top-2 px-1.5 bg-white dark:bg-slate-900 translate-x-[-4px]":"top-1/2 -translate-y-1/2":a?"top-1.5":"top-[31px] -translate-y-1/2"}

              /* Ajuste por Icono cuando NO flota */
              ${!a&&n?"pl-7":""}
            `,children:p}),n&&jsxRuntime.jsx("div",{className:`absolute flex items-center pointer-events-none transition-colors duration-200 z-10
            ${e==="underlined"?"left-0":"left-4"}
            ${e==="standard"?"top-1/2 -translate-y-1/2":"top-[31px] -translate-y-1/2"}
            ${t?"text-red-400":i?"text-[var(--highlight)]":"text-slate-400"}`,children:jsxRuntime.jsx(n,{className:"w-4 h-4"})}),jsxRuntime.jsx("input",{ref:y,type:b,value:o,onFocus:()=>c(true),onBlur:()=>c(false),onChange:k,disabled:d,placeholder:i&&a?h:"",style:{...m},className:`
            ${v()}
            ${d?"opacity-50 cursor-not-allowed":""}
            /* Padding Left: alineado con el icono */
            ${n?e==="underlined"?"pl-7":"pl-11":e==="underlined"?"pl-0":"pl-4"}
            ${l?"pr-10":"pr-4"}
            relative z-0
          `,...$}),o&&l&&!d&&jsxRuntime.jsx("button",{type:"button",onClick:l,className:`absolute right-0 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-20
              ${e==="underlined"?"pr-0 top-[31px] -translate-y-1/2":"pr-3 top-1/2 -translate-y-1/2"}`,children:jsxRuntime.jsx(lucideReact.X,{className:"w-4 h-4"})})]}),t&&jsxRuntime.jsx("span",{className:"text-[10px] font-bold text-red-500 ml-1 uppercase tracking-tight animate-in slide-in-from-top-1 duration-200",children:t})]})});P.displayName="Input";exports.a=P;//# sourceMappingURL=chunk-EHO7QMYV.js.map
//# sourceMappingURL=chunk-EHO7QMYV.js.map