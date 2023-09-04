module.exports = {
	apps: [{
		script: 'npm run start',
	}],

	deploy: {
		production: {
			user: 'root',
			host: '45.90.34.143',
			ref: 'origin/main',
			repo: 'git@github.com:AnorVen/ppt-server.git',
			path: '/var/www/server',
			'pre-deploy-local': '',
			'post-deploy': 'source ~/.nvm/nvm.sh && npm i -f && pm2 reload ecosystem.config.js --env production',
			'pre-setup': '',
			'ssh_options': 'ForwardAgent=yes',
		},
	},
};
