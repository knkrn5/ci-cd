# ssh admin@3.6.105.65 "cd /home/admin/app && git pull && pm2 restart app"


# sshpass -p "$PASSWORD" ssh admin@your-server-ip \
#   "pm2 status"

# ssh pcvm \
# "ls"

# scp -r ./tests pcvm:/home/ubuntu/
# ssh pcvm "/home/ubuntu/.local/share/pnpm/bin/pm2 restart app"


# =======================


# ssh pcvm "
# sudo -u admin cp -r /home/ubuntu/tests /home/admin/ &&
# sudo -u admin /home/admin/.local/share/pnpm/bin/pm2 restart app
# "

# =======================


# PASSWORD='your-password'

# sshpass -p "$PASSWORD" \
# scp -r ./tests admin@3.6.105.65:/home/admin/

# sshpass -p "$PASSWORD" \
# ssh admin@3.6.105.65 \
# "/home/admin/.local/share/pnpm/bin/pm2 restart app"

# =======================

# export SSHPASS='your-password'
# sshpass -e ssh admin@YOUR-IP "pm2 restart app"


# ===================================

# scp -r ./tests pcvm-admin:/home/admin/
# ssh pcvm-admin "/home/admin/.local/share/pnpm/bin/pm2 restart app"
