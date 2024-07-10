export interface Env
{
    NEXT_PUBLIC_URL: string
}

export const env: Env = {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || 'https://immunie-api-v6gs.onrender.com'
}