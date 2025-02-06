function saveCookies() {
    let tasks = [];
    document.querySelectorAll("#ft_list li").forEach(li => {
        tasks.push(li.textContent);
    });
    document.cookie = "tasks=" + JSON.stringify(tasks) + "; path=/";
}

function loadCookies() {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [name, value] = cookie.split("=");
        if (name === "tasks") {
            let tasks = JSON.parse(decodeURIComponent(value));
            for (let i = tasks.length - 1; i >= 0; i--) {
                addTask(tasks[i]);
            }
        }
    }
}

function addTask(task) {
    let div = document.createElement("div");
    let li = document.createElement("li");
    let span = document.createElement("span");

    li.textContent = task;
    span.textContent = " ❌";
    span.onclick = function() {
if (confirm("Do you want to remove this TO DO?")) {
    div.remove();
    saveCookies();
}
    };

    div.appendChild(li);
    div.appendChild(span);
    document.getElementById("ft_list").prepend(div);
}

function show() {
    let newtask = prompt("Enter your TO DO", "").trim();
    if (newtask) {
addTask(newtask);
saveCookies();
    } else {
alert("This can't be blank.");
    }
}
window.onload = loadCookies;