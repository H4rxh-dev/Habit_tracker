import { createContext, useState } from "react";


export const Themecontext=createContext({
    currentheme:"light",
    toggletheme:()=>{}
})


 export const Theeprovider=({children})=>{
const[theme,settheme]=useState("light")


const toggletheme=(newtheme)=>{
settheme(newtheme)
}


return(
<Themecontext value={{currentheme:theme,toggletheme}}>
{children}
</Themecontext>


 )



 }