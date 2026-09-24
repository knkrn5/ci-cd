set -e

# node test.ts

cd /home/karan/Desktop/aigalaxy/server

source /home/karan/Desktop/ci-cd/.env

# npm run test
npm run build
scp -r ./dist pcvm:/home/azureuser/aigalaxy/server
ssh pcvm "/home/azureuser/.local/share/pnpm/bin/pm2 reload aidebate"