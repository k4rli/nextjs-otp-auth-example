import Link from "next/link";
import withValidatedSessionId from "@/auth/withValidatedSessionId";

const AdminPage = () => {
  return (
    <div>
      <h1>This page is protected by Middleware</h1>
      <p>Only admin users can see this page.</p>
      <Link href="/">Home page</Link>
    </div>
  )
}

export default withValidatedSessionId(AdminPage);
