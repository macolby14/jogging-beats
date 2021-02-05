import { Heading } from "./Heading";

export function PageHeader() {
  return (
    <>
      <Heading level={1} weight={700}>
        <em>Jogging</em> Beats
      </Heading>
      <Heading level={4}>
        Find the perfect playlist for your run or ride
      </Heading>
    </>
  );
}
