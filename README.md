# gitshare

Visual Studio Code extension which automatically updates your GitHub status with what you're coding. 

# Demo
![Demo](/assets/demo.png)

# Configuration
![Token Generation](/assets/tokengen.png)
- Navigate to `GitHub Profile Settings -> Developer Settings -> Personal access tokens`
- Generate a personal access token with the user scope.
- Copy the token to your clipboard, and optionally give it a name reminding you of its purpose.  
  
![Settings](/assets/config.png)
- Navigate to Visual Studio `Settings -> Extensions -> GitShare`
- Paste your personal access token in the token field.
- You may optionally customize the plugin behavior by updating the other configuration values.

## Configuration Overview
```json
{
    "gitshare.token": "" //Your GitHub personal access token
    "gitshare.emoji": ":computer:" //GitHub emoji to use in status
    "gitshare.branding": true //Show credit text at the end of status (if space permits).
    "gitshare.showfile": true //Show the current file you are editing (if space permits).
}
```

# Usage
After configuration, to toggle status sharing on and off run the toggle command.
- Open the command pallete (`Ctrl+Shift+P`)
- Click on "GitShare: Toggle GitHub Status Sharing"

# Install
1. Search the VSCode Extension Marketplace for "gitshare" and install.  
or
2. Launch Visual Studio Code and Quick Open (`Ctrl + P`), and paste the following command:
```
ext install placeholder
```

# Contribute
- To report a bug, suggest a feature, or ask a question: open an issue.
- To contribute:
  - Fork this repository and clone it locally.
  - Create and change to a new branch. `git checkout -b myfeature`
  - Run `yarn install` from the project folder and open/edit it in VSCode.
  - Open a pull request.

# License
Source code is licensed under the [MIT License](https://opensource.org/licenses/MIT).
