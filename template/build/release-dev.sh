msg='dev'

if [ -n "$1" ]
then
    msg=$msg$1
fi

npm run build-dev
git add -u
git commit -m $msg
git push origin dev
