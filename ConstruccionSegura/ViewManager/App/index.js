var result = {
    getDangers: function (result) {
        if (result.success) {
            $('#danger')
                .append($("<option></option>")
                    .attr("value", 0)
                    .text("Seleccione un peligro..."));
            $.each(result.data, function (i, item) {
                $('#danger')
                    .append($("<option></option>")
                        .attr("value", item.Value)
                        .text(item.Text));
            });
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener Peligros. " + result.message);
        }
    },
    getEffects: function (result) {
        if (result.success) {
            $.each(result.data, function (i, item) {
                $('#effect')
                    .append($("<option></option>")
                        .attr("value", item.Value)
                        .text(item.Text));
            });
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener Efectos. " + result.message);
        }
    },
    getRecommendations: function (result) {
        if (result.success) {
            $.each(result.data, function (i, item) {
                $('#recommendation')
                    .append($("<option></option>")
                        .attr("value", item.Value)
                        .text(item.Text));
            });
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener Recomendaciones. " + result.message);
        }
    },
}

var methods = {
    init: function () {
        $('#dangerGroup').change(methods.getDangers);
        $('#danger').change(methods.changeDanger);
    },
    getDangers: function () {
        $('#danger').empty();
        $('#effect').empty();
        $('#recommendation').empty();
        var idDangerGroup = $('#dangerGroup').val();
        if (idDangerGroup && idDangerGroup > 0) {
            var data = '{ id: null, idDangerGroup: ' + idDangerGroup + ' }';
            var ajax = new AjaxHttpSender();
            ajax.sendPost('../Home/GetDangers/', data, result.getDangers);
        }
    },
    changeDanger: function () {
        methods.getEffects();
        methods.getRecommendations();
    },
    getEffects: function () {
        var idDanger = $('#danger').val();
        $('#effect').empty();
        if (idDanger && idDanger > 0) {
            var data = '{ id: null, idDanger:' + idDanger + ' }';
            var ajax = new AjaxHttpSender();
            ajax.sendPost('../Home/GetEffects/', data, result.getEffects);
        }
    },
    getRecommendations: function () {
        var idDanger = $('#danger').val();
        $('#recommendation').empty();
        if (idDanger && idDanger > 0) {
            var data = '{ id: null, idDanger:' + idDanger + ' }';
            var ajax = new AjaxHttpSender();
            ajax.sendPost('../Home/GetRecommendations/', data, result.getRecommendations);
        }
    },
}

$(function () {
    methods.init();
});