const mongoose=require('mongoose')
const url='mongodb://localhost/User'

mongoose.connect(url)
.then((result) => {
    console.log('Db Connected')
}).catch((err) => {
    console.log(err)
});