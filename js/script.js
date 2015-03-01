"use strict";


$(function() {
    var $gallery = $('#FlickrImages');
    var flick_url = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?";
    $.getJSON(flick_url, function(data) {
        var dragid = 1;
        $.each(data.items, function(i, item) {
            //$("<img/>").attr({"src":item.media.m, "title": item.author+', '+item.title}).appendTo($gallery);
            $("<img/>").attr({"src": item.media.m, "title": item.title})
                .attr({"draggable": true, "id": "drag_" + dragid++})
                .appendTo($gallery)
                .wrap('<div class="col-xs-4 col-sm-4 col-md-4"  ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
        });
    });
});

var WGSN = null;
$(function() {
    WGSN = new Wgsn("#wgsn_canvas");
    WGSN.setBackgroundColor("#fff");

    $("body").on("click", ".search img", function() {
        WGSN.addLayer($(this).context).setTitle($(this).attr("title"));
        updateLayers(WGSN.getLayers());
        $("#layer_" + (WGSN.getLayers().length - 1)).addClass("selected");
    });

    $("body").on("click", ".layers .layer", function() {
        $(".layers .layer").removeClass("selected");
        $(this).addClass("selected");
    });

    $(".layers .background .visible").click(function() {
        if ($(this).html() == "") {
            WGSN.setBackgroundImage($(".layers .background img")[0]);
            $(this).html("&radic;");
        } else {
            WGSN.setBackgroundImage(null);
            $(this).html("");
        }
    });

    $("body").on("click", ".layers .layer .visible", function() {
        if ($(this).html() == "") {
            $(this).html("&radic;");
        } else {
            $(this).html("");
        }
        WGSN.getLayer($(this).parent().attr("id").substr(6)).toggleVisible();
        WGSN.redraw();
    });

    $("body").on("dragstart", ".search img", function(event) {
        drag(event);
    });
});

function getSelectedLayer() {
    if ($(".layers .selected").length == 0) {
        return null;
    }
    return WGSN.getLayer($(".layers .selected").attr("id").substr(6))
}

function updateLayers(layers) {
    $(".layers li.layer").remove();
    for (var i in layers) {
        $(".layers > ul").prepend(createLayerRow(i, layers[i]));
    }
}

function createLayerRow(id, layer) {
    var row = $("<li></li>").addClass("layer").attr("id", "layer_" + id);
    var icon = $("<img/>").attr("src", layer.getImage().src);
    var heading = $("<h3></h3>").text(layer.getTitle().substr(0, 14));
    var visible = $("<div></div>").addClass("visible");
    if (layer.isVisible()) {
        visible.html("&radic;");
    }

    row.append(icon).append(heading).append(visible);

    return row;
}
