var lid = window.location.href.split('=').slice(-1)[0];
var xhr = new XMLHttpRequest();
var detail_center = document.getElementsByClassName('detail_center').item(0)
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var result = JSON.parse(xhr.responseText)[0];
        console.log(result);
        // detail_center.innerHTML = ``;
    }
};
xhr.open("get", `/books/query?lid=${lid}`, true);
xhr.send();

