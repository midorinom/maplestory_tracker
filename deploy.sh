echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -i C:/Users/lee_h/Documents/General_Assembly/coding_projects/HaoFang.pem -r build/* ubuntu@13.229.106.234:/var/www/13.229.106.234/
scp -i C:/Users/lee_h/Documents/General_Assembly/coding_projects/HaoFang.pem -r .env ubuntu@13.229.106.234:/var/www/13.229.106.234/

echo "Done!"