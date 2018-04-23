require('shelljs/global');

var comment = process.argv[2]

if (!comment) {
    console.log(`输入注释： node push.js addPage`);
    return
}

exec(`git add .`);
exec(`git commit -m '${comment}'`);
exec(`git push`);
