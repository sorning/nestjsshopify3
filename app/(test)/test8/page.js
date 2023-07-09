export const fun1=(query,variables)=>{
    const fecthUrl=1
    const value=fecthUrl+query+variables
    console.log(query)
    console.log(value)
    return value
}

export default function fun2(query,variables){
    const query1=2
    const value2=fun1(query1,query1)
    return value2
}
