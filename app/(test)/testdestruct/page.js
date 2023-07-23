const member={
    id:1,
    name:{
        firstName:'Mark',
        lastName:'Xie'
    }
}

const {id, name:{firstName,lastName}}=member
console.log(id, firstName, lastName)