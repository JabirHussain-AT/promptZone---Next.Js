"use client";

import { SessionProvider  } from 'next-auth/react'

const Provaider = ({children , session }) => {
  return (
    < SessionProvider session={session}>
    { children }
    </SessionProvider>
  )
}

export default Provaider