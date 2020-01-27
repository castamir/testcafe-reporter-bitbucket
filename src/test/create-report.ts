import testcafe from "testcafe";

import reporterTestCalls from "./reporter-test-calls";
import pluginFactory from "../index";

// @ts-ignore - this is not exposed in official typings
const buildReporterPlugin = testcafe.embeddingUtils.buildReporterPlugin;

export default function createReport(withColors) {
  const outStream = {
    data: "",

    write: function(text) {
      this.data += text;
    }
  };

  const plugin = buildReporterPlugin(pluginFactory, outStream);

  plugin.chalk.enabled = !plugin.noColors && withColors;
  plugin.symbols = { ok: "✓", err: "✖" };

  reporterTestCalls.forEach(function(call) {
    plugin[call.method].apply(plugin, call.args);
  });

  // NOTE: mock stack entries
  return outStream.data.replace(/\s*?\(.+?:\d+:\d+\)/g, " (some-file:1:1)");
}
