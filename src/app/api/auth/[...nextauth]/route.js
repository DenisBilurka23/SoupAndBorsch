import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import {connectDB} from '../../../../../lib/mongodb'
import UserModel from '../../../../../models/userModel'
import {compare} from 'bcryptjs'
import {userDto} from "../../../utils/helpers";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            authorize: async credentials => {
                await connectDB()
                const user = await UserModel.findOne({email: credentials.email})
                if (!user) {
                    return null
                }
                const isPasswordValid = await compare(credentials.password, user.password)
                return isPasswordValid ? user : null
            }
        })
    ],
    callbacks: {
        jwt: async ({token, user}) => {
            if (user) {
                token.sub = user.id
            }
            return token
        },
        session: async ({session, token}) => {
            const user = await UserModel.findById(token.sub)
            const userData = userDto(user)
            session.user = {...userData, id: token.sub}
            return session
        }
    },

    session: {strategy: 'jwt'},
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in',
        signUp: '/sign-up'
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
