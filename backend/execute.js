// const Docker = require("dockerode");
// const docker = new Docker();

// const executeCode = async (language, code, input) => {
//     try {
//         const langConfig = {
//             python: { image: "python:3.9", cmd: "python3 -c" },
//             cpp: { image: "gcc:latest", cmd: "g++ -o a.out && ./a.out" },
//             java: { image: "openjdk:latest", cmd: "java Main" },
//         };

//         if (!langConfig[language]) return { error: "Unsupported Language" };

//         // Create a container
//         const container = await docker.createContainer({
//             Image: langConfig[language].image,
//             Cmd: ["/bin/sh", "-c", `${langConfig[language].cmd} "${code}"`],
//             AttachStdout: true,
//             AttachStderr: true,
//         });

//         await container.start();
//         const output = await container.wait();
//         const logs = await container.logs({ stdout: true, stderr: true });

//         await container.remove();

//         return { output: logs.toString() };
//     } catch (error) {
//         return { error: error.message };
//     }
// };

// module.exports = executeCode;
