import createCallSiteRecord from "callsite-record";

function someFunc() {
  throw new Error("Hey ya!");
}

let result;

try {
  someFunc();
} catch (err) {
  result = createCallSiteRecord(err);
}

export default result;
