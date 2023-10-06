import "./globals.scss"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nextjs OTP auth example",
  description: "Nextjs OTP auth example",
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout;
