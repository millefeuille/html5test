/**
 * 汎用的に使えそうな自作関数のライブラリ
 *
 * @author seko
 */


/**
 * コンストラクタ
 *
 */
var SSLib = function()
{
};




/**************************************
 *
 * static関数
 *
 **************************************/
 
 
 /**
  * デバックのためのブレークポイント
  * 引数に応じて処理を変更
  *		0:ブレイクポイント設定のみ
  *		1:コンソールログに第一引数のオブジェクトを出力
  *		2:コンソールログに第一引数のオブジェクトを，アラートウインドウに第二引数のオブジェクトを出力
  * 
  * @param	Object	outputConsole	(オプション第一引数)コンソールログに出力したいオブジェクト(必要なければnull)
  * @param	Object	outputAlert	(オプション第二引数)アラートウインドウに出力したいオブジェクト
  */
SSLib.debugBreakPoint = function( outputConsole, outputAlert )
{
	//デフォルト値の設定
	var dstConsole = "break point";
	var dstAlert = "break point";

	//引数の数に応じて処理を変更
	switch (arguments.length)
	{
		case 1:
			dstConsole = outputConsole;
			break;
			
		case 2:
			dstConsole = outputConsole;
			dstAlert = outputAlert;
			break;
		
		default:
			break;
	}
	
	//出力処理
	console.log( dstConsole );
	alert( dstAlert );
}


/**
 * URL内のリクエストパラメータをパースし，その結果を{key:"val"}の配列で返す
 * (パラメータの値が配列だった場合の処理は未実装)
 *
 * @param	String	url	パース対象のURL
 * @return	Array{}	パース結果の連想配列
 */
SSLib.parseUrlQuery = function( url )
{
	//結果を格納する変数を用意
	var res = new Array();

	//引数をパラメータ部分とそれ以外に分離
	var paramList = url.split("?");

	//パース開始
	if( paramList.length > 1 )
	{
		//不要部分を削除し，残り部分を結合(パラメータ内に"?"が含まれていた場合に対応するため)
		paramList.shift();
		paramStr = paramList.join("?");
		
		//各パラメータを格納
		//(パラメータの値が配列だった場合の処理は未実装)
		var params = paramStr.split("&");
		for( var i = 0; i < params.length; i++ )
		{
			//"="が現れる最初の位置を取得
			index = params[i].indexOf("=");
			
			//keyとvalのペアがきちんと存在してれば格納
			if( index > 0 )
			{
				res[params[i].substr(0, index)] = params[i].slice(index+1);
			}
		}
	}
	
	return res;
}





/**
 * ランダムな文字列を生成する
 *
 * @param int length	生成したい文字列の長さ
 * @param	String 生成したランダムな文字列
 */
SSLib.getRandomString = function( length )
{
	//対象文字
	var srcStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	//文字をランダムに選んでいく
	var res = "";
	for( var i = 0; i < length; i++ )
	{
		var rand = Math.round(Math.random()*(srcStr.length-1));
		res += srcStr.substr(rand, 1);
	}
	
	return res;
}




/**
 * XMLHttpRequest オブジェクトを作成する
 *
 * @return	XMLHttpRequest	ブラウザごとに適した XMLHttpRequest オブジェクト
 */
SSLib.createXMLHttpRequest = function()
{
    // XMLHttpRequest オブジェクトを作成する
    if(window.XMLHttpRequest)
	{
        // IE7+, Firefox, Chrome, Safari, Opera 用
        return new XMLHttpRequest();
    }
	else
	{
		// IE 用
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}




/**
 * 連想配列内に指定したキーが含まれているかのチェック
 * ただし，第一階層のみ
 *
 * @param	Array{key:val}	src	チェックしたい連想配列
 * @param	Array[]	keyList	チェックするキーの配列
 * @param	boolean	全て含まれていれば true, 一つでも含まれていなければ false を返す
 */
SSLib.isSetArray = function( src, keyList )
{
	//指定されたキーの配列が存在するかチェック
	for( var i = 0; i < keyList.length; i++ )
	{
		//存在しないキーが合った瞬間，false を返す
		if( (typeof src[keyList[i]]) == 'undefined' || src[keyList[i]] == null )
		{
			return false;
		}
	}
	
	return true;
}




/**
 * タッチ or クリックイベントの座標取得
 *
 * @param	e		イベントオブジェクト
 * @return	x, y座標{x:val, y:val}の連想配列のリスト
 */
SSLib.getVertexFromEvent = function( e )
{
	var res = new Array();
	
	//指定されたタイプ別に処理
	if( e.type == 'mousedown' || e.type == 'mouseup' )
	{
		//クリックイベント
		var tmp = {x:e.clientX, y:e.clientY};
		res.push(tmp);
	}
	else if( e.type == 'touchstart' )
	{
		//タッチスタートイベント
		for( var i = 0; i < e.touches.length; i++ )
		{
			var tmp = {x:e.touches[i].pageX, y:e.touches[i].pageY};
			res.push(tmp);
		}
	}
	else if( e.type == 'touchmove' || e.type == 'touchend' )
	{
		//タッチムーブ or タッチエンドイベント
		for( var i = 0; i < e.changedTouches.length; i++ )
		{
			var tmp = {x:e.changedTouches[i].pageX, y:e.changedTouches[i].pageY};
			res.push(tmp);
		}
	}
	
	return res;
}




/**
 * 親クラスのコンストラクタを呼ばずにクラス継承を実行
 *
 * @param	type	継承したい親クラスタ
 * @return	継承したプロトタイプオブジェクト
 */
SSLib.createObjectForPrototype = function( type )
{
	var f = function(){};
	f.prototype = type.prototype;

	return new f();
}




/**
 * 現在アクセスしているページのオリジンを取得
 *
 * @return オリジンの文字列
 */
SSLib.getOrign = function()
{
    return getProtocol() +"://"+ getIP() +":"+ getPortNo();
}



/**
 * 現在アクセスしているページのポート番号を取得
 *
 * @return ポート番号の数字
 */
SSLib.getPortNo() = function()
{
    var splitStr = location.href.split(":");
    if( splitStr.length == 3 )
    {
        //明記されているポート番号を返す
        return (splitStr[2].split("/")).shift();
    }
    
    //明記されていないので80ポートをとりあえず返す
    return 80;
}



/**
 * 現在アクセスしているページのIPを取得
 *
 * @return IPの文字列
 */
SSLib.getIP() = function()
{
    var splitStr = location.href.split(":");
    if( splitStr.length < 3  )
    {
        //ポート番号が明記されていなので"/"の間に挟まれているものを返す
        return location.href.split("/")[2];
    }
    
    //ポート番号が明記されているので"/"の間に挟まれているものからポート番号を覗いたものを返す
    return (location.href.split("/")[2]).split(":")[0];
}



/**
 * 現在アクセスしているページのプロトコルを取得
 *
 * @return プロトコルの文字列
 */
SSlib.getProtocol() = function()
{
    return location.href.split(":")[0];
}