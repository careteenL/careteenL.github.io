require('shelljs/global');

var comment = process.argv[2]

if (!comment) {
    console.log(`输入注释： node push.js 'add page'`);
    return
}
exec(`git add . && git commit -m ${comment} && git push`);
