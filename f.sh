set -e

# node test.ts

PROJECT_DIR=/home/karan/Desktop/aigalaxy/client
BUCKET_NAME=aidebate-site

cd $PROJECT_DIR

source /home/karan/Desktop/ci-cd/.env

# npm ci
npm run build
# aws s3 cp ./dist s3://aidebate-site/ --recursive
aws s3 sync $PROJECT_DIR/dist/ s3://$BUCKET_NAME --delete
aws cloudfront create-invalidation  --distribution-id $CF_DIST_ID  --paths "/index.html"