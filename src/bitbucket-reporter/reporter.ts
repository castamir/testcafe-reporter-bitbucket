export const bitbucketReporter = () => {
  return {
    noColors: true,
    report: "",
    startTime: null,
    uaList: null,
    currentFixtureName: null,
    testCount: 0,
    skipped: 0,

    reportTaskStart(startTime, userAgents, testCount) {
      this.startTime = startTime;
      this.uaList = userAgents.join(", ");
      this.testCount = testCount;
    },

    reportFixtureStart(name) {
      // @ts-ignore
      this.currentFixtureName = this.escapeHtml(name);
    },

    _renderErrors(errs) {
      // @ts-ignore
      this.report += this.indentString("<failure>\n", 4);
      // @ts-ignore
      this.report += this.indentString("<![CDATA[", 4);

      errs.forEach((err, idx) => {
        // @ts-ignore
        err = this.formatError(err, `${idx + 1}) `);

        this.report += "\n";
        // @ts-ignore
        this.report += this.indentString(err, 6);
        this.report += "\n";
      });

      // @ts-ignore
      this.report += this.indentString("]]>\n", 4);
      // @ts-ignore
      this.report += this.indentString("</failure>\n", 4);
    },

    reportTestDone(name, testRunInfo) {
      var hasErr = !!testRunInfo.errs.length;

      if (testRunInfo.unstable) {
        name += " (unstable)";
      }

      if (testRunInfo.screenshotPath) {
        name += ` (screenshots: ${testRunInfo.screenshotPath})`;
      }

      // @ts-ignore
      name = this.escapeHtml(name);

      var openTag =
        `<testcase classname="${this.currentFixtureName}" ` +
        `name="${name}" time="${testRunInfo.durationMs / 1000}">\n`;

      // @ts-ignore
      this.report += this.indentString(openTag, 2);

      if (testRunInfo.skipped) {
        this.skipped++;
        // @ts-ignore
        this.report += this.indentString("<skipped/>\n", 4);
      } else if (hasErr) {
        this._renderErrors(testRunInfo.errs);
      }

      // @ts-ignore
      this.report += this.indentString("</testcase>\n", 2);
    },

    _renderWarnings(warnings) {
      // @ts-ignore
      this.setIndent(2)
        .write("<system-out>")
        .newline()
        .write("<![CDATA[")
        .newline()
        .setIndent(4)
        .write(`Warnings (${warnings.length}):`)
        .newline();

      warnings.forEach(msg => {
        // @ts-ignore
        this.setIndent(4)
          .write("--")
          .newline()
          .setIndent(0)
          // @ts-ignore
          .write(this.indentString(msg, 6))
          .newline();
      });

      // @ts-ignore
      this.setIndent(2)
        .write("]]>")
        .newline()
        .write("</system-out>")
        .newline();
    },

    reportTaskDone(endTime, passed, warnings) {
      // @ts-ignore
      var name = `TestCafe Tests: ${this.escapeHtml(this.uaList)}`;
      var failures = this.testCount - passed;
      // @ts-ignore
      var time = (endTime - this.startTime) / 1000;

      // @ts-ignore
      this.write('<?xml version="1.0" encoding="UTF-8" ?>')
        .newline()
        .write(
          `<testsuite name="${name}" tests="${this.testCount}" failures="${failures}" skipped="${this.skipped}"` +
            ` errors="0" time="${time}" timestamp="${endTime.toUTCString()}" >`
        )
        .newline()
        .write(this.report);

      if (warnings.length) {
        this._renderWarnings(warnings);
      }

      // @ts-ignore
      this.setIndent(0).write("</testsuite>");
    }
  };
};
