$(window).ready(function(){
	var scroll = 0;
	var Height = $(window).outerHeight();
	$("body").css("height", Height);
	
	// prevent not number characters
	$(document).on("input", ".cellphone", function() {
		this.value = this.value.replace(/[^\d\.\-]/g,'');
	});
	
	function validateEmail(sEmail) {
		var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if (filter.test(sEmail)) {
			return true;
		} else {
			return false;
		}
	}
	
	$(".cellphone").val($.cookie("cellphone"));
	$(".email").val($.cookie("email"));
	
	$(".giftcard-types img").click(function(){
		var giftcardType = $(this).data('giftcard-type');
		$(".giftcard-types img").removeClass("active");
		$(this).addClass("active");
		$("input[name='data[productId]']").val($(".credit-type." + giftcardType + " div:visible:first").data("product-id"));
		var price = $(".credit-type > div:visible:first").data('price');
		$(".amount").val(price);
		$("input[name='data[productId]']").val($(".credit-type > div:visible:first").data("productId"));
		setAmounts();
		setProducts(giftcardType);
	});
	
	$(document).on('click', '.credit-type > div', function(){
		$(".credit-type > div").removeClass("active")
		$(this).addClass("active")
		$("#counter").val(1);
		var price = $(this).data('price');
		$(".amount").val(price);
		$("input[name='data[productId]']").val($(this).data("productId"));
		$("#product-type").html($(this).data("product-name"))
		setAmounts();
		setText();
	});
	
	$("#counter").change(function(){
		countBoxValue = parseInt($("#counter").val());
		setAmounts();
	});
	
	$("#increase").click(function(){
		countBoxValue = parseInt($("#counter").val());
		if (countBoxValue >= 1 && countBoxValue < 5) {
			$("#counter").val(countBoxValue + 1);
			setAmounts();
		}
	});
	
	$("#decrease").click(function(){
		countBoxValue = parseInt($("#counter").val());
		if (countBoxValue > 1) {
			$("#counter").val(countBoxValue - 1);
			setAmounts();
		}
	});
	
	$(document).on("input", ".cellphone", function() {
		this.value = this.value.replace(/[^\d\.\-]/g,'');
	});
	
	
	$(".button").click(function(){
		var checkCellphone = true;
		var checkEmail = true;
		$(".hint-email, .hint-cellphone").addClass("hide");
		$(".email, .cellphone").removeClass("error");
		var mobileNumber = $(".cellphone").val()
		var preCode = mobileNumber.substring(0, 3);
		var cellphoneBox = $('.cellphone').val();
		$("input[name='data[count]']").val($("#counter").val());
		
		if (cellphoneBox.length == 0) {
			$(".hint-cellphone span").html("شماره موبایل خود را وارد کنید.")
			$(".cellphone").addClass("error");
			$(".hint-cellphone").removeClass("hide");
			checkCellphone = false;
        } else if (cellphoneBox.length != 11 || (jQuery.inArray(preCode, ['090', '091', '092', '093', '099']) == -1))   {
			$(".hint-cellphone span").html("شماره وارد شده معتبر نیست.");
			$(".cellphone").addClass("error");
			$(".hint-cellphone").removeClass("hide");
			checkCellphone = false;
        }
		var sEmail = $('.email').val();
		if ($.trim(sEmail).length != 0 && !validateEmail(sEmail)) {
            $(".hint-email span").html('آدرس ایمیل صحیح نیست.');
			$(".email").addClass("error");
			$(".hint-email").removeClass("hide")
            checkEmail = false;
        }
		if (checkCellphone == false || checkEmail == false) {
			return;
		}
		$("input[name='data[cellphone]']").val($(".cellphone").val());
		$("input[name='data[email]']").val($(".email").val());
		
		if ($(".save-information input").prop('checked')) {
			$.cookie('cellphone', $(".cellphone").val());
			$.cookie('email', $(".email").val());
		}
		
		
		$(".load section:last-child").hide();
		$(".load > section:first-child p").text("انتقال به بانک")
		$(".load > section:first-child").show();
		$(".load").fadeIn();
		
		
		$.ajax({
			type: 'POST',
			url: "https://chr724.ir/services/v3/EasyCharge/BuyProduct",
			data: $('form#myForm').serialize(),
			async: false,
			contentType: "application/json",
			dataType: 'jsonp',
			crossDomain: true,
			success: function(data) {
				if (data.status == "Success") {
					window.location.href = data.paymentInfo.url;
				} else {
					$(".load section:first-child").hide();
					$(".load section:last-child").show();
					$(".load section:last-child p").html(data.errorMessage);
					$(".load").one("click", function() {
						$(this).fadeOut();
					});
				}
			},
			error: function(e) {
				$(".load section:first-child").hide();
				$(".load section:last-child").show();
				$(".load section:last-child p").html("در حال حاضر امکان برقراری ارتباط با سرور وجود ندارد. (خطا: " + e.status + ")<br>لطفاً بعداً مراجعه نمایید.", "خطا");
				$(".load").one("click", function() {
					$(this).fadeOut();
				});
			}
		});	
	});
	
	
	$(".cellphone, .email").click(function(){
		$(this).attr("placeholder", '');
		$(this).removeClass("error");
	});
	
	$.ajax({
		type: 'POST',
		url: "https://chr724.ir/services/v3/EasyCharge/initializeData",
		data: $('form#myForm').serialize(),
		async: false,
		contentType: "application/json",
		dataType: 'jsonp',
		crossDomain: true,
		success: function(data) {
			giftCards = data.products.giftCard;
			$.each(data.products.giftCard, function(key, value) {
				if (value != "") {
					$(".giftcard-types img[data-giftcard-type=" + key + "]").css("display", "inline-block");
				}
			});
			var giftcardType = $(".giftcard-types img:visible:first").data('giftcard-type');
			var imageDirection = "img/" + giftcardType + ".png";
			$(".credit-type." + giftcardType).show();
			var price=$(".itunes-card").data('price');
			$('.giftcard-types img:visible:first').addClass("active");
			setProducts(giftcardType);
			$(".load").fadeOut();
		},
		error: function(e) {
			$(".load section:first-child").hide();
			$(".load section:last-child").show();
			$(".load section:last-child p").html("در حال حاضر امکان برقراری ارتباط با سرور وجود ندارد. (خطا: " + e.status + ")<br>لطفاً بعداً مراجعه نمایید.", "خطا");
			$(".load").one("click", function() {
				$(this).fadeOut();
			});
		}
	});
	
	function setAmounts() {
		var count = $("#counter").val();
		var price = $(".amount").val();
		$("input[name='data[count]']").val(count);
		$("#product-price").html(price + "&nbsp" + "تومان");
		$("#product-count").html(count + "&nbsp" + "عدد");
		$("#final-price , .price").html((price * count) + "&nbsp" + "تومان");
		$("get-final-price").val(price)
	}
	
	function setProducts(giftcardType) {
		var options = "";
		$.each(giftCards[giftcardType], function(key, value) {
			options += '<div data-product-id="' + value.id + '" data-product-name="' + value.name + '" data-price="' + value.price + '"><div class="product-image ' + value.id + '"></div><div class="giftcard-price">' + value.price + ' تومان</div></div>';
		});
		$('.credit-type').html(options);
		$('.credit-type > div:first-child').addClass('active');
		$(".variable").val($(".credit-type > div:first").data("price"));
		$("input[name='data[productId]']").val($(".credit-type > div:first-child").data("product-id"));
		$("#product-type").html($(".credit-type > div:first-child").data("product-name"));
		setAmounts();
		setText();
	}
	
	$('#counter').keydown(function() {
		return false;
	});
	
	$(window).scroll(function (event) {
		scroll = $(window).scrollTop();
		console.log(scroll);
		if(scroll < 480) {
			$(".giftcard-types").css('background-color', 'transparent');
		} else {
			$(".giftcard-types").css('background-color', '#ffffff');
		}
	});
	
	
	$(document).on('click', '.giftcard-types a', function() {
		if(scroll < 400) {
			var target = $('#container');
			$('html, body').animate({ scrollTop: target.offset().top }, 700);
			return false;
		}
	});
	
	function setText() {
		$('#product-type:contains("گیفت کارت")').each(function(){
			$(this).html($(this).html().split("گیفت کارت").join(""));
		});
		$('#product-type:contains("XBox")').each(function(){
			$(this).html($(this).html().split("XBox").join("ایکس باکس "));
		});
		$('#product-type:contains("PlayStationNetwork")').each(function(){
			$(this).html($(this).html().split("PlayStationNetwork").join(""));
			$(this).prepend("پلی استیشن ");
		});
	}
});