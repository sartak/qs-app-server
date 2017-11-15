function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function loadEvents (progress, complete, failure, url) {
    jQuery.ajax({
        url: url || "/api/events?fields=timestamp",
        cache: false,
        headers: {
            'X-QS-Username': getParameterByName('user'),
            'X-QS-Password': getParameterByName('pass')
        },
        error: function (xhr, description, error) {
            failure(description, error);
        },
        success: function (data) {
            if (data.results && data.results.length) {
                progress(data.results);
            }

            if (data.nextPage) {
                loadEvents(progress, complete, failure, data.nextPage);
            }
            else {
                complete();
            }
        }
    });
}

jQuery(function () {
    loadEvents(function (events) {
    }, function () {
    }, function (description, error) {
        alert(description + " " + error);
    });
});
