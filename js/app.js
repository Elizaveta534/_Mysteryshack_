window.addEventListener('scroll', e => {
	document.documentElement.style.setProperty('--scrollTop', `${this.scrollY}px`) // Update method
})
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
ScrollSmoother.create({
	wrapper: '.wrapper',
	content: '.content'
})
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6
})
document.addEventListener("DOMContentLoaded", function (e) {
    let mainphotoimg = document.querySelector(".mainphotoimg ");
    let photos = document.querySelectorAll("img");
  
    if (photos.length != 0) {
      photos.forEach(function (item) {
        item.addEventListener("click", function (event) {
          mainphotoimg.src = item.src;
          item.classList.remove("photoselect");
  
          let photoselect = document.querySelector(".photoselect");
          photoselect.classList.remove("photoselect");
          item.classList.add("photoselect");
        });
      });
    }
  
    let buttons = document.querySelectorAll("button");
    let inftabs = document.querySelectorAll(".inftabs");
  
    if (buttons.length != 0) {
      buttons.forEach(function (item) {
        item.addEventListener("click", function (event) {
          if (inftabs.length != 0) {
            inftabs.forEach(function (inftab) {
              if (item.dataset.type == inftab.dataset.type) {
                inftab.classList.remove("nonvisable");
              } else {
                inftab.classList.add("nonvisable");
              }
            });
          }
  
          let butselect = document.querySelector(".butselect");
          butselect.classList.remove("butselect");
          item.classList.add("butselect");
        });
      });
    }
  });


  $(function(){
  
    var $window = $(window);    //Window object
    
    var scrollTime = 1.2;     //Scroll time
    var scrollDistance = 170;   //Distance. Use smaller value for shorter scroll and greater value for longer scroll
      
    $window.on("mousewheel DOMMouseScroll", function(event){
      
      event.preventDefault(); 
                      
      var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
      var scrollTop = $window.scrollTop();
      var finalScroll = scrollTop - parseInt(delta*scrollDistance);
        
      TweenMax.to($window, scrollTime, {
        scrollTo : { y: finalScroll, autoKill:true },
          ease: Power1.easeOut, //For more easing functions see https://api.greensock.com/js/com/greensock/easing/package-detail.html
          autoKill: true,
          overwrite: 5              
        });
            
    });
    
  });
  $('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});
$(document).ready(function(){
  $('.login').click(function(){
      $('.modal-content').fadeIn();
  });
  $('#map').click(function(){
      $('.modal-content-map').fadeIn();
  });
  $('.modal-content-close').click(function(){
      $('.modal-content').fadeOut();
  });
  $('.modal-content-map-close').click(function() {
    $('.modal-content-map').fadeOut(); 
  });
})
// Whenever we're ready, run this
$(function() {
  
  // Global vars
  $.bgTemplates = {
    wrapper: $("#bg-templates"),
    logoExtension: null,
    validExtensions: ["jpg", "jpeg", "png", "tif", "tiff", "gif"],
    variationId: null,
    variationInputs: {},
    openS3RequestCount: null,
    submitText: {
      loading: "Loading...",
      init: "Create Video",
      done: "Thank You!"
    }
  };

  // Grab data
  $.bgTemplates.vendorToken = $.bgTemplates.wrapper.data("vendor");
  $.bgTemplates.templateId = $.bgTemplates.wrapper.data("template");

  // Add stylesheets
  $("<link/>", {
    rel: "stylesheet",
    href: "https://s3.amazonaws.com/blendergrid-templates/css/bg-templates.css"
  }).appendTo($.bgTemplates.wrapper);
  $("<link/>", {
    rel: "stylesheet",
    href: "https://s3.amazonaws.com/blendergrid-templates/css/wheelcolorpicker.css"
  }).appendTo($.bgTemplates.wrapper);

  // Add vimeo sample to the bg-templates div
  var videoCode = $.bgTemplates.wrapper.data("video-sample");
  if (videoCode !== undefined && videoCode !== "") {
    var $embedContainer = $("<div/>", {
      class: "embed-container"
    }).appendTo($.bgTemplates.wrapper);
    $("<iframe/>", {
      src:
        "https://player.vimeo.com/video/" +
        videoCode +
        "?color=1E90FF&title=0&byline=0&portrait=0",
      frameborder: "0",
      webkitallowfullscreen: "",
      mozallowfullscreen: "",
      allowfullscreen: ""
    }).appendTo($embedContainer);
  }
  
  // Load the input fields needed for the variation and append them
  // Only if the BG Animation Partner has finished his registration properly (address & payment method)
  $.ajax({
    // "async": true,
    // "crossDomain": true,
    "url": "https://blendergrid.com/api/templates/" + $.bgTemplates.templateId + "/input-fields",
    // "method": "GET",
    "headers": {
      // "Content-Type": "application/json",
      "Authorization": $.bgTemplates.vendorToken,
      // "Cache-Control": "no-cache"
    },
    // "processData": false,
  }).done(function(data) {
    
    // Create the form element
    $.bgTemplates.form = $("<form/>").appendTo($.bgTemplates.wrapper);
    
    $.each(data, function(i, field) {
      console.log("FIELD:", field);
      
      // Create a span as the label
      $("<span/>", {
        class: "feedback " + field.name
      })
        .text(field.label)
        .appendTo($.bgTemplates.form);
      
      // Create an input
      var $input = $("<input/>", {
        type: field.type,
        name: field.name
      });
      
      // Add a placeholder
      if (field.placeholder) {
        $input.attr("placeholder", field.placeholder);
      }
      
      // Apply the color wheel if it's a color
      if (field.color) {
        $input.wheelColorPicker({
          format: "css",
          sliders: "wsv",
          preview: "true",
          mobile: true,
          autoResize: false
        });
      }
      
      // Add the input to the form
      $input.appendTo($.bgTemplates.form);
      
      // Keep track of this input for uploading to S3 later
      var extension = null;
      if (field.type === "text") {
        extension = "txt";
      }
      $.bgTemplates.variationInputs[field.name] = {
        input : $input,
        type  : field.type,
        ext   : extension
      };
    });
    
    // Add the email input
    $("<span/>", {
      class: "feedback email"
    }).text("Enter your email address (so we can send you the video)")
      .appendTo($.bgTemplates.form);
    $("<input/>", {
      type: "email",
      name: "email",
      placeholder: "Email"
    }).appendTo($.bgTemplates.form);
    
    // Add the submit button and feedback elements
    $("<input/>", {
      type: "submit",
      value: $.bgTemplates.submitText.loading,
      disabled: "true"
    }).appendTo($.bgTemplates.form);
    $("<ul/>", {
      class: "feedback list"
    }).appendTo($.bgTemplates.form);
    $("<span/>", {
      class: "feedback message"
    }).appendTo($.bgTemplates.form);
    
    // Initialize submit button
    $.bgTemplates.form
      .children("input[type='submit']")
      .val($.bgTemplates.submitText.init)
      .prop("disabled", false);
    
    // On form submit
    $.bgTemplates.form.on("submit", function(e) {
      e.preventDefault();

      // Reset all previous feedback
      resetFeedback();
      var $inputs = $.bgTemplates.form.children("input");
      var formValid = true;
      var formData = {};
      $.bgTemplates.openS3RequestCount = 0;

      // Verify all inputs
      $inputs.each(function() {
        var $input = $(this);
        var inputType = $input.attr("type");
        var inputName = $input.attr("name");
        var inputVal = $input.val();

        console.log("checking", inputType);

        switch (inputType) {
          // File input
          case "file":
            // If no file is selected
            if (inputVal === "") {
              formValid = false;
              feedback(inputName, "Please select an image above");
              break;
            }

            // Get the extension of the selected file
            $.bgTemplates.variationInputs[inputName].ext = inputVal.split(".").pop().toLowerCase();
            console.log("extension", $.bgTemplates.variationInputs[inputName].ext);

            // If it has the wrong extension
            if (
              $.bgTemplates.validExtensions.indexOf(
                $.bgTemplates.variationInputs[inputName].ext
              ) === -1
            ) {
              formValid = false;
              feedback(
                inputName,
                "We can't handle '." +
                  $.bgTemplates.variationInputs[inputName].ext +
                  "' files.. Please upload an image with one of the following formats: [" +
                  $.bgTemplates.validExtensions.join() +
                  "]"
              );
            }

            break;

          // Email input
          case "email":

            // If no email address is filled in
            if (inputVal === "") {
              formValid = false;
              feedback(inputName, "Please enter your email address above");
            }

            break;

          // Website url input
          case "text":
            // If no text is filled in
            if (inputVal === "") {
              formValid = false;
              feedback(inputName, "Please fill in a valid " + inputName);
            }

            // If it's a website
            if (inputName === "website") {

              // Check if it's a valid url
              regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
              if (!regexp.test(inputVal)) {
                formValid = false;
                feedback(inputName, "Please fill in a valid " + inputName);
              }
            }

            break;

          // Submit button
          case "submit":
            // Start spinning the submit button
            $input.addClass("loading").val("");
        }

        formData[inputName] = inputVal;
      });

      if (formValid) {
        // Start making the render request to Blendergrid
        createVariation({ name: formData.email });

        // Disable the input fields
        $inputs.prop("disabled", true);
      } else {
        // Re-enable the input fields
        $inputs.prop("disabled", false);

        // Reset the submit button
        $.bgTemplates.form
          .children("input[type='submit']")
          .removeClass("loading")
          .val($.bgTemplates.submitText.init);
      }
    });
  });
  }).fail(function(data) {
    var errorMsg = "Unknown Error Happened.."
    if (data.responseJSON && data.responseJSON.error) {
      errorMsg = data.responseJSON.error;
    }
    $("<span/>", {
      class: "feedback message highlight"
    }).text(errorMsg).appendTo($.bgTemplates.form);
  });

// Function to show feedback about the form
function feedback(name, message) {
  console.log(message);
  $.bgTemplates.form
    .children(".feedback." + name + ", input[name='" + name + "']")
    .addClass("highlight");
  $.bgTemplates.form
    .children(".feedback.list")
    .append("<li>" + message + "</li>");
}

// Function to reset all feedback
function resetFeedback() {
  $.bgTemplates.form.children("input, .feedback").removeClass("highlight");
  $.bgTemplates.form.children(".feedback.list, .feedback.message").empty();
}

// Function to create a new Template Variation
function createVariation(data) {
  console.log("creating variation", data);
  bgApi(
    "templates/" + $.bgTemplates.templateId + "/variation",
    data,
    uploadVariationData, // DONE
    function(xhr) {
      // FAIL
      $.bgTemplates.form
        .children("input[type='submit']")
        .removeClass("loading")
        .val($.bgTemplates.submitText.init);
      console.error("creating variation failed...", xhr);
      var errorMsg = "Something went wrong";
      if (xhr.responseJSON && xhr.responseJSON.error) {
        errorMsg = xhr.responseJSON.error;
      }
      $(".feedback.message")
        .addClass("highlight")
        .text("Error: " + errorMsg);
        
        // Re-enable the input fields
        $.bgTemplates.form.children("input").prop("disabled", false);
    },
    function() {} // ALWAYS
  );
}

// Function to upload the variation
function uploadVariationData(data) {
  if (data.error) {
    console.error(data);
    $(".feedback.message")
      .addClass("highlight")
      .text("Error: " + data.error);
    return;
  }

  // Grab the variation ID
  $.bgTemplates.variationId = data.s3_policy.variation_id;
  
  // Loop through all variation inputs
  for (var name in $.bgTemplates.variationInputs) {
    
    // Get the file or text value of the input
    var file = null;
    if ($.bgTemplates.variationInputs[name].type === "file") {
      console.log("Found file input:", name);
      file = $.bgTemplates.variationInputs[name].input[0].files[0];
    } else {
      console.log("Found plain text input:", name);
      file = $.bgTemplates.variationInputs[name].input.val();
    }
    
    // Build the data to be sent to S3
    var formData = new FormData();
    formData.append("key", data.s3_policy.key + name + "." + $.bgTemplates.variationInputs[name].ext);
    formData.append("AWSAccessKeyId", data.s3_policy.s3_public_key);
    formData.append("acl", "private");
    formData.append("success_action_status", "201");
    formData.append("policy", data.s3_policy.base64_policy);
    formData.append("signature", data.s3_policy.signature);
    formData.append("file", file);
    
    // Send it
    console.log("uploading variation data", data);
    $.bgTemplates.openS3RequestCount += 1;
    $.ajax({
      crossDomain: true,
      url: "https://s3.amazonaws.com/blendergrid-production-us-east-1/",
      method: "POST",
      headers: {
        "Cache-Control": "no-cache"
      },
      processData: false,
      contentType: false,
      data: formData
    }).done(startRender).fail(function(xhr) {
        $.bgTemplates.form
          .children("input[type='submit']")
          .removeClass("loading")
          .val("Create Video");
        console.error("uploading variation data failed...", xhr);
        var errorMsg = "Could not upload logo";
        if (xhr.responseJSON && xhr.responseJSON.error) {
          errorMsg = xhr.responseJSON.error;
        }
        $(".feedback.message")
          .addClass("highlight")
          .text("Error: " + errorMsg);
        
        // Re-enable the input fields
        $.bgTemplates.form.children("input").prop("disabled", false);
    });
  }
}

// Function to start rendering
function startRender(data) {
  
  $.bgTemplates.openS3RequestCount -= 1;
  console.log("S3 Request done, remaining open requests:", $.bgTemplates.openS3RequestCount);
  
  // If there's still any open S3 Requests, don't start the render yet
  if ($.bgTemplates.openS3RequestCount > 0) {
    console.log("Not starting the render yet...");
    return;
  }
  
  console.log("Starting render :D");
  
  bgApi(
    "templates/" + $.bgTemplates.templateId + "/start-render",
    { variation_id: $.bgTemplates.variationId },
    success, // DONE
    function(xhr) {
      // FAIL
      $.bgTemplates.form
        .children("input[type='submit']")
        .removeClass("loading")
        .val("Create Video");
      console.error("starting render failed...", xhr);
      var errorMsg = "Something went wrong";
      if (xhr.responseJSON && xhr.responseJSON.error) {
        errorMsg = xhr.responseJSON.error;
      }
      $(".feedback.message")
        .addClass("highlight")
        .text("Error: " + errorMsg);
        
        // Re-enable the input fields
        $.bgTemplates.form.children("input").prop("disabled", false);
    },
    function() {} // ALWAYS
  );
}

function bgApi(endpoint, data, done, fail, always) {
  $.ajax({
    crossDomain: true,
    url: "https://blendergrid.com/api/" + endpoint,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: $.bgTemplates.vendorToken,
      "Cache-Control": "no-cache"
    },
    data: JSON.stringify(data)
  })
    .done(done)
    .fail(fail)
    .always(always);
}

function success(data) {
  console.log("render started", data);

  $.bgTemplates.form
    .children("input[type='submit']")
    .removeClass("loading")
    .val($.bgTemplates.submitText.done);
  $(".feedback.message").text(
    "We will start creating your video and send you an email when it's done!"
  );
}
