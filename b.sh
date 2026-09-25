set -e

# node test.ts

PROJECT_DIR=/home/karan/Desktop/aigalaxy/server
VM_NAME=azvm
VM_HOME_PATH=/home/azureuser

cd $PROJECT_DIR

source /home/karan/Desktop/ci-cd/.env

# npm run test
npm run build
scp -r $PROJECT_DIR/dist $VM_NAME:$VM_HOME_PATH/aigalaxy/server
ssh $VM_NAME "$VM_HOME_PATH/.local/share/pnpm/bin/pm2 reload aidebate"