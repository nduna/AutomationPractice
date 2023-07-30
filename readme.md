# README: Running TestCafe Code Locally

This repository contains TestCafe tests for the Automation Practice website. Follow the steps below to run the TestCafe tests locally.

## Prerequisites

- Node.js and npm (Node Package Manager) must be installed on your machine. You can download Node.js from the official website: [https://nodejs.org/](https://nodejs.org/)

## Getting Started

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of your project and define any environment variables that your tests require. For example, you can set the base URL of the website:

   ```
   BASE_URL=https://example.com
   ```

## Running the TestCafe Tests

To execute the TestCafe tests, use the following command:

```bash
npx testcafe <browser> test/*.js --config testcafe.config.js --reporter html:reports/reportname.html
```

- Replace `<browser>` with the browser you want to run the tests on (e.g., `chrome`, `firefox`, `edge`, etc.).
- The `test/*.js` pattern specifies the location of the test files. Adjust the path if your test files are located in a different directory.
- The `--config testcafe.config.js` option allows you to use the configuration settings defined in the `testcafe.config.js` file.
- The `--reporter html:reports/reportname.html` option specifies that TestCafe should generate an HTML report for the test results and save it in the `reports` directory.

For example, to run the tests in Chrome and generate an HTML report named `report.html`, use:

```bash
npx testcafe chrome test/*.test.js --config testcafe.config.js --reporter html:reports/report.html
```

## Available Test Files

This repository contains the following TestCafe test files:

1. `sample-test.js` - Contains basic tests for radio buttons, suggestion field, checkboxes, show/hide elements, web table, and iframe interactions.

## Customizing Test Parameters

You can customize test parameters, such as the URL of the website to be tested or the test data, by modifying the test files in the `test` directory, or by editing the .env.

## TestCafe Configuration

The TestCafe configuration settings can be found in the `testcafe.config.js` file. Feel free to adjust the configuration as per your testing requirements.

## Reporting

TestCafe generates HTML reports for the test results. The reports are saved in the `reports` directory.

## Troubleshooting

If you encounter any issues while running the tests, ensure that the required dependencies are installed and the website under test is accessible.

## License

Happy testing!
