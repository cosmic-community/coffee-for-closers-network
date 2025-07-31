import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { verifyPassword } from '@/lib/password'
import { getUserByEmail, updateUser } from '@/lib/cosmic'
import { AuthUser } from '@/types'

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
          // Find user by email
          const user = await getUserByEmail(credentials.email.toLowerCase())

          if (!user || !user.metadata.active_member) {
            return null
          }

          // Verify password
          const isValidPassword = await verifyPassword(
            credentials.password,
            user.metadata.password_hash
          )

          if (!isValidPassword) {
            return null
          }

          // Update last active date
          try {
            await updateUser(user.id, {
              metadata: {
                ...user.metadata,
                last_active: new Date().toISOString().split('T')[0] || ''
              }
            })
          } catch (error) {
            console.error('Failed to update last active:', error)
            // Don't fail the login for this
          }

          const userRole = typeof user.metadata.role === 'string' 
            ? user.metadata.role 
            : user.metadata.role?.value || 'member'

          return {
            id: user.id,
            email: user.metadata.email,
            name: user.metadata.full_name,
            role: userRole,
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || '',
}

export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === 'admin'
}

export function isMember(user: AuthUser | null): boolean {
  return user?.role === 'member' || user?.role === 'admin'
}