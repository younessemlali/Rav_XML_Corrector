/**
 * Configuration manager for GitHub API access
 * Handles all configuration settings for the Rav XML Corrector
 */

/**
 * Returns GitHub configuration including token and repository details
 * @return {Object} GitHub configuration object
 */
function getGitHubConfig() {
  return {
    token: PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN'),
    owner: 'younessemlali',
    repo: 'Rav_XML_Corrector',
    apiUrl: 'https://api.github.com'
  };
}

/**
 * Sets the GitHub token in script properties
 * @param {string} token - The GitHub personal access token
 */
function setGitHubToken(token) {
  PropertiesService.getScriptProperties().setProperty('GITHUB_TOKEN', token);
  console.log('GitHub token has been set successfully');
}

/**
 * Validates if GitHub configuration is properly set
 * @return {boolean} True if configuration is valid
 */
function validateGitHubConfig() {
  const config = getGitHubConfig();
  
  if (!config.token) {
    console.error('GitHub token is missing. Please set it using Config.setGitHubToken()');
    return false;
  }
  
  if (!config.owner || !config.repo) {
    console.error('GitHub owner or repository is not configured');
    return false;
  }
  
  return true;
}

/**
 * Gets the full repository URL for API calls
 * @return {string} Full repository API URL
 */
function getRepositoryUrl() {
  const config = getGitHubConfig();
  return `${config.apiUrl}/repos/${config.owner}/${config.repo}`;
}