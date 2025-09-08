import { spawn } from "child_process";

// ✅ Replace this with your desired directory
const projectPath = "C:\\Users\\Cybro\\my-app"; // For Windows
// const projectPath = "/home/cybro/my-app";    // For Linux/Mac

const child = spawn('npm', ['run', 'dev'], {
  cwd: projectPath,    // Set working directory
  shell: true,         // Use system default shell
  detached: true,      // Run independently
  stdio: 'ignore'      // No output in parent process
});

child.unref(); // Fully detach
console.log(`✅ npm run dev started in background at: ${projectPath}`);

