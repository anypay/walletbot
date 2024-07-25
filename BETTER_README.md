![](https://plugins.whatsonchain.com/api/plugin/main/ea8205469186c12f6b23866d3ef50ab84f6f6b82dab43075e0229ab32ca6f5bc/0)


[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/anypay/walletbot)
![GitHub Release](https://img.shields.io/github/v/release/anypay/walletbot)
![Docker Image Pulls](https://img.shields.io/docker/pulls/anypay/walletbot.svg)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/anypay/walletbot/total)
![NPM Downloads](https://img.shields.io/npm/dy/%40anypay%2Fwalletbot)


# 🤖 Wallet Bot

### 💼 Repository Description:

Welcome to Wallet Bot, your trusty service for apps that pay coins! 🚀 This daemon process is your go-to solution for managing private keys within your data center, ensuring your software operations can securely send payments across any peer-to-peer payments network via API. 💸

Users of wallet bot make calls to the Anypay API to create new payments, and their wallet bot daemon fulfills those payments in the background. In this way Wallet Bot users both operate the walletbot server and make calls with walletbot clients.

### 📂 Project Organization:
This project is organized into the following directories and files:

```
├── src/ 
│   ├── simple-wallet/
│   ├── server/
│   ├── websockets/
│   └── wallet_bot.ts
│   └── index.ts
│   └── main.ts
├── __tests__/
│   └── *_test.ts
├── package.json
└── app.json

```
- `src/simple-wallet/`: Contains typescript framework for a wallet with many asset-specific implementations under src/simple-wallet/src/assets
- `src/server/`: Contains optional HTTP API server for direct communication with wallet bot daemon from your apps. Also optionally configures prometheus for metrics and loki for logging.
- `src/websockets/`: Manages websockets connection session to real-time Anypay backend services.
- `__tests__`: Tests are written with mocha and typescript
- `app.json`: Configures "Deploy to Heroku" button for running walletbot and the Heroku app platform




### 🚀 First Time Set-up:

#### Docker 🐳
**Note**: Currently only published for x86_64 architecture, not ARM.

```bash
docker pull anypay/walletbot:latest
docker run anypay/walletbot
```

🔗 [Here is a full list of available docker image tags](https://hub.docker.com/r/anypay/walletbot/tags)

#### Homebrew 🍺

```bash
brew tap anypay/walletbot
brew install walletbot
walletbot
```

To upgrade when a new version is released, run the following command:

```bash
brew reinstall walletbot
```

#### NPM & Yarn 📦

Using npm:

```bash
npm install --global @anypay/walletbot
walletbot
```

Or with yarn:

```bash
yarn global add @anypay/walletbot
walletbot
```

Ensure to pick the installation method that best fits your workflow. Enjoy using Walletbot! 🎉
### Testing:

To run the test cases run the following command:

```
npm test
```

### Persistent Environments:

This application connects to the Anypay back end services. An instance of Wallet Bot is also deployed in production and staging environments as an live example.

- Anypay Websockets Production: `wss://wss.anypayx.com`
- Anypay API Production: `https://api.anypayx.com`

### Deployment:

### Debugging and Troubleshooting:

There are several options for debugging and troubleshooting, including reading the log which are written to stdout in json format, configuring the logger to push logs directly to a loki logging server host, scrape metrics using prometheus, or directly modify the code to log in more detail.

### Code Style and Standards:

Certainly! Here's an elaboration of the "Code Style and Standards" section for your README:

---

### Code Style and Standards

This project follows a consistent code style enforced by Prettier. Prettier is a code formatter that ensures your codebase maintains a uniform style, making it easier to read and maintain.

#### Using Prettier

Before committing any changes to the repository, it's essential to run Prettier to format your code according to the project's standards. You can do this by executing the following command in your terminal:

```bash
npm run prettier
```

This command runs Prettier across your entire codebase, formatting all files according to the rules specified in the project's configuration. It's a good practice to run this command before each commit to ensure that your changes adhere to the established code style guidelines.

#### Configuration

The Prettier configuration for this project is defined in the `.prettierrc` file located in the root directory. This file specifies various formatting options, such as indentation, line length, and quotation style, to maintain consistency throughout the codebase. If you need to customize the formatting rules, you can modify this configuration file accordingly.

#### Integrating with Your Editor

To streamline the development process, you can integrate Prettier with your code editor. Many popular editors, such as Visual Studio Code, Sublime Text, and Atom, offer extensions or plugins that automatically format your code using Prettier as you type. This helps you maintain a consistent code style in real-time, reducing the need for manual formatting.

#### Additional Resources

- [Prettier Documentation](https://prettier.io/docs/en/index.html): Learn more about Prettier and its configuration options.
- [Editor Integrations](https://prettier.io/docs/en/editors.html): Find instructions for integrating Prettier with your preferred code editor.


### Contribution Guidelines:

Sure, here's the modified list of commands using Git and GitHub CLI (`gh`) with `github.com/anypay/walletbot#main` as the base (upstream) repository and branch:

1. **Fork the Repository**:
   
   ```bash
   gh repo fork anypay/walletbot
   ```

2. **Clone the Forked Repository**:

   ```bash
   git clone <your-fork-url>
   ```

   Replace `<your-fork-url>` with the URL of your forked repository.

3. **Navigate to the Cloned Repository**:

   ```bash
   cd <cloned-repo-directory>
   ```

   Replace `<cloned-repo-directory>` with the directory where the repository was cloned.

4. **Checkout a New Branch**:

   ```bash
   git checkout -b <branch-name>
   ```

   Replace `<branch-name>` with a descriptive name for your new branch.

5. **Make Changes to the Code**:

   Modify the files in your local repository as needed.

6. **Stage and Commit Changes**:

   ```bash
   git add .
   git commit -m "Your commit message"
   ```

   Replace `"Your commit message"` with a meaningful description of the changes you made.

7. **Push Changes to Your Fork**:

   ```bash
   git push origin <branch-name>
   ```

   Replace `<branch-name>` with the name of the branch you created.

8. **Create a Pull Request**:

   ```bash
   gh pr create --base main --head <your-branch>
   ```

   Replace `<your-branch>` with the name of your branch.

9. **Follow the Prompt to Create the Pull Request**:

   The `gh pr create` command will open a text editor where you can provide additional details for your pull request. Follow the instructions provided and save your changes to submit the pull request.

That's it! You've now modified and submitted contributions to the upstream repository using Git and the GitHub CLI (`gh`).


### License Information:

### Status and Roadmap: