import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import {connectDB} from '../../../../../lib/mongodb'
import UserModel from '../../../../../models/userModel'
import {compare} from 'bcryptjs'

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
            const userDto = {
                phoneNumber: user?.phoneNumber,
                email: user?.email,
                name: user?.name,
                fullName: user?.fullName,
                streetAddress: user?.streetAddress,
                apt: user?.apt,
                city: user?.city,
                postalCode: user?.postalCode,
                profilePhoto: user?.profilePhoto
            }
            session.user = {...userDto, id: token.sub}
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
