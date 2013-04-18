//オリジンを返す
function getOrigin()
{
    return getProtocol() +"://"+ getIP() +":"+ getPortNo();
}

//ポート番号を返す
function getPortNo()
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

//IPを返す
function getIP()
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

//プロトコル名を返す
function getProtocol()
{
    return location.href.split(":")[0];
}
