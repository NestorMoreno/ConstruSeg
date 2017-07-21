var result = {
    getDangers: function (result) {
        if (result.success) {
            $('#danger')
                .append($("<option></option>")
                    .attr("value", 0)
                    .text("Seleccione un peligro..."));
            if (result.data) {
                $.each(result.data, function (i, item) {
                    $('#danger')
                        .append($("<option></option>")
                            .attr("value", item.Value)
                            .text(item.Text));
                });
            }
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener Peligros. " + result.message);
        }
    },
    getAllEffects: function (result) {
        if (result.success) {
            $("#modalEffectTable").empty()
            $('#modalEffectTable')
                .append("<tr><th>Efecto</th><th>Adicionar</th></tr>");
            if (result.data) {
                $.each(result.data, function (i, item) {
                    $('#effect')
                        .append($("<option></option>")
                            .attr("value", item.Value)
                            .text(item.Text));
                    
                    $('#modalEffectTable')
                        .append($("<tr><td>" + item.Text + "</td><td><button type='button' class='btn btn-success addEffect' data-id=" + item.Value + ">+</button></td></tr>"));
                });
                $(document).on('click', '.addEffect', methods.addEffectModal);
            }
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener Efectos. " + result.message);
        }
    },
    getEffects: function (result) {
        if (result.success) {
            $('#effectTable').empty();
            $('#effectTable')
                .append($("<tr>")
                    .append("<th>Efecto"));
            if (result.data) {
                $.each(result.data, function (i, item) {
                    $('#effectTable')
                        .append($("<tr><td>" + item.Text + "</td></tr>"));
                });
            }
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener Efectos. " + result.message);
        }
    },
    getAllRecommendations: function (result) {
        if (result.success) {
            $("#modalRecommendationTable").empty()
            $('#modalRecommendationTable')
                .append("<tr><th>Recomendación</th><th>Adicionar</th></tr>");
            if (result.data) {
                $.each(result.data, function (i, item) {
                    $('#recommendation')
                        .append($("<option></option>")
                            .attr("value", item.Value)
                            .text(item.Text));
                    $('#modalRecommendationTable')
                        .append($("<tr><td>" + item.Text + "</td><td><button type='button' class='btn btn-success addRecommendation' data-id=" + item.Value + ">+</button></td></tr>"));
                });
                $(document).on('click', '.addRecommendation', methods.addRecommendationModal);
            }
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener todas las Recomendaciones. " + result.message);
        }
    },
    getRecommendations: function (result) {
        $('#recommendationTable').empty();
        if (result.success) {
            $('#recommendationTable')
                .append("<tr><th>Tipo</th><th>Recomendación</th></tr>");
            if (result.data) {
                $.each(result.data, function (i, item) {
                    $('#recommendationTable')
                        .append("<tr><td>" + item.TipoRecomendacion + "</td><td>" + item.Nombre + "</td></tr>");
                });
            }
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener Recomendaciones. " + result.message);
        }
    },
    getRecommendationsType: function (result) {
        if (result.success) {
            if (result.data) {
                $.each(result.data, function (i, item) {
                    $('#recommendationType')
                        .append($("<option></option>")
                            .attr("value", item.Value)
                            .text(item.Text));
                });
            }
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener Tipos de Recomendaciones. " + result.message);
        }
    },
    getAllControls: function (result) {
        if (result.success) {
            $("#modalControlTable").empty()
            $('#modalControlTable')
                .append("<tr><th>Control</th><th>Adicionar</th></tr>");
            if (result.data) {
                $.each(result.data, function (i, item) {
                    $('#control')
                        .append($("<option></option>")
                            .attr("value", item.Value)
                            .text(item.Text));

                    $('#modalControlTable')
                        .append($("<tr><td>" + item.Text + "</td><td><button type='button' class='btn btn-success addControl' data-id=" + item.Value + ">+</button></td></tr>"));
                });
                $(document).on('click', '.addControl', methods.addControlModal);
            }
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener todos los Controles. " + result.message);
        }
    },
    getControls: function (result) {
        $('#controlTable').empty();
        if (result.success) {
            $('#controlTable')
                .append("<tr><th>Comodín</th><th>Control</th></tr>");
            if (result.data) {
                $.each(result.data, function (i, item) {
                    $('#controlTable')
                        .append("<tr><td>" + item.Comodin + "</td><td>" + item.Nombre + "</td></tr>");
                });
            }
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar obtener Controles. " + result.message);
        }
    },
    saveNewEffect: function (result) {
        if (result.success) {
            $('#effect').combobox('setValue');
            $("#effectDescription").val("");
            $('#modalEffect').modal('hide');
            methods.getAllEffects();
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar guardar Efecto. " + result.message);
        }
    },
    saveNewRecommendation: function (result) {
        if (result.success) {
            $('#recommendation').combobox('setValue');
            $("#recommendationDescription").val("");
            $('#modalRecommendation').modal('hide');
            methods.getAllRecommendations();
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar guardar Recomendación. " + result.message);
        }
    },
    saveNewControl: function (result) {
        if (result.success) {
            $('#control').combobox('setValue');
            $("#controlDescription").val("");
            $('#modalControl').modal('hide');
            methods.getAllControls();
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar guardar Control. " + result.message);
        }
    },
    addEffect: function (result) {
        if (result.success) {
            methods.getEffects();
            $('#modalEffect').modal('hide');
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar adicionar Efecto. " + result.message);
        }
    },
    addRecommendation: function (result) {
        if (result.success) {
            methods.getRecommendations();
            $('#modalRecommendation').modal('hide');
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar adicionar Recomendación. " + result.message);
        }
    },
    addControl: function (result) {
        if (result.success) {
            methods.getControls();
            $('#modalControl').modal('hide');
        }
        else {
            msgAccept(1, "Construcción Segura", "Se presentó error al intentar adicionar Control. " + result.message);
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
            $('#effectDescription').val($('#effect').combobox('getValue'));
        });
        $('#btnNewRecommendation').click(function () {
            $('#recommendationDescription').val($('#recommendation').combobox('getValue'));
        });
        $('#btnNewControl').click(function () {
            $('#controlDescription').val($('#control').combobox('getValue'));
        });
        
        $("#formEffect").validate({
            submitHandler: methods.saveNewEffect
        });
        $("#formRecommendation").validate({
            submitHandler: methods.saveNewRecommendation
        });
        $("#formControl").validate({
            submitHandler: methods.saveNewControl
        });

        $("#btnAddEffect").click(methods.addEffect);
        $("#btnAddRecommendation").click(methods.addRecommendation);
        $("#btnAddControl").click(methods.addControl);
    },
    selectedDanger: function (show) {
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
            methods.getEffects();
            methods.getAllEffects();
            methods.getAllRecommendations();
            methods.getRecommendations();
            methods.getAllControls();
            methods.getControls();
        }
        else {
            methods.selectedDanger(false);
        }
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
        var data = {};
        var ajax = new AjaxHttpSender();
        ajax.sendPost('../Home/GetAllRecommendations/', data, result.getAllRecommendations);
    },
    getRecommendations: function () {
        var idDanger = $('#danger').val();
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
        var data = {};
        var ajax = new AjaxHttpSender();
        ajax.sendPost('../Home/GetControlsList/', data, result.getAllControls);
    },
    getControls: function() {
        var idDanger = $('#danger').val();
        if (idDanger && idDanger > 0) {
            var data = '{ id: null, idDanger:' + idDanger + ' }';
            var ajax = new AjaxHttpSender();
            ajax.sendPost('../Home/GetControls/', data, result.getControls);
        }
    },
    saveNewEffect: function () {
        $.ajax({
            url: "../Home/SaveNewEffect/",
            type: "post",
            data: { name: $("#effectDescription").val() },
            success: result.saveNewEffect
        });
    },
    saveNewRecommendation: function () {
        $.ajax({
            url: "../Home/SaveNewRecommendation/",
            type: "post",
            data: { idDanger: $('#danger').val(), idType: $("#recommendationType").val(), name: $("#recommendationDescription").val() },
            success: result.saveNewRecommendation
        });
    },
    saveNewControl: function () {
        $.ajax({
            url: "../Home/SaveNewControl/",
            type: "post",
            data: { idType: 1, name: $("#controlDescription").val(), wilcard: $("#controlWilcard").val() },
            success: result.saveNewControl
        });
    },
    addEffect: function () {
        var value = $('#effect').combobox('getValue').toLowerCase();
        valid = false;
        var id = 0;

        $("#effect").children("option").each(function () {
            if ($(this).text().toLowerCase() === value) {
                id = $(this).val();
                this.selected = valid = true;
                return false;
            }
        });

        if (valid) {
            $.ajax({
                url: "../Home/AddEffect/",
                type: "post",
                data: { id: id, idDanger: $("#danger").val() },
                success: result.addEffect
            });
        }
    },
    addRecommendation: function () {
        var value = $('#recommendation').combobox('getValue').toLowerCase();
        valid = false;
        var id = 0;

        $("#recommendation").children("option").each(function () {
            if ($(this).text().toLowerCase() === value) {
                id = $(this).val();
                this.selected = valid = true;
                return false;
            }
        });

        if (valid) {
            $.ajax({
                url: "../Home/AddRecommendation/",
                type: "post",
                data: { id: id, idDanger: $("#danger").val() },
                success: result.addRecommendation
            });
        }
    },
    addControl: function () {
        var value = $('#control').combobox('getValue').toLowerCase();
        valid = false;
        var id = 0;

        $("#control").children("option").each(function () {
            if ($(this).text().toLowerCase() === value) {
                id = $(this).val();
                this.selected = valid = true;
                return false;
            }
        });

        if (valid) {
            $.ajax({
                url: "../Home/AddControl/",
                type: "post",
                data: { id: id, idDanger: $("#danger").val() },
                success: result.addControl
            });
        }
    },
    addEffectModal: function () {
        var item = $(this);
        var id = item.data("id");
        $.ajax({
            url: "../Home/AddEffect/",
            type: "post",
            data: { id: id, idDanger: $("#danger").val() },
            success: result.addEffect
        });
    },
    addRecommendationModal: function () {
        var item = $(this);
        var id = item.data("id");
        $.ajax({
            url: "../Home/AddRecommendation/",
            type: "post",
            data: { id: id, idDanger: $("#danger").val() },
            success: result.addRecommendation
        });
    },
    addControlModal: function () {
        var item = $(this);
        var id = item.data("id");
        $.ajax({
            url: "../Home/AddControl/",
            type: "post",
            data: { id: id, idDanger: $("#danger").val() },
            success: result.addControl
        });
    },
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