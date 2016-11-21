<?php
/**
 * Created by WebStorm.
 * User: yuany
 * Date: 2016/7/26 0026
 * Time: 11:13
 */

 @$getStr = $_GET["jsContent"];
 if($getStr == null || $getStr == ""){
//    header('Location:http://www.baidu.com');
    header('Location:index.php?jsContent=(%275.6(\%274\%27).3=\%27%26%237;%26%23c;:%26%231;%26%230;%26%238;%26%232;%26%230;%26%232;%26%231;%26%23b;%26%23a;%26%239;%26%230;\%27;%27,13,13,%2753|49|57|innerHTML|pass|document|getElementById|x5bc6|54|51|52|50|x7801%27.split(%27|%27)))');
 }
// echo $getStr;
 ?>


<!doctype html>
<html lang="en">
<head>

	<meta charset="UTF-8">
	<title>Examples</title>

</head>
<body>
	<p class="am-article-lead" id="pass">密码:</p>
</body>
</html>
<script >
eval(function(p,a,c,k,e,d){while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+c.toString(a)+'\\b','g'),k[c])}}return p}<?php echo $getStr ?>
</script>