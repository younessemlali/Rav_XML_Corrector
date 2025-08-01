# Rav_XML_Corrector

A Google Apps Script project for automating XML corrections and GitHub operations.

## 🚀 Setup

### 1. Configure GitHub Token

First, you need to set up your GitHub personal access token:

```javascript
// Run this in Google Apps Script
setupGitHubToken("your_github_token_here");
```

### 2. Test Connection

Test your GitHub connection:

```javascript
// This should work without "Token manquant" error
testGitHubConnectionSimple();
```

## 📁 Files

- **Config.gs**: Configuration management for GitHub API access
- **AutomationManager.gs**: Main automation class with consistent token usage
- **Tests.gs**: Test functions to validate the setup

## 🔧 Key Features Fixed

✅ **Consistent Token Usage**: All functions now use `Config.getGitHubConfig()` consistently
✅ **No More Token Conflicts**: Eliminated the mapping between `accessToken` and `token`
✅ **Working testGitHubConnectionSimple()**: Function now works without "Token manquant" error
✅ **Proper Error Handling**: Clear error messages for configuration issues

## 🎯 Usage

### Basic Usage

```javascript
// Initialize the automation manager
const manager = new AutomationManager();

// Test GitHub connection
const result = manager.testGitHubConnectionSimple();
console.log(result);

// Get repository information
const repoInfo = manager.getRepositoryInfo();
console.log(repoInfo);
```

### Configuration Management

```javascript
// Check if token is configured
checkTokenStatus();

// Run all tests
runAllTests();
```

## 🔐 Security

- GitHub tokens are stored securely using `PropertiesService.getScriptProperties()`
- Tokens are never logged or exposed in console output
- All API requests use proper authentication headers

## 🏗️ Architecture

The project now uses a clean, consistent architecture:

1. **Config.gs** handles all configuration management
2. **AutomationManager.gs** uses the config consistently throughout
3. No more conflicts between different token parameter names
4. Proper error handling and validation