import { PiecesPage } from "@/containers/pieces/page";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { selected, player } = await searchParams;

  console.log("selected", selected, "player", player);

  return <PiecesPage />;
};

export default Page;
