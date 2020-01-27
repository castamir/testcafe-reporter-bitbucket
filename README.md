# testcafe-reporter-bitbucket

This is the **xUnit** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe) compatible with Bitbucket pipelines.

<p align="center">
    <img src="https://raw.github.com/castamir/testcafe-reporter-bitbucket/master/media/preview.png" alt="preview" />
</p>

## Install

Run the following command.

```
npm install testcafe-reporter-bitbucket
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter bitbucket
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('bitbucket') // <-
    .run();
```
