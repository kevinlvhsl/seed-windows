msg='release'

if [ -n "$1" ]
then
    msg=$msg$1
fi

npm run build
git add -u
git commit -m $msg
git rebase master
git push origin dev
git checkout master
git merge dev
git push origin master
git checkout dev
