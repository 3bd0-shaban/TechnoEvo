export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container max-w-[105rem] px-0">{children}</div>
    </>
  );
}
