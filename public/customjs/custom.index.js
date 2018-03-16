$(document).ready(function () {



    var UserTable = $('#myTable').DataTable({


        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/fetchuserByAjax",
            "data": function (d) {
                d.date_start = $('#min').val();  // 2015-01-01
                d.date_end = $('#max').val();  // 2017-01-01
            },
        },


         cache: false,
         rowId: 'id',
        "pagingType": "simple_numbers",
        "dom": 'flriptB',                 //    { filter } { length } { info } { paging }  { table }

        // adding CSV EXCEL BUTTON
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],


         stateSave: true,                //  saving the state of a table
        // "order": [],                 // removing Order
        // "scrollX": true,Mer
        // place holder to the default Search Box ( The one in the Top Right corner)
        language: {
            // search: "_INPUT_",
            "searchPlaceholder": "Search By Name",
            "decimal":        "",
            "emptyTable":     "No records Found. Please Search Again",
            "info":           "Showing _START_ to _END_ of _TOTAL_ entries",
            "infoEmpty":      "Showing 0 to 0 of 0 entries",
            "infoFiltered":   "(filtered from _MAX_ total records)",
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     "Show _MENU_ entries per page",
            "loadingRecords": "Loading...",
            // "processing":     "Loading , Please Wait",
            "processing":     '<i class="fa-spin fa fa-cog fa-pulse fa-3x fa-fw"></i><span class="sr-only"></span>',
            "search":         "Search:",
            "zeroRecords":    "No records to display",
            "paginate": {
                "first":      "First",
                "last":       "Last",
                "next":       "Next",
                "previous":   "Previous"
            },
            "aria": {
                "sortAscending":  ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        },

        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,     // hiding Column
                "searchable": false,
                "orderable": false,  // disabling Orderable

            },
            {
                "targets": [ 1 ],
                "orderable": false,

                "render": function ( data, type, row ) {    // Combining two OR more Column
                    return data +' ('+ row[4]+')';
                },
            },
            {
                "targets": [ 2 ],
                "orderable": false
            },
            {
                "targets": [ 3 ],
                "orderable": false
            },
            {
                "targets": [ 4 ],
                "orderable": true
            },

        ],




    });


    $("div.toolbar").html('<b>This Is A Custom Toolbarrrrrrrr</b>');


    // adding a Search Field In the bottom every Column except Address

    $('#myTable tfoot th').each( function () {
        var title = $('#myTable thead th').eq( $(this).index() ).text();
        if(title != 'Name'){
            $(this).html( '<input type="text" placeholder="Search by '+title+'" />' );
        }

    } );


    UserTable.columns().every( function () {
        var column = this;
        $( 'input', this.footer() ).on( 'keyup change', function () {
            column
                .search( this.value )
                .draw();
        } );
    } );



    // reloading table after clearing the state (page Number , Column search)
    $('.basic_table').on('click',function (event) {
        UserTable.state.clear();
        UserTable.ajax.reload();

    });


    // Clicking in any row & getting the Data

    $('#myTable tbody').on('click', 'tr', function () {
        var data = UserTable.row( this ).data();
        alert( 'You clicked on '+data[0]+'\'s row' );
    });



    $('.search_table').on('click',function () {
        console.log("searching");
        UserTable.ajax.reload();           // reloading the ajaxxx
    })


});






