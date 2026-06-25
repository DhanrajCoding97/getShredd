import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="px-4 min-h-14 w-full flex flex-col justify-center items-center">
        <Link href="/" className="">GetShredd</Link>
      </nav>

      {children}
    </>
  );
}