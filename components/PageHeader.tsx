import { Heading } from "./Heading";

export function PageHeader() {
  return (
    <>
      <Heading level={1} weight={700}>
        Jogging Beats
      </Heading>
      <Heading level={4}>
        <em>Create the perfect playlist on demand for your run or ride</em>
      </Heading>
    </>
  );
}
