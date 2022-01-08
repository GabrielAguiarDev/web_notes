<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

$("body").on('click', function (e) {
    if ($(e.target).closest(".config").length === 0) {
        $(".config").removeClass("activeConfig");
    }
});

    