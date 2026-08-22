const fs = require('fs');
const readline = require('readline');
const logPath = 'C:\\Users\\ETHEREAL浪岡\\.gemini\\antigravity-ide\\brain\\54c6f3f4-b5c6-4656-8d74-db86876195aa\\.system_generated\\logs\\transcript_full.jsonl';
const rl = readline.createInterface({ input: fs.createReadStream(logPath) });
rl.on('line', (line) => {
  if (line.includes('"step_index":1645')) {
    const json = JSON.parse(line);
    console.log(JSON.stringify(json, null, 2));
  }
});
