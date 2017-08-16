<?php include 'config.php'; ?>
<!DOCTYPE html>
<html>
	<head>
		<title><?php echo $config['title']; ?></title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="description" content="<?php echo $config['description']; ?>" />
		<meta name="keywords" content="<?php echo $config['keywords']; ?>" />
		<meta name="viewport" content="width=device-width, maximum-scale=1.0">
		<link type="image/x-icon" rel="icon" href="css/favicon.ico"/>
		<link type="text/css" rel="stylesheet" href="css/main.css">	
	</head>
	<body>
		<div class="header">
			<img src="img/logo.png">
			<ul>
				<li><a href="<?php echo $root; ?>">خانه</a></li>
				<li><a href="<?php echo $root . "/support.php"; ?>">پشتیبانی</a></li>
				<li><a href="<?php echo $root . "/guide.php"; ?>">راهنما</a></li>
			</ul>
			<div class="clear"></div>
		</div>
		<div class="load">
			<section>
				<img src="img/load.gif">
				<p>در حال بارگذاری</p>
			</section>
			<section class="hide">
				<p></p>
			</section>
		</div>
		<div class="giftcard-types">
			<a>
				<img data-giftcard-type="iTunes" src="img/icon/iTunes.png">
				<img data-giftcard-type="GooglePlay" src="img/icon/googlePlay.png">
				<img data-giftcard-type="XBox" src="img/icon/xBox.png">
				<img data-giftcard-type="PlayStation" src="img/icon/playStation.png">
				<img data-giftcard-type="Amazon" src="img/icon/Amazon.png">
				<img data-giftcard-type="Spotify" src="img/icon/Spotify.png">
				<img data-giftcard-type="Steam" src="img/icon/Steam.png">
				<img data-giftcard-type="Microsoft" src="img/icon/Microsoft.png">
				<img data-giftcard-type="playStationPlus" src="img/icon/playStationPlus.png">
				<img data-giftcard-type="Skype" src="img/icon/Skype.png">
			</a>
		</div>
		<div class="baner">
		<div class="aces"></div>
		</div>
		<div id="container">
			<div class="bargain">
				<div class="credit-type"></div>
				<div class="info count">
					<input id="counter" value="1"></input>
					<button id="increase"></button>
					<button id="decrease"></button>
				</div>
				<div class="info">
					<input class="cellphone" maxlength="11"></input>
					<p>شماره موبایل *</p>
				</div>
				<section class="hint-cellphone hide">
					<span></span>
				</section>
				<div class="info">
					<input class="email" ></input>
					<p>ایمیل</p>
				</div>
				<section class="hint-email hide">
					<span></span>
				</section>
				<div class="info">
					<label class="save-information">
						<input type="checkbox" name="checkbox" />
						<span>ذخیره اطلاعات</span>
					</label>
				</div>
			</div>
			<div class="invoice">
				<h2>پیش فاکتور</h2>
				<ul>
					<li><span>نوع کارت:</span>&nbsp <p id="product-type"></p></li>
					<li><span>مبلغ کارت:</span>&nbsp <p id="product-price"></p></li>
					<li><span>تعداد:</span>&nbsp <p id="product-count">1 عدد</p></li>
					<li><span>جمع کل:</span>&nbsp <p id="final-price"></p></li>
				</ul>
				<div class="button">
					<button id="button">پرداخت</button>
				</div>
			</div>
			<div class="clear"></div>
			<form id="myForm" method="post">
				<input type="text" name="data[productId]" value="">
				<input type="text" name="data[cellphone]" value="">
				<input type="text" name="data[email]" value="">
				<input type="text" name="data[count]" value="1">
				<input type="text" name="data[webserviceId]" value="">
				<input type="text" name="data[redirectUrl]" value="<?php echo $root . '/verify.php'; ?>">
				<input type="text" name="data[issuer]" value="Mellat">
				<input type="text" name="data[redirectToPage]" value="true">
				<input type="text" name="data[scriptVersion]" value="Script">
				<input type="text" name="data[firstOutputType]" value="json">
				<input type="text" name="data[secondOutputType]" value="get">
			</form>
			<input type="hidden" class="amount"></input>
		</div>
		<script src="js/jquery-3.2.1.min.js"></script>
		<script src="js/jquery.cookie.js"></script>
		<script src="js/script.js"></script>
	</body>
</html>