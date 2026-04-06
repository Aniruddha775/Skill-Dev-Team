#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const SKILL_NAME = "dev-team";
const PACKAGE_SKILLS_DIR = path.join(__dirname, "..", "skills", SKILL_NAME);
const SETTINGS_PERMISSION = "WebFetch(domain:raw.githubusercontent.com)";

function main() {
  const command = process.argv[2];

  if (command === "install") {
    install();
  } else if (command === "uninstall") {
    uninstall();
  } else {
    printUsage();
  }
}

function install() {
  const projectRoot = process.cwd();
  const targetDir = path.join(projectRoot, ".claude", "skills", SKILL_NAME);
  const settingsPath = path.join(projectRoot, ".claude", "settings.local.json");

  // Check if skill source exists
  if (!fs.existsSync(PACKAGE_SKILLS_DIR)) {
    console.error("Error: Skill files not found in package. Please reinstall.");
    process.exit(1);
  }

  // Check for existing installation
  if (fs.existsSync(targetDir)) {
    console.log(`\nExisting ${SKILL_NAME} skill found at ${targetDir}`);
    console.log("Overwriting with new version...\n");
    fs.rmSync(targetDir, { recursive: true });
  }

  // Create directory structure
  fs.mkdirSync(targetDir, { recursive: true });

  // Copy skill files
  copyDirSync(PACKAGE_SKILLS_DIR, targetDir);
  console.log(`Skill files copied to ${targetDir}`);

  // Set up settings.local.json permissions
  setupSettings(settingsPath);

  console.log("\n--------------------------------------------");
  console.log(" skill-dev-team installed successfully!");
  console.log("--------------------------------------------");
  console.log("\nHow to use:");
  console.log('  1. Write a handover document describing what you want built');
  console.log('  2. Run Claude Code and type: /dev-team');
  console.log('  3. Paste or reference your handover document');
  console.log('  4. The team will guide you through 4 phases with checkpoints');
  console.log("\nTip: Run on Sonnet or higher for best results.");
  console.log("");
}

function uninstall() {
  const projectRoot = process.cwd();
  const targetDir = path.join(projectRoot, ".claude", "skills", SKILL_NAME);

  if (!fs.existsSync(targetDir)) {
    console.log("skill-dev-team is not installed in this project.");
    return;
  }

  fs.rmSync(targetDir, { recursive: true });
  console.log(`Removed ${targetDir}`);
  console.log("\nskill-dev-team uninstalled. Your .dev-team/ runtime data (if any) was not deleted.");
}

function setupSettings(settingsPath) {
  let settings = {};

  if (fs.existsSync(settingsPath)) {
    try {
      settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
    } catch {
      console.warn("Warning: Could not parse existing settings.local.json. Creating new one.");
      settings = {};
    }
  }

  // Ensure permissions.allow array exists
  if (!settings.permissions) settings.permissions = {};
  if (!Array.isArray(settings.permissions.allow)) settings.permissions.allow = [];

  // Add WebFetch permission if not already present
  if (!settings.permissions.allow.includes(SETTINGS_PERMISSION)) {
    settings.permissions.allow.push(SETTINGS_PERMISSION);
    console.log(`Added permission: ${SETTINGS_PERMISSION}`);
  } else {
    console.log("WebFetch permission already configured.");
  }

  // Write settings
  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + "\n");
}

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function printUsage() {
  console.log("skill-dev-team — Claude Code development team simulation\n");
  console.log("Usage:");
  console.log("  npx skill-dev-team install     Install the skill into the current project");
  console.log("  npx skill-dev-team uninstall   Remove the skill from the current project");
  console.log("");
}

main();
