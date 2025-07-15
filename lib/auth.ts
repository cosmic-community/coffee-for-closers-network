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
          const emailSlug = credentials.email.split('@')[0]?.toLowerCase().replace(/[^a-z0-9]/g, '-')
          if (!emailSlug) {
            return null
          }

          const user = await getUserBySlug(emailSlug)

          if (!user || !user.metadata.active_member) {
            return null
          }

          return {
            id: user.id,
            email: user.metadata.email,
            name: user.metadata.full_name,
            role: user.metadata.role.key || user.metadata.role,
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
        (session.user as any).role = token.role as string
        (session.user as any).cosmicId = token.cosmicId as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
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