set -e

# node test.ts

cd /home/karan/Desktop/aigalaxy/client

source /home/karan/Desktop/ci-cd/.env

# npm run test
npm run build
aws s3 cp ./dist s3://aidebate-site/ --recursive
aws cloudfront create-invalidation  --distribution-id $CF_DIST_ID  --paths "/index.html"