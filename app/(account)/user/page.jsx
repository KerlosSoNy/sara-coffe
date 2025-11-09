import { Suspense } from "react";
import UserClient from "./UserClient"; // or "./User" if you renamed it that way

export default function UserPage() {
  return (
    <Suspense fallback={null}>
      <UserClient />
    </Suspense>
  );
}
