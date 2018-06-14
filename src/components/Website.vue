<template>
	<div class="website scroll ">
		<div class="website_head relative">
			<img src="../img/website_head.jpg" alt=""/>
			<div class="website_logo absolute">
				<img src="../img/website_logo.png" alt=""/>
			</div>
		</div>
		<div class="downButton flex flex-column flex-items relative">
			<img src="../img/website_back1.png" alt="" class="absolute backgrounds1"/>
			<div class="border_ridius iosDown" @click="iosDownload">ios版下载</div>
			<div class="border_ridius androidDown" @click="androidDownload">安卓版下载</div>
		</div>
		<div class="QRcode flex flex-column flex-items relative">
			<img src="../img/website_back2.png" alt="" class="absolute backgrounds2"/>
			<img src="" alt="" class="QRcode_img"/>
			<p>扫描二维码安装</p>
		</div>
		<div class="cssBack flex flex-column flex-items relative">
			<img src="../img/website_back3.png" alt="" class="absolute backgrounds3"/>
			<img src="../img/website_back4.png" alt="" class="absolute backgrounds4"/>
			<div class="cssBack_con flex flex-column flex-items">
				<h2 class="cssBack_h2">应用截图</h2>
				<img src="../img/website_phone.png" alt=""/>
			</div>
		</div>
		<div class="cssBack flex flex-column flex-items">
			<div class="cssBack_con flex flex-column flex-items">
				<h2 class="cssBack_h2">糖吧介绍</h2>
				<p class="introduce">糖吧，您的控糖助手，轻松管理血糖。<br	/>
					糖吧是一款专注于帮助用户管理血糖的手机应用，实时监测用户的血糖数据，并且记录血糖状况，帮助用户控制血糖。<br	/>
					糖吧的功能特点：<br	/>
					血糖报表：通过血糖数据报表，建立完善的血糖档案，可以清楚的了解自身的病情。<br	/>
					测量提醒：简单便捷的提醒功能，不再忘记血糖测量。<br	/>
					糖糖圈：糖友之间的沟通桥梁，与全国用户交流控糖知识，晒血糖、晒饮食，开心分享空糖经验。<br	/>
					智能血糖仪：爱奥乐血糖仪实时无线上传血糖监测数据。<br	/>
					适用平台：安卓4.4以上的版本。
				</p>
			</div>
		</div>
		<div class="flex flex-justify web_line">
			<div class="website_line"></div>
		</div>
		<!--<nav class="flex flex-justify nav">
			<li><router-link to="home">首页</router-link></li>
			<li><router-link to="help">帮助</router-link></li>
			<li><router-link to="about">关于</router-link></li>
			<li><router-link to="service">客服</router-link></li>
		</nav>-->

		<p class="copyright">杭州市变啦网络科技有限公司  版权所有</p>
	</div>
</template>

<script>
	export default{
		name:"website",
		methods:{
			iosDownload:function(){

			},
			androidDownload:function(){

			}
		}
	}
</script>

<style scoped>
	.website{
		width: 100%;
		height: 100%;
		background: #fafafa;
		padding-bottom: 0.533333rem;
	}
	.website_head{
		width: 100%;
		height: 3.026666rem;
	}
	.website_logo{
		width: 100%;
		top: 2.053333rem;
		left: 0;
	}
	.website_head img{
		width: 100%;
	}
	.website_logo img{
		width: 1.88rem;
		margin: 0 auto;
	}
	.downButton{
		margin-top: 3.066666rem;
	}
	.downButton div{
		height: 0.933333rem;
		width: 4.4rem;
		text-align: center;
		line-height: 0.933333rem;
		color: #fff;
		font-size: 0.453333rem;
	}
	.iosDown{
		background: #fc389e;
		margin-bottom: 0.506666rem;
	}
	.androidDown{
		background: #3296fa;
	}
	.border_ridius{
		border-radius: 0.466666rem;
	}
	.QRcode{
		margin-top: 1.106666rem;
	}
	.QRcode_img{
		height: 3.453333rem;
		width: 3.453333rem;
	}
	.QRcode p{
		margin: 0.306666rem 0 0.96rem;
		text-align: center;
		font-size: 0.346666rem;
		color: #626161;
	}
	.cssBack{
		width: 100%;
		margin-bottom: 0.44rem;
	}
	.cssBack_con{
		padding: 0.533333rem;
		padding-bottom: 0.8rem;
		width: 9.186666rem;
		background: #fff;
	}
	.cssBack_h2{
		width: 100%;
		margin-bottom:0.48rem;
	}
	.introduce{
		font-size: 0.373333rem;
		color: #333;
	}
	.web_line{
		margin: 0.973333rem 0;
	}
	.website_line{
		height: 1px;
		width: 9.186666rem;
		background: #f1f1f1;
	}
	.nav li{
		font-size: 0.346666rem;
		padding: 0 0.266666rem;
		border-right: 1px solid #777;
	}
	.nav li a{
		color: #3296af;
	}
	.nav li:last-child{
		border-right: 0;
	}
	.copyright{
		margin-top: 0.266666rem;
		font-size: 0.346666rem;
		color: #777;
		text-align: center;
	}
	.backgrounds1{
		right: 0;
		top: -1rem;
	}
	.backgrounds2{
		left: 0;
		top: -0.533333rem;
	}
	.backgrounds3{
		left: 0;
		top: -0.533333rem;
	}
	.backgrounds4{
		right: 0;
		top: 0.8rem;
	}
</style>
