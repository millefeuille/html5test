var orientaionData = "";
var motionData = "";


/**
 * 位置情報の読み込み
 */
function getGeolocation()
{
	if( !navigator.geolocation )
	{
		window.alert("Geolocation APIに対応したブラウザをご利用ください");
	}
	else
	{
		//現在位置の取得
		navigator.geolocation.getCurrentPosition( successCallback );
	}
}


 
/**
 * 位置情報読み込み時のコールバック関数
 *
 * @param position Positionオブジェクト
 */
function successCallback( position )
{
	document.getElementById("latitude").innerHTML = position.coords.latitude;
	document.getElementById("longitude").innerHTML = position.coords.longitude;
}




/**
 * デバイスの向き，傾きの最新値を表示
 */
function refreshDeviceOrientationData()
{
	document.getElementById("deviceorientaion").innerHTML =	"alpha: "+ (Math.floor(orientaionData.alpha*100)/100) +"<br />"
															+"beta: "+ (Math.floor(orientaionData.beta*100)/100) +"<br />"
															+"gamma: "+ (Math.floor(orientaionData.gamma*100)/100) +"<br />"
															+"compass: "+ (Math.floor(orientaionData.webkitCompassHeading*100)/100);
	document.getElementById("devicemotion").innerHTML =	"x: "+ (Math.floor(motionData.x*100)/100) +"<br />"
														+"y: "+ (Math.floor(motionData.y*100)/100) +"<br />"
														+"z: "+ (Math.floor(motionData.z*100)/100);														
}





/**
 * ページをロードしたときの動作
 */
window.onload = function()
{
	window.addEventListener("deviceorientation", function(e){ orientaionData = e;}, true);
	window.addEventListener("devicemotion", function(e){ motionData = e.accelerationIncludingGravity;}, true);

	setInterval( refreshDeviceOrientationData, 100 );
}
