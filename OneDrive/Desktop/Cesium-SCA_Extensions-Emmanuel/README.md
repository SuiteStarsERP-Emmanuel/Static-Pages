# Cesium Extensions

This step is only required when you want to develop extensions.

## Environment setup

### Install Node

Install Node.js version 12.21.0 on your local.

### Install Gulp

Open a command line or terminal window and Enter the following command:
```
npm install --global gulp
```
To verify that Gulp.js was installed correctly, enter the following command:
```
gulp -v
```
### Setup for code linting
```
npm install --save-dev eslint
npm install --save-dev eslint-config-prettier
npm install --save-dev prettier
```

## Development on your local environment

### Setup Theme Developer Tools

1. Extract the `ExtensionDevelopmentTools-21.2.0.zip` file in your root directory.
2. Go to the directory and extract the .zip file to this directory.
3. Enter the following command to install additional Node.js packages into this directory:
    ```
    npm install
    ```
   This command may take several minutes to complete.
4. After the packages are installed, enter the following command to fetch theme from hosting.
    ```
    gulp extension:fetch
    ```
   This command may take several minutes to complete either.
5. To run the theme locally, run the following command:
    ```
    gulp extension:local
    ```

You are now ready to begin theme development.
