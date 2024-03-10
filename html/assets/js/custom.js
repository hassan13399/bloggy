/**
 * Created by audrey on 21/03/18.
 */

jQuery(function ($) {

    // get and show the selected file

    // $('.custom-file-input').change(function(e){
    //     $('.file-selected-wrapper').addClass('active');
    //     $('.file-selected-name').text(e.target.files[0].name);
    //     readURL(this);
    // });

    // Settings for score slide
    $('.score-slide').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // initialize all popovers
    $(function () {
        $('[data-toggle="popover"]').popover()
    });

});

// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//
//         reader.onload = function (e) {
//             $('.file-selected-image').attr('src', e.target.result);
//         }
//
//         reader.readAsDataURL(input.files[0]);
//     }
// }