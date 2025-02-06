$(document).ready(function(){
    loadCookies();
    $("#new").on("click", show);
})

function saveCookies() {
    let tasks = [];
    $("#ft_list li").each(function () {
        tasks.push($(this).text().replace(" ❌", ""));
    });
    document.cookie = "ft_list=" + encodeURIComponent(JSON.stringify(tasks)) + "; path=/";
}

function loadCookies() {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [name, value] = cookie.split("=");
        if (name === "ft_list") {
            let tasks = JSON.parse(decodeURIComponent(value));
            for (let i = tasks.length - 1; i >= 0; i--) {
                addTask(tasks[i]);
            }
        }
    }
}

function addTask(task) {
    let $div = $("<div></div>");
    let $li = $("<li></li>").text(task);
    let $span = $("<span></span>").text(" ❌");

    $span.click(function () {
        if (confirm("Do you want to remove this TO DO?")) {
            $div.remove();
            saveCookies();
        }
    });

    $div.append($li).append($span);
    $("#ft_list").prepend($div);
}

function show() {
    let newtask = prompt("Enter your TO DO", "");
    if (newtask) {
        addTask(newtask);
        saveCookies();
    } else {
        alert("This can't be blank.");
    }
}