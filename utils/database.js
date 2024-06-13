import mongoose from "mongoose";

let isConnected = false // track the connection status 

export const connectToDb  = async () =>{
    mongoose.set('strictQuery', true) 

    if( isConnected ){
        console.log( ' MongoDb is already connected ✔')
        return; 
    }

    //establishing connection with the database   : - 

    try{
            await mongoose.connect( process.env.MONGODB_URI , {
                dbName : 'share_prompt' , 
                useNewUrlParser : true , 
                useUnifiedTopology : true
            } )

            isConnected = true 
            console.log('MongoDb is  connected successfully ')
    }catch( err ){
        console.log( err?.message )
    }
}