import express from 'express';
import { getProfile, updateProfile ,allProfiles,addGigs,deleteGig} from '../controller/profile.controller.js';

const route = express.Router();
    
route.post('/getprofile', getProfile);
route.post('/addgig',addGigs)
route.post('/deletegig',deleteGig)
route.put('/updateprofile', updateProfile);
route.post('/allprofiles', allProfiles);

export default route;