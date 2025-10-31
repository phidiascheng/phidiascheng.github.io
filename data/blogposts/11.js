const item = {
    title: '网站的小功能',
    date: '2025-2-11',
    content : //html
    `
        <li>11课程表</li>
        <p>孩子可以在这里查看明天上什么课。</p>
        <p>ps:关于这个课程表，现在的小学好像把那些副科时间安排得挺多。看看这个课程表，甚至有的天没有语文课，而体育课天天都有。还有一天连续上两节美术课的，
        语文课都没有这个待遇。不要看到周五下午有语文阅读，下午的课程那是所谓的微课，时间很短的。还好数学课还能保证每天都有课。还有那个音乐课，孩子回家老是
        焦虑说葫芦丝吹不好老师要吵，音乐课给的压力比语文课数学课都大，害得我只能一个劲地讲出了语数外别的课都能学多少就学多少就行，只有语数外才是老师要求的
        全部都得学会。</p>
        <blockquote>
            <a class="link" target="_blank" href="/schedual">课程表</a>
        </blockquote>
        <li>留言板</li>
        <p>
            <span>做了一个超级简单的留言板功能。留言需要填写密码，这时需要从密码框右侧链接，或者从</span>
            <a class="link" target="_blank" href="/user/users" style="color:brown;">这里</a>
            <span>进去先创建一个自己的名字和密码，邮箱可以不填。服务器保存的是密码的哈希值，不用担心自己常用的密码泄漏。验证也是用的哈希值。</span>
        </p>
        <blockquote>
            <a class="link" target="_blank" href="/user/comments">留言板</a>
        </blockquote>

`
}

export {item}
