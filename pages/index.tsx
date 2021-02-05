import { Box } from "../components/Box";
import { Spacer } from "../components/Spacer";
import { BeatsInput } from "../components/BeatsInput";
import { PageHeader } from "../components/PageHeader";

export default function Home() {
  return (
    <>
      <Spacer size={50} />
      <Box size={1280} gap={16}>
        <PageHeader />
        <Spacer size={16} />
        <BeatsInput />
      </Box>
    </>
  );
}
