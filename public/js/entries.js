let oFileIn;
let entries = [];

(function ($) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    oFileIn = document.getElementById('file_entries');
    if (oFileIn.addEventListener) {
        oFileIn.addEventListener('change', filePicked, false);
    }

    $('#upload_btn').click(function () {
        if (entries.length) {
            $('#upload_btn').addClass('d-none');
            $('#upload_label').removeClass('d-none');

            fetch('/API/entry/insert', {
                method: 'POST',
                body: JSON.stringify(entries),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status == 'success') {
                        toastr.success("Successfully added.");
                    } else {
                        toastr.error("An error has occured.");
                    }

                    $('#upload_btn').removeClass('d-none');
                    $('#upload_label').addClass('d-none');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });
})(jQuery);


function filePicked(oEvent) {
    let oFile = oEvent.target.files[0];
    let sFilename = oFile.name;
    let reader = new FileReader();

    reader.onload = function (e) {
        let data = e.target.result;
        let cfb = XLSX.read(data, { type: 'binary' });

        cfb.SheetNames.forEach(async function (sheetName) {
            try {
                // let sCSV = XLS.utils.make_csv(cfb.Sheets[sheetName]);
                entries = await XLS.utils.sheet_to_json(cfb.Sheets[sheetName]);
            } catch (err) {
                console.log(err);
            }
        });
    };

    reader.readAsBinaryString(oFile);
}