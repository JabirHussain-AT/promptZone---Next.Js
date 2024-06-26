import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";


import User from '@models/user'
import { connectToDb } from "@utils/database";

const handler = NextAuth({

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  async session({ session }) {
        const sessionUser = await User.findOne({
            email : session.user.email 
        })

        session.user.id = session._id.toString();
        return session
  },

  async signIn({ profile }) {
    try {

      await connectToDb();

      //check if a user is already exists
        const userExists = await User.findOne({ email : profile.email })
      //if not , create new user
      if( !userExists ){
        await User.create({
            email : profile.email ,
            username : profile.name.replace(" ",'').toLowercase(),
            image : profile.picture
        })
      }

      return true;

    } catch (err) {
      console.log(err);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
