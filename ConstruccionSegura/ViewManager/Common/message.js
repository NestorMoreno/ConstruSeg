// HTML structure for the message
var htmlBase = '<div id="msgModal" class="modal" style="display:block;">' +
                        '<div class="modal-dialog">' +
                            '<div class="modal-content">' +
                                '<div class="modal-header">' +
                                    '<button type="button" class="close msgClose" id="btnCerrarMensaje" data-dismiss="modal" aria-hidden="true">×</button>' +
                                    '<h4 class="modal-title [TITLECLASS]"><i class="icon-[ICONCLASS]"></i>[TITLE]</h4>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                    '<p>[MESSAGE]</p>' +
                                '</div>' +
                                '<div class="modal-footer">' +
                                    '<button id="btnCloseMsg" type="button" class="btn btn-default msgClose" data-dismiss="modal" style="display:none;" >Cerrar</button>' +
                                    '<button id="btnAcceptMsg" type="button" class="btn btn-primary">Aceptar</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

// Allows to show a message
var msgAccept = function (type, title, message) {
    htmlPopUp = htmlBase;
    $("#msgModal").hide();
    $("#msgModal").remove();
    // Message type
    switch (type) {
        case 1:
            htmlPopUp = htmlPopUp.replace("[TITLECLASS]", "alerta").replace("[ICONCLASS]", "success");
            break;
        case 2:
            htmlPopUp = htmlPopUp.replace("[TITLECLASS]", "success").replace("[ICONCLASS]", "info");
            break;
        case 3:
            htmlPopUp = htmlPopUp.replace("[TITLECLASS]", "alerta").replace("[ICONCLASS]", "warning");
            break;
        case 4:
            htmlPopUp = htmlPopUp.replace("[TITLECLASS]", "alerta").replace("[ICONCLASS]", "danger");
            break;
        default:    
    }    
    // Formatting message
    htmlPopUp = htmlPopUp.replace("[TITLE]", title).replace("[MESSAGE]", message);
    $("body").append(htmlPopUp);
    // Adding events
    $('#msgModal').on('click', '.msgClose', function () {
        $("#msgModal").hide();
        $("#msgModal").remove();
    });
    
    $('#msgModal').on('click', '#btnAcceptMsg', function () {
        $("#msgModal").hide();
        $("#msgModal").remove();        
    });
    // Focus on Accept button
    $('#btnAcceptMsg').focus();
};

// Allows to show a confirmation message
var msgConfirmation = function (type, title, message, callback) {
    htmlPopUp = htmlBase;
    // Message type
    switch (type) {
        case 'alerta':
            htmlPopUp = htmlPopUp.replace("[TITLECLASS]", "alerta").replace("[ICONCLASS]", "alerta");
        case 'exitoso':
            htmlPopUp = htmlPopUp.replace("[TITLECLASS]", "success").replace("[ICONCLASS]", "exitoso");
            break;
        default:
    }
    // Formatting message
    htmlPopUp = htmlPopUp.replace("[TITLE]", title).replace("[MESSAGE]", message);
    $("body").append(htmlPopUp);
    $('#btnCloseMsg').show();

    // Adding events
    if (callback != '') {
        $('#msgModal').on('click', '#btnAcceptMsg', function () {
            eval(callback);
        });
    }

    $('#msgModal').on('click', '.msgClose', function () {
        $("#msgModal").hide();
        $("#msgModal").remove();
    });
    // Focus on Accept button
    $('#btnAcceptMsg').focus();
};


// Allows to show a confirmation message with callback
var msgConfirmationCallback = function (type, title, message, callback) {
    htmlPopUp = htmlBase;
    // Message type
    switch (type) {
        case 'alerta':
            htmlPopUp = htmlPopUp.replace("[TITLECLASS]", "alerta").replace("[ICONCLASS]", "alerta");
        case 'exitoso':
            htmlPopUp = htmlPopUp.replace("[TITLECLASS]", "success").replace("[ICONCLASS]", "exitoso");
            break;
        default:
    }
    // Formatting message
    htmlPopUp = htmlPopUp.replace("[TITLE]", title).replace("[MESSAGE]", message);
    $("body").append(htmlPopUp);
    $('#btnCloseMsg').show();

    // Adding events
    if (callback != '') {
        $('#msgModal').on('click', '#btnAcceptMsg', callback);
        $('#msgModal').on('click', '#btnAcceptMsg', function () {
            $("#msgModal").hide();
            $("#msgModal").remove();
        });
    }

    $('#msgModal').on('click', '.msgClose', function () {
        $("#msgModal").hide();
        $("#msgModal").remove();
    });
    // Focus on Accept button
    $('#btnAcceptMsg').focus();
};