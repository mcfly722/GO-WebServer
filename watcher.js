const fs = require('fs');
const {spawn} = require('child_process');
const execSync = require('child_process').execSync;

var rebuildRequired = true
var childProcess = null

fs.watch('src', { persistent: true }, function (event, fileName) {
	if (event=='change'){
		rebuildRequired = true;
	}
});

setInterval(
	function() {
		process.stdout.write(".");

		if (rebuildRequired) {

                        rebuildRequired = false;
			
			try {
				childProcess.exit(0);
			} catch {}

			try {

				console.log(execSync('go build -o ../bin/server.exe server.go',{cwd:'src'}).toString(), );

				childProcess = spawn('server.exe',[],{cwd:'bin'});
      
				childProcess.stdout.on('data', (data) => {
					console.log("\n"+data.toString());
				});
	
				childProcess.stderr.on('data', (data) => {
					  console.log("\n"+data.toString());
				});

				childProcess.on('exit', (code) => {
					  console.log(`Child exited with code ${code}`);
				});

			} catch {
				
			}
		}
		
	}, 1000
)
