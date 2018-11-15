/**
 * Created by HHH on 2018/11/1.
 */
var route = function(handle,pathName,res,postData){
    console.log(pathName);
    if(typeof handle[pathName]=="function"){
      return  handle[pathName](res,postData);
    }
    else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("Not Found Request For That!");
        res.end();
    }
};

exports.route = route;