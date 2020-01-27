import normalizeNewline from "normalize-newline";

import createReport from "../test/create-report";

describe("bitbucket reporter", () => {
  it("should produce report with colors", function() {
    let report = createReport(true);
    report = normalizeNewline(report).trim();

    expect(report).toMatchSnapshot();
  });

  it("should produce report without colors", function() {
    let report = createReport(false);
    report = normalizeNewline(report).trim();

    expect(report).toMatchSnapshot();
  });
});
