/**
 * 主 JavaScript 文件 —— 所有页面的公共逻辑
 *
 * 功能包括：
 *   1. 亮色/暗色主题切换（localStorage 记住用户偏好）
 *   2. 首页动态时钟 + 问候语 + 日期显示
 *   3. 浏览器标题栏文字滚动（跑马灯）
 *
 * 如何修改：
 *   - 想改问候语？修改 updateClock() 函数里的 if-else 判断
 *   - 想改标题栏滚动文字？修改 marqueeText 变量
 *   - 想改时钟刷新频率？修改 setInterval(updateClock, 1000) 的数字（单位：毫秒）
 */

// ============================
// 一、主题切换
// ============================

/**
 * applyTheme - 页面加载时读取 localStorage 中保存的主题设置
 *   - localStorage 是浏览器自带的本地存储，关闭网页后数据不会丢失
 *   - 根据存储的值来切换 css 文件的 href（指向亮色或暗色样式表）
 */
function applyTheme() {
    // 获取页面中的样式表 <link> 元素和主题切换按钮
    var stylesheet = document.getElementById('theme-stylesheet');
    var btn = document.getElementById('theme-btn');

    // 安全检查：如果页面没有这两个元素（理论上不会发生），直接退出
    if (!stylesheet || !btn) return;

    // 从本地存储读取之前保存的主题（'dark' 或 'light'）
    var savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        // 把样式表切换到暗色主题的 css 文件
        stylesheet.setAttribute('href', '../css/theme-dark.css');
        // 按钮文字改成"切换亮色主题"，提示用户点击可以回到亮色
        btn.innerText = '切换亮色主题';
    } else {
        // 默认使用亮色主题
        stylesheet.setAttribute('href', '../css/style.css');
        btn.innerText = '切换暗色主题';
    }
}

/**
 * toggleTheme - 用户点击主题切换按钮时执行
 *   - 判断当前用的是哪个 css，然后切换到另一个
 *   - 切换后用 localStorage.setItem 保存选择，下次打开网页自动恢复
 */
function toggleTheme() {
    var stylesheet = document.getElementById('theme-stylesheet');
    var btn = document.getElementById('theme-btn');
    if (!stylesheet || !btn) return;

    // 检查当前加载的是哪个 css 文件
    if (stylesheet.getAttribute('href').includes('style.css')) {
        // 当前是亮色 → 切换到暗色
        stylesheet.setAttribute('href', '../css/theme-dark.css');
        btn.innerText = '切换亮色主题';
        localStorage.setItem('theme', 'dark');
    } else {
        // 当前是暗色 → 切换到亮色
        stylesheet.setAttribute('href', '../css/style.css');
        btn.innerText = '切换暗色主题';
        localStorage.setItem('theme', 'light');
    }
}

// ============================
// 二、动态时钟、问候语、日期（仅首页有效）
// ============================

/**
 * updateClock - 每秒执行一次，更新时间/问候语/日期的显示
 *   - 只有首页有 id="clock" 的元素，其他页面此函数直接跳过时钟部分
 */
function updateClock() {
    // 获取首页上的三个显示区域
    var clockEl = document.getElementById('clock');
    var greetingEl = document.getElementById('greeting');
    var dateEl = document.getElementById('date-display');

    // 如果没有时钟元素（非首页），直接退出
    if (!clockEl) return;

    // 获取当前时间
    var now = new Date();
    var hours = now.getHours();    // 0-23
    var minutes = now.getMinutes(); // 0-59
    var seconds = now.getSeconds(); // 0-59

    // 补零：把 1-9 变成 01-09，保持两位数显示
    var h = hours < 10 ? '0' + hours : hours;
    var m = minutes < 10 ? '0' + minutes : minutes;
    var s = seconds < 10 ? '0' + seconds : seconds;

    // ---- 更新时钟 ----
    clockEl.innerText = h + ':' + m + ':' + s;

    // ---- 根据小时更新问候语 ----
    if (greetingEl) {
        var greeting = '';
        // 你可以根据需要修改时间段和对应的问候语
        if (hours >= 5 && hours < 8) {
            greeting = '🌅 早上好，新的一天开始了！';
        } else if (hours >= 8 && hours < 12) {
            greeting = '☀️ 上午好，祝你学习顺利！';
        } else if (hours >= 12 && hours < 14) {
            greeting = '🌞 中午好，记得吃饭哦！';
        } else if (hours >= 14 && hours < 18) {
            greeting = '🌤️ 下午好，继续加油！';
        } else if (hours >= 18 && hours < 22) {
            greeting = '🌙 晚上好，辛苦了一天！';
        } else {
            greeting = '🌜 夜深了，注意休息哦！';
        }
        greetingEl.innerText = greeting;
    }

    // ---- 更新日期和星期 ----
    if (dateEl) {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;  // getMonth() 返回 0-11，所以要 +1
        var day = now.getDate();
        // 星期数组，getDay() 返回 0（周日）到 6（周六）
        var weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        var weekDay = weekDays[now.getDay()];
        dateEl.innerText = year + '年' + month + '月' + day + '日 ' + weekDay;
    }
}

// ============================
// 三、浏览器标题栏跑马灯
// ============================

/**
 * 原理：每隔一段时间修改 document.title（浏览器标签页上显示的文字），
 * 通过截取不同位置的子串来实现文字滚动的视觉效果。
 *
 * 想改滚动速度？修改 setInterval(titleMarquee, 300) 中的 300（毫秒，越小越快）
 * 想改滚动文字？修改 marqueeText 变量
 */

// 页面标题，作为滚动文本的"锚点"
var baseTitle = document.title;

// 跑马灯文字 —— 你可以改成任何你想要的文字
var marqueeText = '    欢迎来到刘孟灏的个人主页！    感谢你的访问！    ';

// 滚动位置计数器
var titleIdx = 0;

/**
 * titleMarquee - 每次调用时，计算新的截取位置，更新标题
 */
function titleMarquee() {
    // 把滚动文字 + 标题 + 滚动文字 拼接成一长串
    var fullText = marqueeText + baseTitle + marqueeText;

    // 索引加1，超过总长度就归零，实现循环
    titleIdx = (titleIdx + 1) % (marqueeText.length + baseTitle.length);

    // 从长串中截取30个字符显示在标题栏
    // 想改显示长度？修改这里的 30
    document.title = fullText.substring(titleIdx, titleIdx + 30);
}

// ============================
// 四、页面初始化（所有页面加载时执行）
// ============================

/**
 * window.onload - 当页面完全加载完毕后自动执行
 * 这里统一初始化所有功能，避免每个 HTML 文件重复写 <script>
 */
window.onload = function() {
    // 1. 应用主题设置
    applyTheme();

    // 2. 绑定主题切换按钮的点击事件
    //    （HTML 里的 <a id="theme-btn"> 本身没有 onclick，靠 JS 绑定）
    var themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', function(e) {
            e.preventDefault();  // 阻止 <a href="#"> 的默认跳转行为
            toggleTheme();       // 执行主题切换
        });
    }

    // 3. 仅在首页启动时钟（检测 #clock 元素是否存在）
    if (document.getElementById('clock')) {
        updateClock();                   // 先立即执行一次
        setInterval(updateClock, 1000);  // 然后每秒刷新一次（1000毫秒 = 1秒）
    }

    // 4. 启动标题栏跑马灯（所有页面都有）
    setInterval(titleMarquee, 300);      // 每300毫秒滚动一次
};
