/**
 * AutomationManager - Handles GitHub API operations for Rav XML Corrector
 * Uses consistent configuration from Config.gs
 */

class AutomationManager {
  
  /**
   * Constructor - No longer takes accessToken parameter
   * Uses Config.getGitHubConfig() consistently throughout
   */
  constructor() {
    // Validate configuration on initialization
    if (!validateGitHubConfig()) {
      throw new Error('GitHub configuration is invalid. Please check your token and repository settings.');
    }
    
    console.log('AutomationManager initialized successfully');
  }
  
  /**
   * Tests GitHub connection - Fixed to use consistent configuration
   * @return {Object} Connection test results
   */
  testGitHubConnectionSimple() {
    try {
      const config = getGitHubConfig();
      
      if (!config.token) {
        throw new Error('Token manquant - GitHub token is not configured');
      }
      
      const url = getRepositoryUrl();
      const response = this.makeGitHubRequest(url, 'GET');
      
      if (response && response.getResponseCode() === 200) {
        const repoData = JSON.parse(response.getContentText());
        
        console.log('✅ GitHub connection successful!');
        console.log(`Repository: ${repoData.full_name}`);
        console.log(`Description: ${repoData.description || 'No description'}`);
        console.log(`Stars: ${repoData.stargazers_count}`);
        console.log(`Forks: ${repoData.forks_count}`);
        
        return {
          success: true,
          repository: repoData.full_name,
          description: repoData.description,
          stars: repoData.stargazers_count,
          forks: repoData.forks_count
        };
      } else {
        throw new Error(`HTTP ${response.getResponseCode()}: ${response.getContentText()}`);
      }
      
    } catch (error) {
      console.error('❌ GitHub connection failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Makes a request to GitHub API using consistent configuration
   * @param {string} url - The API endpoint URL
   * @param {string} method - HTTP method (GET, POST, etc.)
   * @param {Object} payload - Request payload (optional)
   * @return {HTTPResponse} The response from GitHub API
   */
  makeGitHubRequest(url, method = 'GET', payload = null) {
    const config = getGitHubConfig();
    
    const options = {
      method: method,
      headers: {
        'Authorization': `token ${config.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Rav-XML-Corrector/1.0'
      }
    };
    
    if (payload) {
      options.payload = JSON.stringify(payload);
      options.headers['Content-Type'] = 'application/json';
    }
    
    return UrlFetchApp.fetch(url, options);
  }
  
  /**
   * Gets repository information
   * @return {Object} Repository data
   */
  getRepositoryInfo() {
    try {
      const url = getRepositoryUrl();
      const response = this.makeGitHubRequest(url, 'GET');
      
      if (response.getResponseCode() === 200) {
        return JSON.parse(response.getContentText());
      } else {
        throw new Error(`Failed to get repository info: ${response.getResponseCode()}`);
      }
    } catch (error) {
      console.error('Error getting repository info:', error.message);
      throw error;
    }
  }
  
  /**
   * Lists repository contents
   * @param {string} path - Path within the repository (optional)
   * @return {Array} Array of file/directory objects
   */
  listRepositoryContents(path = '') {
    try {
      const config = getGitHubConfig();
      const url = `${config.apiUrl}/repos/${config.owner}/${config.repo}/contents/${path}`;
      const response = this.makeGitHubRequest(url, 'GET');
      
      if (response.getResponseCode() === 200) {
        return JSON.parse(response.getContentText());
      } else {
        throw new Error(`Failed to list contents: ${response.getResponseCode()}`);
      }
    } catch (error) {
      console.error('Error listing repository contents:', error.message);
      throw error;
    }
  }
  
  /**
   * Gets file content from repository
   * @param {string} filePath - Path to the file in the repository
   * @return {string} File content (decoded from base64)
   */
  getFileContent(filePath) {
    try {
      const config = getGitHubConfig();
      const url = `${config.apiUrl}/repos/${config.owner}/${config.repo}/contents/${filePath}`;
      const response = this.makeGitHubRequest(url, 'GET');
      
      if (response.getResponseCode() === 200) {
        const fileData = JSON.parse(response.getContentText());
        return Utilities.newBlob(Utilities.base64Decode(fileData.content)).getDataAsString();
      } else {
        throw new Error(`Failed to get file content: ${response.getResponseCode()}`);
      }
    } catch (error) {
      console.error(`Error getting file content for ${filePath}:`, error.message);
      throw error;
    }
  }
}

/**
 * Global function to test GitHub connection - for easy testing
 * @return {Object} Test results
 */
function testGitHubConnectionSimple() {
  const manager = new AutomationManager();
  return manager.testGitHubConnectionSimple();
}

/**
 * Global function to set up GitHub token - for easy configuration
 * @param {string} token - GitHub personal access token
 */
function setupGitHubToken(token) {
  setGitHubToken(token);
  console.log('GitHub token configured. You can now test the connection with testGitHubConnectionSimple()');
}