const fs = require('fs');
const path = require('path');
const glob = require('glob');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript() {
  const buildDir = path.join(process.cwd(), '.next');
  
  if (!fs.existsSync(buildDir)) {
    console.log('Build directory not found. Skipping console capture injection.');
    return;
  }
  
  // Find all HTML files in the build output
  const htmlFiles = glob.sync('**/*.html', { cwd: buildDir });
  
  htmlFiles.forEach(file => {
    const filePath = path.join(buildDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if script is already injected
    if (content.includes('/dashboard-console-capture.js')) {
      return;
    }
    
    // Inject script before closing head tag
    if (content.includes('</head>')) {
      content = content.replace('</head>', `  ${scriptTag}\n</head>`);
      fs.writeFileSync(filePath, content);
      console.log(`Injected console capture script into ${file}`);
    }
  });
}

injectScript();