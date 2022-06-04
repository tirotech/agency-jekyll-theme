$(function() {
  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      $("#sendMessageButton").prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages

      var formData = $form.serialize()
      var url = $("#contactForm").attr("action");

      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        cache: false,

		    success: function() {
          $('#email-success').fadeIn()
          $('#contactForm').trigger("reset");
        },

        error: function() {
          $('#email-error').fadeIn()
          $('#contactForm').trigger("reset");
        },

        complete: function() {
          setTimeout(function() {
            $("#sendMessageButton").prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on form hide fail/success boxes */
$('#name').on('focus', function() {
  $('#email-success').fadeOut();
  $('#email-error').fadeOut();
});
