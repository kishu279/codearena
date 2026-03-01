import axios from 'axios';

const PISTON_API_URL = 'http://localhost:2000/api/v2';

// Supported languages mapped to their Piston runtime names and versions
export const SUPPORTED_LANGUAGES: Record<string, { runtime: string; version: string }> = {
    'python': { runtime: 'python', version: '3.10.0' },
    'javascript': { runtime: 'javascript', version: '18.15.0' },
    'typescript': { runtime: 'typescript', version: '5.0.3' },
    'java': { runtime: 'java', version: '15.0.2' },
    'c': { runtime: 'c', version: '10.2.0' },
    'cpp': { runtime: 'c++', version: '10.2.0' },
    'go': { runtime: 'go', version: '1.16.2' },
    'rust': { runtime: 'rust', version: '1.68.2' },
    'kotlin': { runtime: 'kotlin', version: '1.8.20' },
    'ruby': { runtime: 'ruby', version: '3.0.1' },
    'csharp': { runtime: 'csharp.net', version: '5.0.201' },
    'swift': { runtime: 'swift', version: '5.3.3' },
};

export interface RunCodeResult {
    stdout: string;
    stderr: string;
    exitCode: number;
    output: string;   // combined stdout + stderr
    language: string;
    version: string;
}

class PistonClient {
    private baseUrl: string;

    constructor(baseUrl: string = PISTON_API_URL) {
        this.baseUrl = baseUrl;
    }

    // Get the list of available runtimes
    async getRuntimes() {
        const response = await axios.get(`${this.baseUrl}/runtimes`);
        return response.data;
    }

    // Execute code and return the result
    async runCode(language: string, sourceCode: string, stdin: string = ''): Promise<RunCodeResult> {
        const lang = SUPPORTED_LANGUAGES[language];
        if (!lang) {
            throw new Error(`Unsupported language: ${language}. Supported: ${Object.keys(SUPPORTED_LANGUAGES).join(', ')}`);
        }

        const response = await axios.post(`${this.baseUrl}/execute`, {
            language: lang.runtime,
            version: lang.version,
            files: [{ content: sourceCode }],
            stdin,
        });

        const data = response.data;
        const run = data.run;

        return {
            stdout: run.stdout || '',
            stderr: run.stderr || '',
            exitCode: run.code,
            output: run.output || '',
            language: data.language,
            version: data.version,
        };
    }
}

export const pistonClient = new PistonClient();
