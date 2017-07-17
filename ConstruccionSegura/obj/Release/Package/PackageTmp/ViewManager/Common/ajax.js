var AjaxHttpSender = function () { };

AjaxHttpSender.prototype.sendGet = function (url, async, cache, success) {
    $.ajax({
        url: url,
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: async,
        processData: false,
        cache: cache,
        success: function (data) {
            success(data);
        },
        error: function (xhr, status, error) {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener información desde el servidor");
        }
    });
}

AjaxHttpSender.prototype.sendPost = function (url, params, success) {
    $.ajax({
        url: url,
        type: "POST",
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            success(data);
        },
        error: function (xhr) {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener información desde el servidor");
            if (xhr.status == 200 || xhr.responseText == "Success") {
            }
        }
    });
}

AjaxHttpSender.prototype.sendPostHTML = function (url, params, success) {
    $.ajax({
        url: url,
        type: "POST",
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        success: function (data) {
            success(data);
        },
        error: function (xhr) {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener información desde el servidor");
            if (xhr.status == 200 || xhr.responseText == "Success") {
            }
        }
    });
}