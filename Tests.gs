/**
 * Test functions for AutomationManager and Config
 * Run these to verify the GitHub token configuration is working properly
 */

/**
 * Test all configuration functions
 */
function testConfiguration() {
  console.log('=== Testing Configuration ===');
  
  // Test getGitHubConfig
  const config = getGitHubConfig();
  console.log('GitHub Config:', config);
  
  // Test validation
  const isValid = validateGitHubConfig();
  console.log('Configuration valid:', isValid);
  
  // Test repository URL
  const repoUrl = getRepositoryUrl();
  console.log('Repository URL:', repoUrl);
  
  return {
    config: config,
    isValid: isValid,
    repoUrl: repoUrl
  };
}

/**
 * Test AutomationManager initialization
 */
function testAutomationManagerInit() {
  console.log('=== Testing AutomationManager Initialization ===');
  
  try {
    const manager = new AutomationManager();
    console.log('✅ AutomationManager initialized successfully');
    return { success: true, manager: manager };
  } catch (error) {
    console.error('❌ AutomationManager initialization failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Complete test suite
 */
function runAllTests() {
  console.log('=== Running All Tests ===');
  
  const configTest = testConfiguration();
  const managerTest = testAutomationManagerInit();
  
  if (managerTest.success) {
    console.log('=== Testing GitHub Connection ===');
    const connectionTest = testGitHubConnectionSimple();
    return {
      config: configTest,
      manager: managerTest,
      connection: connectionTest
    };
  } else {
    return {
      config: configTest,
      manager: managerTest,
      connection: { success: false, error: 'Manager initialization failed' }
    };
  }
}

/**
 * Helper function to check if token is set
 */
function checkTokenStatus() {
  const config = getGitHubConfig();
  if (config.token) {
    console.log('✅ GitHub token is configured');
    console.log('Token length:', config.token.length);
    console.log('Token starts with:', config.token.substring(0, 8) + '...');
    return true;
  } else {
    console.log('❌ GitHub token is not configured');
    console.log('Use setupGitHubToken("your_token_here") to set it');
    return false;
  }
}