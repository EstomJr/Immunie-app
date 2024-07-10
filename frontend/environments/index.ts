export interface Env
{
    NEXT_PUBLIC_URL: string
}

export const env: Env = {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || 'http://localhost:5000/'
}