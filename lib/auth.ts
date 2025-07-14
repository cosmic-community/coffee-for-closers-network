import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserBySlug } from '@/lib/cosmic'
import { User, AuthUser } from '@/types'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // For demo purposes, we'll use a simple email-based lookup
          // In production, you'd implement proper password hashing and validation
          const emailSlug = credentials.email.split('@')[0].toLowerCase()
          const user = await getUserBySlug(emailSlug)

          if (!user || !user.metadata.active_member) {
            return null
          }

          return {
            id: user.id,
            email: user.metadata.email,
            name: user.metadata.full_name,
            role: user.metadata.role.key,
            cosmicId: user.id
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as AuthUser).role
        token.cosmicId = (user as AuthUser).cosmicId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
        (session.user as any).cosmicId = token.cosmicId
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === 'admin'
}

export function isMember(user: AuthUser | null): boolean {
  return user?.role === 'member' || user?.role === 'admin'
}