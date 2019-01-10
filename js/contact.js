function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function main() {
    var name = findGetParameter('name');
    var email = findGetParameter('email');
    var message = findGetParameter('message');
    // TODO load IFTTT secret key
    var url = "https://maker.ifttt.com/trigger/liberdade_notified/with/key/???";
    var data = { value1: name, value2: email, value3: message };
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(data);
    alert("O seu contato não pode ser realizado :(\nPoderia enviar um e-mail para liberdadeorganizacao@gmail.com por favor?");
    window.location = "/";
}
