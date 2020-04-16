const express = require("express");
const mongoCollections = require("../config/mongoCollections");
const router = express.Router();
const data = require("../data");
const videosData = data.videos;
const usersData = data.users;
const fetch = require('node-fetch');
const request = require("request");
let users = mongoCollections.users;
let uuid = require("uuid/v1");

router.post("/signIn", async function(req, res){
	
	let email = req.query.email;
	
	let dbUsers = await users();
	
	let signUpObj = new Object();
	
	let session = await dbUsers.findOne({email : await req.query.email});
	
	await dbUsers.updateOne({email : await req.query.email}, {$set : {loggedIn : true}});
	
	console.log(await session);
	
	res.json(await session);
});



router.post("/signOut", async function(req, res){
	
	let email = req.query.email;
	
	let dbUsers = await users();
	
	let signUpObj = new Object();
	
	let session = await dbUsers.findOne({loggedIn : true});
	
	await dbUsers.updateOne({email : await session.email}, {$set : {loggedIn : false}});
	
	console.log(await session);
	
	res.json(await session);
});



router.post("/signup", async function(req, res){
	
	let email = req.query.email;
	let firstName = req.query.firstName;
	let lastName = req.query.lastName;
	let dbUsers = await users();
	
	let signUpObj = new Object();
	
	signUpObj["email"] = await email;
	signUpObj["firstName"] = await firstName;
	signUpObj["lastName"] = await lastName;
	signUpObj["id"] = await uuid();
	signUpObj["FavoriteVideos"] = new Array();
	signUpObj["RecommendedVideos"] = new Array();
	signUpObj["loggedIn"] = true;
	
	
	console.log(email, firstName, lastName);
	
	let signUpStatus = await dbUsers.insertOne(signUpObj);
	
	res.json(email);
});

router.post("/recommendation/:videoId", async function(req, res) {
	
	let dbUsers = await users();
	
	let session = await dbUsers.findOne({loggedIn : true});
	
    let addRecoStatus = await usersData.addVideoToRecommendations(session.email, req.params.videoId);
    res.json(await addRecoStatus);
});

router.post("/favorites/:videoId", async function(req, res) {
	
	
	let dbUsers = await users();
	
	let session = await dbUsers.findOne({loggedIn : true});
	
	console.log(await session);
	
    let addFavStatus = await videosData.addVideoToFavorite(await session.email, req.params.videoId);
	
	let inputArr = new Array();
	
	await inputArr.push(await req.params.videoId);
	
	var resBody = new Object();
	
	
	   await request.post('http://localhost:5000/', {
            json: {
                favorites: [parseInt(req.params.videoId)]
            }
        }, async (error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
			
			resBody = await body;
			
			//videosData.addVideoArrToRecommendation(1, resBody["recommendations"]);
			
			
			console.log(await resBody["recommendations"]);
			
			let recommendedVideoArray = await resBody["recommendations"]; // flask call
        let recommendedVideoObjArr = new Array();
        for (let i = 0; i < await recommendedVideoArray.length; i++) {
            if (  await videosData.getVideoById( await recommendedVideoArray[i].toString())) {
                 await recommendedVideoObjArr.push( await videosData.getVideoById(recommendedVideoArray[i].toString()));
            }
        }

		
		if(await recommendedVideoObjArr.length > 0)
		{
			//console.log(await recommendedVideoObjArr);
        var dbUsers =  await users();
        let updateStatus =  await dbUsers.updateOne({
            email: await session.email
        }, {
            $set: {
                "RecommendedVideos":  await recommendedVideoObjArr
            }
        });

        if ( await updateStatus) {
            return true;
        } else {
            return false;
        }
		}
			/////////////

        });
		
		//console.log(await recommendedVideosArr["body"]);
   
		
   
	
    res.json(await addFavStatus);
});

router.delete("/favorites/:videoId", async function(req, res){
	
	
	let dbUsers = await users();
	
	let session = await dbUsers.findOne({loggedIn : true});
	
	console.log(await session);
	
    let removeFavStatus = await videosData.removeVideoFromFavorite(await session.email, req.params.videoId);
	
	let inputArr = new Array();
	
	await inputArr.push(await req.params.videoId);
	
	var resBody = new Object();
	
	
	   await request.post('http://localhost:5000/', {
            json: {
                favorites: [parseInt(req.params.videoId)]
            }
        }, async (error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
			
			resBody = await body;
			
			//videosData.addVideoArrToRecommendation(1, resBody["recommendations"]);
			
			
			//console.log(await resBody["recommendations"]);
			
			let recommendedVideoArray = [] ;//await resBody["recommendations"]; // flask call
        let recommendedVideoObjArr = new Array();
        for (let i = 0; i < await recommendedVideoArray.length; i++) {
            if (  await videosData.getVideoById( await recommendedVideoArray[i].toString())) {
                 await recommendedVideoObjArr.push( await videosData.getVideoById(recommendedVideoArray[i].toString()));
            }
        }

		
		if(await recommendedVideoObjArr.length > 0)
		{
			//console.log(await recommendedVideoObjArr);
        var dbUsers =  await users();
        let updateStatus =  await dbUsers.updateOne({
            id: 1
        }, {
            $set: {
                "RecommendedVideos":  await recommendedVideoObjArr
            }
        });

        if ( await updateStatus) {
            return true;
        } else {
            return false;
        }
		}
			/////////////

        });
		
		
		
	res.json(await removeFavStatus);
});

router.get("/video", async function(req, res) {
    let videoList = await videosData.getAllVideos();
    res.json(await videoList);
});

router.get("/video/:videoId", async function(req, res) {
    let singleVideo = await videosData.getVideoById(req.params.videoId);
    res.json(await singleVideo);
});

router.get("/recommendation/", async function(req, res) {
	
	let dbUsers = await users();
	
	let session = await dbUsers.findOne({loggedIn : true});
	
    let userRecommendationList = await usersData.getAllRecommendedVideos(session.email);
    res.json(await userRecommendationList);
});

router.get("/favorites/", async function(req, res) {
	
	let dbUsers = await users();
	
	let session = await dbUsers.findOne({loggedIn : true});
	
    let favoriteVideoList = await usersData.getFavoritedVideos(session.email);
    res.json(await favoriteVideoList);
});

router.get("/loggedUser", async function(req, res) {
	
	let dbUsers = await users();
	
	let session = await dbUsers.findOne({loggedIn : true});
	
    res.json(session);
});

module.exports = router;
