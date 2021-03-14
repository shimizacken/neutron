import { createNeutron } from "../neutron";

describe("neutron test suite", () => {
  it("should return", () => {
    const colorsNeutron = createNeutron<string>();

    expect(colorsNeutron).toMatchSnapshot();
  });
});
