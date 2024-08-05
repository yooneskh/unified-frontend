bun run build && rsync -avu --delete ./.output/ $zxc:/home/yooneskh/project && ssh $zxc pm2 restart project
