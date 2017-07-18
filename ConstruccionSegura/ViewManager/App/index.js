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
    getAllEffects: function (result) {
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
    getEffects: function (result) {
        if (result.success) {
            $('#effectTable')
                .append($("<th>")
                .append("<td>Efectos Asociados"));
            $.each(result.data, function (i, item) {
                $('#effectTable')
                    .append($("<tr><td>" + item.Text + "</td></tr>"));
            });
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener Efectos. " + result.message);
        }
    },
    getAllRecommendations: function (result) {
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
    getRecommendations: function (result) {
        if (result.success) {
            $('#recommendationTable')
                .append($("<th>")
                    .append("<td>Recomendaciones Asociadas"));
            $.each(result.data, function (i, item) {
                $('#recommendationTable')
                    .append($("<tr><td>" + item.Text + "</td></tr>"));
            });
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener Recomendaciones. " + result.message);
        }
    },
    getRecommendationsType: function (result) {
        if (result.success) {
            $.each(result.data, function (i, item) {
                $('#recommendationType')
                    .append($("<option></option>")
                        .attr("value", item.Value)
                        .text(item.Text));
            });
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener Tipos de Recomendaciones. " + result.message);
        }
    },
    getAllControls: function (result) {
        if (result.success) {
            $.each(result.data, function (i, item) {
                $('#control')
                    .append($("<option></option>")
                        .attr("value", item.Value)
                        .text(item.Text));
            });
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener Controles. " + result.message);
        }
    },
    getControls: function (result) {
        if (result.success) {
            $('#controlTable')
                .append($("<th>")
                    .append("<td>Controles Asociados"));
            $.each(result.data, function (i, item) {
                $('#controlTable')
                    .append($("<tr><td>" + item.Text + "</td></tr>"));
            });
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener Controles. " + result.message);
        }
    }
}

var methods = {
    init: function () {
        methods.getRecommendationsType();
        $('#dangerGroup').change(methods.getDangers);
        $('#danger').change(methods.changeDanger);
        $("#effect").combobox();
        $("#recommendation").combobox();
        $("#control").combobox();
        methods.selectedDanger(false);
        $('#btnNewEffect').click(function () {
            var txt = $('#effect').combobox('getValue');
            $('#effectDescription').val(txt);
        });
    },
    selectedDanger: function (show) {

        //$('#danger').empty();
        $('#effect').empty();
        $('#effect').combobox('setValue');
        $('#effectTable').empty();
        $('#recommendation').empty();
        $('#recommendation').combobox('setValue');
        $('#recommendationTable').empty();
        $('#control').empty();
        $('#control').combobox('setValue');
        $('#controlTable').empty();


        if (show) {
            $('#btnNewEffect').show();
            $('#btnAddEffect').show();
            $('#btnAddRecommendation').show();
            $('#btnNewRecommendation').show();
            $('#btnAddControl').show();
            $('#btnNewControl').show();
        }
        else {
            $('#btnNewEffect').hide();
            $('#btnAddEffect').hide();
            $('#btnAddRecommendation').hide();
            $('#btnNewRecommendation').hide();
            $('#btnAddControl').hide();
            $('#btnNewControl').hide();
        }
    },
    getDangers: function () {
        $('#danger').empty();
        $('#effect').empty();
        $('#effect').combobox('setValue');
        $('#effectTable').empty();
        $('#recommendation').empty();
        $('#recommendation').combobox('setValue');
        $('#recommendationTable').empty();
        $('#control').empty();
        $('#control').combobox('setValue');
        $('#controlTable').empty();

        methods.selectedDanger(false);

        $('#recommendation').empty();
        var idDangerGroup = $('#dangerGroup').val();
        if (idDangerGroup && idDangerGroup > 0) {
            var data = '{ id: null, idDangerGroup: ' + idDangerGroup + ' }';
            var ajax = new AjaxHttpSender();
            ajax.sendPost('../Home/GetDangers/', data, result.getDangers);
        }
    },
    changeDanger: function () {
        if ($('#danger').val() && $('#danger').val() > 0) {
            methods.selectedDanger(true);
        }
        else {
            methods.selectedDanger(false);
        }
        methods.getEffects();
        methods.getAllEffects();
        methods.getAllRecommendations();
        methods.getRecommendations();
        methods.getAllControls();
        methods.getControls();
    },
    getAllEffects: function () {
        $('#effect').empty();
        var data = '{ id: null, idDanger: null }';
        var ajax = new AjaxHttpSender();
        ajax.sendPost('../Home/GetEffects/', data, result.getAllEffects);
    },
    getEffects: function () {
        var idDanger = $('#danger').val();
        if (idDanger && idDanger > 0) {
            var data = '{ id: null, idDanger:' + idDanger + ' }';
            var ajax = new AjaxHttpSender();
            ajax.sendPost('../Home/GetEffects/', data, result.getEffects);
        }
    },
    getAllRecommendations: function () {
        $('#recommendation').empty();
        var data = '{ id: null, idDanger: null }';
        var ajax = new AjaxHttpSender();
        ajax.sendPost('../Home/GetRecommendations/', data, result.getAllRecommendations);
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
    getRecommendationsType: function () {
        $('#recommendationType').empty();
        var data = '{ id: null }';
        var ajax = new AjaxHttpSender();
        ajax.sendPost('../Home/GetRecommendationsType/', data, result.getRecommendationsType);
    },
    getAllControls: function () {
        $('#control').empty();
        var data = '{ id: null, idDanger: null }';
        var ajax = new AjaxHttpSender();
        ajax.sendPost('../Home/GetControls/', data, result.getAllControls);
    },
    getControls: function() {
        var idDanger = $('#danger').val();
        $('#control').empty();
        if (idDanger && idDanger > 0) {
            var data = '{ id: null, idDanger:' + idDanger + ' }';
            var ajax = new AjaxHttpSender();
            ajax.sendPost('../Home/GetControls/', data, result.getControls);
        }
    }
}

$.widget("custom.combobox", {
    _create: function () {
        this.wrapper = $("<span>")
            .addClass("custom-combobox")
            .insertAfter(this.element);

        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
    },
    _createAutocomplete: function () {
        var selected = this.element.children(":selected"),
            value = selected.val() ? selected.text() : "";

        this.input = $("<input>")
            .appendTo(this.wrapper)
            .val(value)
            .attr("title", "")
            .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
            .autocomplete({
                delay: 0,
                minLength: 0,
                source: $.proxy(this, "_source")
            })
            .tooltip({
                classes: {
                    "ui-tooltip": "ui-state-highlight"
                }
            });

        this._on(this.input, {
            autocompleteselect: function (event, ui) {
                ui.item.option.selected = true;
                this._trigger("select", event, {
                    item: ui.item.option
                });
            },

            autocompletechange: "_removeIfInvalid"
        });
    },
    _createShowAllButton: function () {
        var input = this.input,
            wasOpen = false;

        $("<a>")
            .attr("tabIndex", -1)
            .attr("title", "Mostrar todos")
            .tooltip()
            .appendTo(this.wrapper)
            .button({
                icons: {
                    primary: "ui-icon-triangle-1-s"
                },
                text: false
            })
            .removeClass("ui-corner-all")
            .addClass("custom-combobox-toggle ui-corner-right")
            .on("mousedown", function () {
                wasOpen = input.autocomplete("widget").is(":visible");
            })
            .on("click", function () {
                input.trigger("focus");

                // Close if already visible
                if (wasOpen) {
                    return;
                }
                // Pass empty string as value to search for, displaying all results
                input.autocomplete("search", "");
            });
    },
    _source: function (request, response) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
        response(this.element.children("option").map(function () {
            var text = $(this).text();
            if (this.value && (!request.term || matcher.test(text)))
                return {
                    label: text,
                    value: text,
                    option: this
                };
        }));
    },
    _removeIfInvalid: function (event, ui) {

        //// Selected an item, nothing to do
        //if (ui.item) {
        //    return;
        //}

        //// Search for a match (case-insensitive)
        //var value = this.input.val(),
        //    valueLowerCase = value.toLowerCase(),
        //    valid = false;
        //this.element.children("option").each(function () {
        //    if ($(this).text().toLowerCase() === valueLowerCase) {
        //        this.selected = valid = true;
        //        return false;
        //    }
        //});

        //// Found a match, nothing to do
        //if (valid) {
        //    return;
        //}

        //// Remove invalid value
        //this.input
        //    .val("")
        //    .attr("title", value + " didn't match any item")
        //    .tooltip("open");
        //this.element.val("");
        //this._delay(function () {
        //    this.input.tooltip("close").attr("title", "");
        //}, 2500);
        //this.input.autocomplete("instance").term = "";
    },
    getValue: function () {
        return this.input.val();
    },
    setValue: function (val) {
        this.input.val(val)
    },
    _destroy: function () {
        this.wrapper.remove();
        this.element.show();
    }
});

$(function () {
    methods.init();
});